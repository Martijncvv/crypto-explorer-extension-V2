import { fetchCoinInfo, fetchPriceHistoryData } from "./api";
import { formatChartData } from "../utils/formatChartData";

export const fetchDetailedTokenInfo = async (coinId: string) => {
  let coinInfo = null;
  let nftInfo = null;
  let isLoadingError;

  try {
    // Fetch coin info and price history data concurrently
    const [fetchedCoinInfo, priceMaxHistoryDataRes] = await Promise.all([
      fetchCoinInfo(coinId),
      fetchPriceHistoryData(coinId, "usd", "365"),
    ]);
    isLoadingError = { isLoading: false, isError: false };

    if (!fetchedCoinInfo) {
      console.log(`No results for coinInfo ${coinId}`);
      isLoadingError = { isLoading: false, isError: true };
      return {
        coinInfo,
        nftInfo,
        isLoadingError,
      };
    }

    if (!priceMaxHistoryDataRes) {
      console.log(`No results for priceMaxHistoryData ${coinId}`);
      isLoadingError = { isLoading: false, isError: true };
      return {
        coinInfo,
        nftInfo,
        isLoadingError,
      };
    }

    // Format price history data
    coinInfo = { ...fetchedCoinInfo };
    coinInfo.price30dHistoryData = formatChartData({
      prices: priceMaxHistoryDataRes.prices.slice(-31),
      total_volumes: priceMaxHistoryDataRes.total_volumes.slice(-31),
    });
    coinInfo.priceMaxHistoryData = formatChartData(priceMaxHistoryDataRes);
  } catch (error) {
    isLoadingError = { isLoading: false, isError: true };
    console.error(
      `fetchDetailedTokenInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }

  return {
    coinInfo,
    nftInfo,
    isLoadingError,
  };
};
