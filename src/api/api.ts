import {
  ITrendingCoinList,
  IPriceHistoryData,
  ISearchCoinList,
  IDetailedCoinInfo,
} from "../models/ICoinInfo";
import { IDetailedNftInfo } from "../models/INftInfo";
import { ITokenTxs } from "../models/ITokenTxs";
import {
  getCoingeckoApiKeyStorage,
  getCoinPricesDataStorage,
  getStoredCoinDataStorage,
  getStoredCoinPriceHistoryData,
  getTrendingCoinsStorage,
  setCoinPricesDataStorage,
  setStoredCoinDataStorage,
  setStoredCoinPriceHistoryDataStorage,
  setTrendingCoinsStorage,
} from "../utils/storage";
import {
  CACHE_TIME_LONG,
  CACHE_TIME_SHORT,
  SHARED_API_KEY_ETHERSCAN,
} from "../static/constants";

// const COINGECKO_EXCHANGES_LIST_API = 'https://api.coingecko.com/api/v3/exchanges?per_page=250'

export async function fetchNameSearch(
  searchQuery: string,
): Promise<ISearchCoinList> {
  try {
    const API_KEY = await getCoingeckoApiKeyStorage();

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, Coingecko searchQuery ${searchQuery}: ${res.status} ${res.statusText}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "Error fetching  Coingecko searchQuery ${searchQuery}",
      error,
    );
    throw error;
  }
}

export async function fetchTrendingCoins(): Promise<ITrendingCoinList> {
  try {
    // if got trending coins in the last 3 hours, return from storage
    const trendingCoinsStorage = await getTrendingCoinsStorage();
    const currentTime = new Date().getTime();

    const lastUpdated = trendingCoinsStorage?.lastUpdated;

    if (
      trendingCoinsStorage?.trendingCoins?.coins?.length > 0 &&
      lastUpdated > currentTime - CACHE_TIME_LONG
    ) {
      console.log("STORAGE - GOT TRENDING COINS");
      return trendingCoinsStorage.trendingCoins;
    } else {
      try {
        console.log("FETCHING TRENDING COINS");
        const API_KEY = await getCoingeckoApiKeyStorage();
        const res = await fetch(
          `https://api.coingecko.com/api/v3/search/trending?&x_cg_demo_api_key=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error(
            `Fetch error, Hot Coins: ${res.status} ${res.statusText}`,
          );
        }

        const trendingCoins = await res.json();
        await setTrendingCoinsStorage(trendingCoins);
        return trendingCoins;
      } catch (error) {
        console.error(
          "Error-fetchTrendingCoins: fetching trending Coins:",
          error,
        );
        throw error;
      }
    }
  } catch (error) {
    console.error("Error-fetchTrendingCoins: getting trending Coins:", error);
    throw error;
  }
}

export async function fetchCoinsPrices(coinIds: string[]): Promise<any> {
  try {
    // if got coin in the last 20 minutes, return from storage
    const storedCoinPricesData = await getCoinPricesDataStorage();

    const currentTime = new Date().getTime();
    const lastUpdated = storedCoinPricesData?.lastUpdated;

    function arraysEqual(a, b) {
      if (a.length !== b.length) return false;

      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    if (
      lastUpdated > currentTime - CACHE_TIME_SHORT &&
      arraysEqual(storedCoinPricesData?.coinIds, coinIds)
    ) {
      console.log(`STORAGE - GOT COINPRICES $${coinIds}`);
      return storedCoinPricesData.coinPrices;
    } else {
      try {
        const API_KEY = await getCoingeckoApiKeyStorage();
        const coinSearchUrl = coinIds.join("%2C");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSearchUrl}&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error(
            `Error-fetchCoinsPrices: coin info data (${coinIds}): ${res.status} ${res.statusText}`,
          );
        }
        console.log(`FETCHED COIN PRICES ${coinIds}`);
        const coinPrices = await res.json();
        setCoinPricesDataStorage(coinPrices, coinIds);
        return coinPrices;
      } catch (error) {
        console.error(
          `fetchCoinsPrices-fetching coin info data (${coinIds}):`,
          error,
        );
        throw error;
      }
    }
  } catch (error) {
    console.error(
      `Error-fetchCoinsPrices: getting coin info data (${coinIds}):`,
      error,
    );
  }
}

export async function fetchPriceHistoryData(
  coinId: string,
  quote: string,
  chartRange: string,
): Promise<IPriceHistoryData> {
  coinId = coinId || "bitcoin";
  quote = quote || "usd";
  chartRange = chartRange || "30";

  try {
    // if got coin in the last 20 minutes, return from storage
    const storedCoinPriceHistoryData = await getStoredCoinPriceHistoryData();
    const currentTime = new Date().getTime();
    const lastUpdated = storedCoinPriceHistoryData?.lastUpdated;

    if (
      lastUpdated > currentTime - CACHE_TIME_SHORT &&
      storedCoinPriceHistoryData?.coinId === coinId &&
      storedCoinPriceHistoryData?.chartRange === chartRange
    ) {
      console.log(`STORAGE - GOT COIN PRICEHISTORY $${coinId} ${chartRange}`);
      return storedCoinPriceHistoryData.priceHistory;
    } else {
      try {
        const API_KEY = await getCoingeckoApiKeyStorage();
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=${chartRange}&interval=daily&x_cg_demo_api_key=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error(
            `Fetch error, price history data (${coinId}): ${res.status} ${res.statusText}`,
          );
        }
        console.log(`FETCHED - COIN price history $${coinId}`);

        const priceHistory = await res.json();
        setStoredCoinPriceHistoryDataStorage(priceHistory, coinId, chartRange);
        return priceHistory;
      } catch (error) {
        console.error(`Error fetching price history data (${coinId}):`, error);
        throw error;
      }
    }
  } catch (error) {
    console.error(
      `Error-fetchPriceHistoryData: getting coin info data (${coinId}):`,
      error,
    );
  }
}

export async function fetchCoinInfo(
  coinId: string,
): Promise<IDetailedCoinInfo> {
  coinId = coinId || "bitcoin";
  try {
    // if got coin in the last 20 minutes, return from storage
    const storedCoinStorage = await getStoredCoinDataStorage();
    const currentTime = new Date().getTime();

    const lastUpdated = storedCoinStorage?.lastUpdated;
    if (
      storedCoinStorage?.coinId === coinId &&
      lastUpdated > currentTime - 300000
    ) {
      console.log(`STORAGE - GOT COIN INFO $${coinId}`);
      return storedCoinStorage.storedCoin;
    } else {
      try {
        const API_KEY = await getCoingeckoApiKeyStorage();
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_demo_api_key=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error(
            `Fetch error, coin info data (${coinId}): ${res.status} ${res.statusText}`,
          );
        }
        console.log(`FETCHED COIN INFO $${coinId}`);
        const coinInfo = await res.json();
        setStoredCoinDataStorage(coinInfo, coinId);
        return coinInfo;
      } catch (error) {
        console.error(
          `Error-fetchCoinInfo: fetching coin info data (${coinId}):`,
          error,
        );
        throw error;
      }
    }
  } catch (error) {
    console.error(
      `Error-fetchCoinInfo: getting coin info data (${coinId}):`,
      error,
    );
  }
}

export async function fetchNftInfo(coinId: string): Promise<IDetailedNftInfo> {
  try {
    const API_KEY = await getCoingeckoApiKeyStorage();
    const res = await fetch(
      `https://api.coingecko.com/api/v3/nfts/${coinId}?&x_cg_demo_api_key=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, NFT info data (${coinId}): ${res.status} ${res.statusText}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching NFT info data (${coinId}):`, error);
    throw error;
  }
}

export async function fetchNftTxs(
  domainName: string,
  contractAddress: string,
  txAmount: number,
): Promise<ITokenTxs> {
  try {
    const API_KEY = await getCoingeckoApiKeyStorage();
    const res = await fetch(
      `https://${domainName}/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&page=1&offset=${txAmount}&startblock=0&endblock=999999999&sort=desc&x_cg_demo_api_key=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, ${domainName} nft txs info: ${res.status} ${res.statusText}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching nft token txs info:", error);
    throw error;
  }
}

export async function fetchTokenTxs(
  domainName: string,
  contractAddress: string,
  txAmount: number,
): Promise<ITokenTxs> {
  try {
    const res = await fetch(
      `https://${domainName}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=${txAmount}&startblock=0&endblock=99999999&sort=desc&apikey=${SHARED_API_KEY_ETHERSCAN}`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, ${domainName} token txs info: ${res.status} ${res.statusText}`,
      );
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching token txs info:", error);
    throw error;
  }
}

export async function fetchLatestAddressTxs(
  address: string,
): Promise<ITokenTxs> {
  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${SHARED_API_KEY_ETHERSCAN}`,
    );

    if (!res.ok) {
      throw new Error(
        `Fetch error, ${address} fetchLatestAddressTxs txs info: ${res.status} ${res.statusText}`,
      );
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching txstchLatestAddressTxs:", error);
    throw error;
  }
}

// used to fetch exchanges
export async function fetchExchangesList(): Promise<any> {
  try {
    let pageNr = 1;
    let perPage = 250;
    let allExchanges = [];

    while (true) {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/exchanges?per_page=${perPage}&page=${pageNr}`,
      );

      if (!res.ok) {
        throw new Error(
          `Fetch error, Coingecko exchanges List: ${res.status} ${res.statusText}`,
        );
      }
      const exchanges = await res.json();
      allExchanges.push(...exchanges);
      if (exchanges.length < perPage) {
        // Reached the last page, exit the loop
        break;
      }
      pageNr++;
    }

    const exchangesObject = allExchanges.reduce((acc, exchange) => {
      acc[exchange.id] = exchange.image;
      // acc[`"${exchange.id}"`] = exchange.image;
      return acc;
    }, {});

    console.log("exchangesObject", JSON.stringify(exchangesObject, null, 2));
    console.log("exchangesObject.length", Object.keys(exchangesObject).length);
  } catch (error) {
    console.error("Error fetching Coingecko exchanges List:", error);
    throw error;
  }
}
