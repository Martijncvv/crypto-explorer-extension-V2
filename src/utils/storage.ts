import {
  IDetailedCoinInfo,
  IPriceHistoryData,
  ITrendingCoinList,
} from "../models/ICoinInfo";
import {
  SHARED_API_DELAY,
  SHARED_API_KEY_COINGECKO,
} from "../static/constants";
import { delay } from "../api/delay";

export type TrackedAccountType = {
  name: string;
  address: string;
  nonce: string;
  lastUpdated: Date;
};

export interface LocalStorageData {
  homeCoinData?: { id: string; nft: boolean };
  storedCoinData: {
    lastUpdated: number;
    storedCoin: IDetailedCoinInfo;
    coinId: string;
  };
  storedCoinPriceHistoryData: {
    lastUpdated: number;
    priceHistory: IPriceHistoryData;
    coinId: string;
    chartRange: string;
  };
  coinPricesData: {
    lastUpdated: number;
    coinPrices: any;
    coinIds: string[];
  };
  trendingCoinsData?: { lastUpdated: number; trendingCoins: ITrendingCoinList };
  portfolioCoinData?: {
    id: string;
    ticker: string;
    iconUrl: string;
    amount: number;
    nft: boolean;
  };
  // selectedToken?: string;
  coingeckoApiKey?: string;
  searchResultNftAmount?: number;
  trackedAccounts?: TrackedAccountType[];
}

// SETTERS
export async function setTrendingCoinsStorage(
  trendingCoins: ITrendingCoinList,
): Promise<boolean> {
  // get time of now
  const currentTime = new Date().getTime();

  try {
    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          trendingCoinsData: {
            lastUpdated: currentTime,
            trendingCoins: trendingCoins,
          },
        },
        () => {
          resolve(true);
        },
      );
    });
  } catch (error) {
    console.log("setTrendingCoinsStorage error: ", error);
    return false;
  }
}

export async function setCoinPricesDataStorage(
  coinPrices: IPriceHistoryData,
  coinIds: string[],
): Promise<boolean> {
  // get time of now
  const currentTime = new Date().getTime();

  try {
    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          coinPricesData: {
            coinIds: coinIds,
            lastUpdated: currentTime,
            coinPrices: coinPrices,
          },
        },
        () => {
          resolve(true);
        },
      );
    });
  } catch (error) {
    console.log("setCoinPricesDataStorage error: ", error);
    return false;
  }
}

export async function setStoredCoinPriceHistoryDataStorage(
  coinPrices: IPriceHistoryData,
  coinId: string,
  chartRange: string,
): Promise<boolean> {
  const currentTime = new Date().getTime();

  try {
    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          storedCoinPriceHistoryData: {
            priceHistory: coinPrices,
            chartRange: chartRange,
            coinId: coinId,
            lastUpdated: currentTime,
          },
        },
        () => {
          resolve(true);
        },
      );
    });
  } catch (error) {
    console.log("setStoredCoinPriceHistoryDataStorage error: ", error);
    return false;
  }
}

export async function setTrackedAccountsStorage(
  trackedAccounts: TrackedAccountType[],
): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ trackedAccounts: trackedAccounts }, () => {
        resolve(true);
      });
    });
  } catch (error) {
    console.log("setTrackedAccountsStorage error: ", error);
    return false;
  }
}

export async function setStoredCoinDataStorage(
  storedCoin: IDetailedCoinInfo,
  coinId: string,
): Promise<void> {
  try {
    const currentTime = new Date().getTime();

    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          storedCoinData: {
            lastUpdated: currentTime,
            storedCoin: storedCoin,
            coinId: coinId,
          },
        },
        () => {
          resolve();
        },
      );
    });
  } catch (error) {
    console.log("setStoredCoinDataStorage error: ", error);
  }
}

export async function setCoingeckoApiKeyStorage(
  coingeckoApiKey: string,
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ coingeckoApiKey: coingeckoApiKey }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setCoingeckoApiKeyStorage error: ", error);
  }
}

export async function setSearchResultNftAmountStorage(
  searchResultNftAmount: number,
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ searchResultNftAmount }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setSearchResultNftAmountStorage error: ", error);
  }
}

export async function setHomeCoinStorage(
  homeCoinData: LocalStorageData["homeCoinData"],
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ homeCoinData }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setHomeCoinStorage error: ", error);
  }
}

export async function setPortfolioDataStorage(
  newCoinData: LocalStorageData["portfolioCoinData"],
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.get("portfolioCoinData", (result) => {
        const existingData = result.portfolioCoinData || [];
        let updatedData;
        if (existingData.length > 0) {
          const existingCoinIndex = existingData.findIndex(
            (coin) => coin.id === newCoinData.id,
          );
          if (existingCoinIndex === -1) {
            updatedData = [...existingData, newCoinData];
          } else {
            updatedData = existingData.filter(
              (coin) => coin.id !== newCoinData.id,
            );
          }
        } else {
          updatedData = [newCoinData];
        }
        chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
          resolve();
        });
      });
    });
  } catch (error) {
    console.log("setPortfolioDataStorage error: ", error);
  }
}

export async function changePortfolioCoinAmountStorage(
  coinId: string,
  amount: number,
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.get("portfolioCoinData", (result) => {
        const existingData = result.portfolioCoinData || [];

        const updatedData = existingData.map((coinInfo) => {
          if (coinInfo.id === coinId) {
            return { ...coinInfo, amount };
          }
          return coinInfo;
        });

        chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
          resolve();
        });
      });
    });
  } catch (error) {
    console.log("changePortfolioCoinAmountStorage error: ", error);
  }
}

export async function removePortfolioCoinStorage(
  coinId: string,
): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.get("portfolioCoinData", (result) => {
        const existingData = result.portfolioCoinData || [];

        const updatedData = existingData.filter((coinInfo) => {
          return coinInfo.id !== coinId;
        });

        chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
          resolve();
        });
      });
    });
  } catch (error) {
    console.log("setPortfolioCoinStorage error: ", error);
  }
}

// GETTERS

export async function getTrendingCoinsStorage(): Promise<{
  lastUpdated: number;
  trendingCoins: ITrendingCoinList;
}> {
  return await new Promise((resolve) => {
    chrome.storage.local.get(["trendingCoinsData"], (res: LocalStorageData) => {
      if (res?.trendingCoinsData) {
        resolve(res.trendingCoinsData);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getStoredCoinPriceHistoryData(): Promise<{
  lastUpdated: number;
  priceHistory: IPriceHistoryData;
  coinId: string;
  chartRange: string;
}> {
  return await new Promise((resolve) => {
    chrome.storage.local.get(
      ["storedCoinPriceHistoryData"],
      (res: LocalStorageData) => {
        if (res?.storedCoinPriceHistoryData) {
          resolve(res.storedCoinPriceHistoryData);
        } else {
          resolve(null);
        }
      },
    );
  });
}

export async function getCoinPricesDataStorage(): Promise<{
  lastUpdated: number;
  coinPrices: any;
  coinIds: string[];
}> {
  return await new Promise((resolve) => {
    chrome.storage.local.get(["coinPricesData"], (res: LocalStorageData) => {
      if (res?.coinPricesData) {
        resolve(res.coinPricesData);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getStoredCoinDataStorage(): Promise<{
  lastUpdated: number;
  storedCoin: IDetailedCoinInfo;
  coinId: string;
}> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["storedCoinData"], (res: LocalStorageData) => {
      if (res?.storedCoinData) {
        resolve(res.storedCoinData);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getTrackedAccountsStorage(): Promise<
  TrackedAccountType[]
> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["trackedAccounts"], (res: LocalStorageData) => {
      if (res?.trackedAccounts) {
        resolve(res.trackedAccounts);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getCoingeckoApiKeyStorage(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(
      ["coingeckoApiKey"],
      async (res: LocalStorageData) => {
        if (res?.coingeckoApiKey) {
          resolve(res.coingeckoApiKey);
        } else {
          await delay(SHARED_API_DELAY);
          resolve(SHARED_API_KEY_COINGECKO);
        }
      },
    );
  });
}

export async function getSearchResultNftAmountStorage(): Promise<number> {
  return new Promise((resolve) => {
    chrome.storage.local.get(
      ["searchResultNftAmount"],
      (res: LocalStorageData) => {
        if (res?.searchResultNftAmount) {
          resolve(res.searchResultNftAmount);
        } else {
          resolve(null);
        }
      },
    );
  });
}

export async function getHomeCoinStorage(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["homeCoinData"], (res: LocalStorageData) => {
      if (res?.homeCoinData) {
        resolve(res.homeCoinData);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getPortfolioDataStorage(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["portfolioCoinData"], (res: LocalStorageData) => {
      if (res?.portfolioCoinData) {
        resolve(res.portfolioCoinData);
      } else {
        resolve(null);
      }
    });
  });
}
