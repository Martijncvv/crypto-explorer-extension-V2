import { fetchNftInfo } from "./api";
import { delay } from "./delay";
import { getNftTxChartData } from "./getNftTxChartData";

export const fetchDetailedNftInfo = async (
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
    const [nftInfo] = await Promise.all([fetchNftInfo(coinId)]);
    if (!nftInfo) {
      setLoadingError({ isLoading: false, isError: true });
      console.log(`No results for nftInfo ${coinId}`);
      return;
    }
    setNftInfo(nftInfo);
    setCoinInfo(null);

    if (nftInfo.asset_platform_id && nftInfo.contract_address) {
      await delay(1000);
      const txVolumeData = await getNftTxChartData(
        nftInfo.asset_platform_id,
        nftInfo.contract_address,
      );

      if (!txVolumeData) {
        setLoadingError({ isLoading: false, isError: true });
        console.log(`No results for getNftTxChartData ${coinId}`);
        return;
      }
      if (txVolumeData.length > 0) {
        setTxVolumeChartData(txVolumeData);
      }
    }
    setLoadingError({ isLoading: false, isError: false });
  } catch (error) {
    setLoadingError({ isLoading: false, isError: true });
    setNftInfo(null);
    setTxVolumeChartData([]);
    setCoinInfo(null);
    console.error(
      `fetchDetailedNftInfo: Error searching for coin: ${coinId}`,
      error,
    );
  }
};
