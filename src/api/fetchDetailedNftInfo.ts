import { fetchNftInfo } from "./api";
import { delay } from "./delay";
import { getNftTxChartData } from "./getNftTxChartData";

export const fetchDetailedNftInfo = async (coinId: string) => {
  let nftInfo = null;
  let coinInfo = null;
  let txVolumeChartData = [];
  let tokenTxsChartData = [];
  let loadingError;

  try {
    // Fetch NFT info
    nftInfo = await fetchNftInfo(coinId);
    if (!nftInfo) {
      loadingError = { isLoading: false, isError: true };
      console.log(`No results for nftInfo ${coinId}`);
      return {
        nftInfo,
        coinInfo,
        txVolumeChartData,
        tokenTxsChartData,
        loadingError,
      };
    }

    // Fetch transaction volume data if NFT info is available
    if (nftInfo.asset_platform_id && nftInfo.contract_address) {
      await delay(1000);
      const txVolumeData = await getNftTxChartData(
        nftInfo.asset_platform_id,
        nftInfo.contract_address,
      );

      if (!txVolumeData) {
        loadingError = { isLoading: false, isError: true };
        console.log(`No results for getNftTxChartData ${coinId}`);
        return {
          nftInfo,
          coinInfo,
          txVolumeChartData,
          tokenTxsChartData,
          loadingError,
        };
      }
      if (txVolumeData.length > 0) {
        txVolumeChartData = txVolumeData;
      }
    }

    loadingError = { isLoading: false, isError: false };
  } catch (error) {
    loadingError = { isLoading: false, isError: true };
    nftInfo = null;
    txVolumeChartData = [];
    coinInfo = null;
    console.error(
      `fetchDetailedNftInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }

  // Return all necessary data instead of setting it directly
  return { nftInfo, coinInfo, txVolumeChartData, loadingError };
};
