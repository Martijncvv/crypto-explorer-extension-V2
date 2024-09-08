import { fetchCoinInfo, fetchPriceHistoryData } from "./api";
import { formatChartData } from "../utils/formatChartData";
import { delay } from "./delay";
import { getTokenTxChartData } from "./getTokenTxChartData";

export const fetchDetailedTokenInfo = async (
  coinId: string,
  setLoadingError,
  setCoinInfo,
  setNftInfo,
  setTxVolumeChartData,
  setTokenTxsChartData,
) => {
  try {
    setLoadingError({ isLoading: true, isError: false });

    setTxVolumeChartData([]);
    setTokenTxsChartData([]);
    const [coinInfo, priceMaxHistoryDataRes] = await Promise.all([
      fetchCoinInfo(coinId),
      fetchPriceHistoryData(coinId, "usd", "365"),
    ]);
    if (!coinInfo) {
      console.log(`No results for coinInfo ${coinId}`);
      setLoadingError({ isLoading: false, isError: true });
      return;
    }
    if (!priceMaxHistoryDataRes) {
      console.log(`No results for priceMaxHistoryData ${coinId}`);
      setLoadingError({ isLoading: false, isError: true });
      return;
    }

    // get past 30 days
    coinInfo.price30dHistoryData = formatChartData({
      prices: priceMaxHistoryDataRes.prices.slice(-31),
      total_volumes: priceMaxHistoryDataRes.total_volumes.slice(-31),
    });
    coinInfo.priceMaxHistoryData = formatChartData(priceMaxHistoryDataRes);

    setCoinInfo(coinInfo);
    setNftInfo(null);

    if (coinInfo.asset_platform_id && coinInfo.contract_address) {
      await delay(1000);
      const tokenTxChartData = await getTokenTxChartData(
        coinInfo.asset_platform_id,
        coinInfo.contract_address,
        coinInfo.market_data.current_price.usd,
      );

      if (!tokenTxChartData) {
        setLoadingError({ isLoading: false, isError: true });
        console.log(`No results for getTokenTxChartData ${coinId}`);
        return;
      }

      setTokenTxsChartData(tokenTxChartData);
    }
    setLoadingError({ isLoading: false, isError: false });
    return;
  } catch (error) {
    setLoadingError({ isLoading: false, isError: true });
    console.error(
      `fetchDetailedTokenInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }
};
