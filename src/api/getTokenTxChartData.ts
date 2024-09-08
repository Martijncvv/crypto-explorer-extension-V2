import { fetchTokenTxs } from "./api";
import { delay } from "./delay";

export const getTokenTxChartData = async (
  platformId: string,
  contractAddress: string,
  tokenValue: number,
): Promise<any> => {
  let domain: string;
  let explorerUrl: string;

  switch (platformId) {
    case "arbitrum-one":
      domain = "api.arbiscan.io";
      explorerUrl = "arbiscan.io";
      break;
    case "avalanche":
      domain = "api.snowtrace.io";
      explorerUrl = "snowtrace.io";
      break;
    case "base":
      domain = "api.basescan.org";
      explorerUrl = "basescan.org";
      break;
    case "binance-smart-chain":
      domain = "api.bscscan.com";
      explorerUrl = "bscscan.com";
      break;
    case "celo":
      domain = "api.celoscan.io";
      explorerUrl = "celoscan.io";
      break;
    case "cronos":
      domain = "api.cronoscan.com";
      explorerUrl = "cronoscan.com";
      break;
    case "ethereum":
      domain = "api.etherscan.io";
      explorerUrl = "etherscan.io";
      break;
    case "fantom":
      domain = "api.ftmscan.com";
      explorerUrl = "ftmscan.com";
      break;
    case "polygon-pos":
      domain = "api.polygonscan.com";
      explorerUrl = "polygonscan.com";
      break;
    case "optimistic-ethereum":
      domain = "api-optimistic.etherscan.io";
      explorerUrl = "optimistic.etherscan.io";
      break;
    default:
      console.log(
        `getTokenTxChartData error: Invalid platformId: ${platformId}`,
      );
      return [];
  }

  let tokenTxsData = await fetchTokenTxs(domain, contractAddress, 10000);

  if (tokenTxsData.status === "0") {
    console.log("tokenTxsData.status ==== 0: ", tokenTxsData);
    await delay(5500);
    tokenTxsData = await fetchTokenTxs(domain, contractAddress, 10000);
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
        explorerUrl: "https://" + explorerUrl + "/tx/" + txInfo.hash,
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
