import { fetchNftTxs } from "./api";
import { delay } from "./delay";
import { NETWORK_DETAILS } from "../static/constants";

export const getNftTxChartData = async (
  platformId: string,
  contractAddress: string,
): Promise<any> => {
  const networkDetails = NETWORK_DETAILS[platformId];

  let nftTxsData = await fetchNftTxs(
    networkDetails.domain,
    contractAddress,
    10000,
    networkDetails.apikey,
  );

  if (nftTxsData.status === "0") {
    console.log("nftTxsData.status ==== 0: ", nftTxsData);
    await delay(5500);
    nftTxsData = await fetchNftTxs(
      networkDetails.domain,
      contractAddress,
      10000,
      networkDetails.apikey,
    );
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
