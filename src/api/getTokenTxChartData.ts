import { fetchTokenTxs } from "./api";
import { delay } from "./delay";
import { getNetworkDetails } from "../utils/getNetworkDetails";

export const getTokenTxChartData = async (
  platformId: string,
  contractAddress: string,
  tokenValue: number,
): Promise<any> => {
  const networkDetails = getNetworkDetails(platformId);

  let tokenTxsData = await fetchTokenTxs(
    networkDetails.domain,
    contractAddress,
    10000,
  );

  if (tokenTxsData.status === "0") {
    console.log("tokenTxsData.status ==== 0: ", tokenTxsData);
    await delay(5500);
    tokenTxsData = await fetchTokenTxs(
      networkDetails.domain,
      contractAddress,
      10000,
    );
  }
  if (tokenTxsData.status !== "0" && tokenTxsData.result) {
    const arrayWithIndices: any = tokenTxsData.result.map((item, index) => ({
      ...item,
      index,
    }));
    const sortedArray = arrayWithIndices.sort(
      (a: { value: number }, b: { value: number }) => b.value - a.value,
    );
    const top50Array = sortedArray.slice(0, 50);
    const originalOrderArray = top50Array.sort((a, b) => b.index - a.index);
    let tokenTxsChartData = [];

    originalOrderArray.forEach((txInfo) => {
      tokenTxsChartData.push({
        date: new Date(Number(txInfo.timeStamp) * 1000),
        amount: parseInt(txInfo.value) / 10 ** parseInt(txInfo.tokenDecimal),
        txHash: txInfo.hash,
        explorerUrl:
          "https://" + networkDetails.explorerUrl + "/tx/" + txInfo.hash,
        usdValue:
          (parseInt(txInfo.value) / 10 ** parseInt(txInfo.tokenDecimal)) *
          tokenValue,
        native: platformId,
      });
    });
    return tokenTxsChartData;
  }
  return null;
};
