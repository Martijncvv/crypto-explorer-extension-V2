import { fetchNftInfo } from "./api";

export const fetchDetailedNftInfo = async (coinId: string) => {
  let nftInfo = null;
  let coinInfo = null;
  let txVolumeChartData = [];
  let isLoadingError;

  try {
    // Fetch NFT info
    nftInfo = await fetchNftInfo(coinId);
    isLoadingError = { isLoading: false, isError: false };

    if (!nftInfo) {
      isLoadingError = { isLoading: false, isError: true };
      console.log(`No results for nftInfo ${coinId}`);
      return {
        nftInfo,
        coinInfo,
        txVolumeChartData,
        isLoadingError,
      };
    }
  } catch (error) {
    isLoadingError = { isLoading: false, isError: true };
    nftInfo = null;
    txVolumeChartData = [];
    coinInfo = null;
    console.error(
      `fetchDetailedNftInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }

  // Return all necessary data instead of setting it directly
  return {
    nftInfo,
    coinInfo,
    txVolumeChartData,
    isLoadingError,
  };
};
