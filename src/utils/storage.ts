export interface LocalStorageData {
  homeCoinData?: { id: string; nft: boolean };
  portfolioCoinData?: {
    id: string;
    ticker: string;
    iconUrl: string;
    amount: number;
    nft: boolean;
  };
  selectedToken?: string;
  searchPref?: string;
  startPref?: string;
  searchResultNftAmount?: number;
}

// SETTERS
export async function setSelectedTokenStorage(token: string): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ selectedToken: token }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setSelectedToken error: ", error);
  }
}
export async function setSearchPrefStorage(searchPref: string): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ searchPref: searchPref }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setSearchPrefStorage error: ", error);
  }
}
export async function setStartPrefStorage(startPref: string): Promise<void> {
  try {
    return new Promise((resolve) => {
      chrome.storage.local.set({ startPref: startPref }, () => {
        resolve();
      });
    });
  } catch (error) {
    console.log("setStartPrefStorage error: ", error);
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
      // chrome.storage.local.set({ portfolioCoinData: [] }, () => {
      //   resolve();
      // });

      chrome.storage.local.get("portfolioCoinData", (result) => {
        const existingData = result.portfolioCoinData || [];
        let updatedData = [];
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
        console.log("updatedData1: ", updatedData);
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
export async function getSelectedTokenStorage(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["selectedToken"], (res: LocalStorageData) => {
      if (res?.selectedToken) {
        resolve(res.selectedToken);
      } else {
        resolve(null);
      }
    });
  });
}
export async function getSearchPrefStorage(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["searchPref"], (res: LocalStorageData) => {
      if (res?.searchPref) {
        resolve(res.searchPref);
      } else {
        resolve(null);
      }
    });
  });
}
export async function getStartPrefStorage(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["startPref"], (res: LocalStorageData) => {
      if (res?.startPref) {
        resolve(res.startPref);
      } else {
        resolve(null);
      }
    });
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
