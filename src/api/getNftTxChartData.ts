import { fetchNftTxs } from "./api";
import { delay } from "./delay";

export const getNftTxChartData = async (
  platformId: string,
  contractAddress: string,
): Promise<any> => {
  let domain: string;

  switch (platformId) {
    case "arbitrum-one":
      domain = "api.arbiscan.io";
      break;
    case "avalanche":
      domain = "api.snowtrace.io";
      break;
    case "base":
      domain = "api.basescan.org";
      break;
    case "binance-smart-chain":
      domain = "api.bscscan.com";
      break;
    case "celo":
      domain = "api.celoscan.io";
      break;
    case "cronos":
      domain = "api.cronoscan.com";
      break;
    case "ethereum":
      domain = "api.etherscan.io";
      break;
    case "fantom":
      domain = "api.ftmscan.com";
      break;
    case "polygon-pos":
      domain = "api.polygonscan.com";
      break;
    case "optimistic-ethereum":
      domain = "api-optimistic.etherscan.io";
      break;

    default:
      console.log(`getNftTxChartData error: Invalid platformId: ${platformId}`);
      return [];
  }

  let nftTxsData = await fetchNftTxs(domain, contractAddress, 10000);

  if (nftTxsData.status === "0") {
    console.log("nftTxsData.status ==== 0: ", nftTxsData);
    await delay(5500);
    nftTxsData = await fetchNftTxs(domain, contractAddress, 10000);
  }

  if (nftTxsData.status !== "0" && nftTxsData.result) {
    const nftTxsChartFormat: { date: Date; volume: number }[] = Object.entries(
      nftTxsData.result.reduce(
        (
          result: { [dateString: string]: { date: Date; volume: number } },
          txInfo: any,
        ) => {
          const date = new Date(Number(txInfo.timeStamp) * 1000);
          const dateString = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });

          if (result[dateString]) {
            result[dateString].volume += 1;
          } else {
            result[dateString] = { date: date, volume: 1 };
          }
          return result;
        },
        {},
      ),
    ).map(([, { date, volume }]) => ({ date, volume }));
    return nftTxsChartFormat.reverse();
  }
  console.log(
    `getTokenTxChartData error: Couldn't find txs for: ${contractAddress} on ${platformId}`,
  );
  return null;
};
