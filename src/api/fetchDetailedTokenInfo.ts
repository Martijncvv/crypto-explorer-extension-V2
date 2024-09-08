import { fetchCoinInfo, fetchPriceHistoryData } from "./api";
import { formatChartData } from "../utils/formatChartData";
import { delay } from "./delay";
import { getTokenTxChartData } from "./getTokenTxChartData";

export const fetchDetailedTokenInfo = async (coinId: string) => {
  let coinInfo = null;
  let nftInfo = null;
  let txVolumeChartData = [];
  let tokenTxsChartData = [];
  let loadingError;

  try {
    // Fetch coin info and price history data concurrently
    const [fetchedCoinInfo, priceMaxHistoryDataRes] = await Promise.all([
      fetchCoinInfo(coinId),
      fetchPriceHistoryData(coinId, "usd", "365"),
    ]);

    if (!fetchedCoinInfo) {
      console.log(`No results for coinInfo ${coinId}`);
      loadingError = { isLoading: false, isError: true };
      return {
        coinInfo,
        nftInfo,
        txVolumeChartData,
        tokenTxsChartData,
        loadingError,
      };
    }

    if (!priceMaxHistoryDataRes) {
      console.log(`No results for priceMaxHistoryData ${coinId}`);
      loadingError = { isLoading: false, isError: true };
      return {
        coinInfo,
        nftInfo,
        txVolumeChartData,
        tokenTxsChartData,
        loadingError,
      };
    }

    // Format price history data
    coinInfo = { ...fetchedCoinInfo };
    coinInfo.price30dHistoryData = formatChartData({
      prices: priceMaxHistoryDataRes.prices.slice(-31),
      total_volumes: priceMaxHistoryDataRes.total_volumes.slice(-31),
    });
    coinInfo.priceMaxHistoryData = formatChartData(priceMaxHistoryDataRes);

    // Fetch transaction data if asset platform and contract address are available
    if (coinInfo.asset_platform_id && coinInfo.contract_address) {
      await delay(1000);
      const fetchedTokenTxChartData = await getTokenTxChartData(
        coinInfo.asset_platform_id,
        coinInfo.contract_address,
        coinInfo.market_data.current_price.usd,
      );

      if (!fetchedTokenTxChartData) {
        console.log(`No results for getTokenTxChartData ${coinId}`);
        loadingError = { isLoading: false, isError: true };
        return {
          coinInfo,
          nftInfo,
          txVolumeChartData,
          tokenTxsChartData,
          loadingError,
        };
      }

      tokenTxsChartData = fetchedTokenTxChartData;
    }

    loadingError = { isLoading: false, isError: false };
  } catch (error) {
    loadingError = { isLoading: false, isError: true };
    console.error(
      `fetchDetailedTokenInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }

  // Return the gathered data instead of setting state directly
  return {
    coinInfo,
    nftInfo,
    txVolumeChartData,
    tokenTxsChartData,
    loadingError,
  };
};
