import React, { CSSProperties, useState, useEffect, useRef } from "react";
import colors from "../static/colors";
import constants, { SHARED_API_KEY } from "../static/constants";
import {
  fetchCoinInfo,
  fetchPriceHistoryData,
  fetchNameSearch,
  fetchTrendingCoins,
  fetchNftTxs,
  fetchNftInfo,
  fetchTokenTxs,
} from "../utils/api";
import {
  IDetailedCoinInfo,
  ISearchCoinList,
  ISearchOptions,
  ITrendingCoinList,
} from "../models/ICoinInfo";
import { IDetailedNftInfo } from "../models/INftInfo";
import {
  getCoingeckoApiKeyStorage,
  getHomeCoinStorage,
  getSearchPrefStorage,
  getSearchResultNftAmountStorage,
  getStartPrefStorage,
  getTrendingCoinsStorage,
  setHomeCoinStorage,
  setTrendingCoinsStorage,
} from "../utils/storage";

import CircularProgress from "@mui/material/CircularProgress";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { delay } from "../utils/delay";

interface HeaderBlockProps {
  mainLogo: string;
  setCoinInfo: (coinInfo: IDetailedCoinInfo) => void;
  setNftInfo: (nftInfo: IDetailedNftInfo) => void;
  setTxVolumeChartData: (txVolumeChartData: any) => void;
  setTokenTxsChartData: (tokenTxsChartData: any) => void;
  setMenuIsOpen: (menuIsOpen: any) => void;
  portfolioCoinClick: any;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  mainLogo,
  setCoinInfo,
  setNftInfo,
  setTxVolumeChartData,
  setTokenTxsChartData,
  setMenuIsOpen,
  portfolioCoinClick,
}) => {
  const searchResultsRef = useRef(null);
  const inputRef = useRef(null);
  const [loadingError, setLoadingError] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({
    isLoading: false,
    isError: false,
  });
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [displayResults, setDisplayResults] = useState<ISearchOptions>({
    tokens: [],
    total: 0,
  });

  const [searchInput, setSearchInput] = useState<string>("");
  const [coingeckoKeyFeedback, setCoingeckoKeyFeedback] =
    useState<boolean>(false);

  const styles: { [key: string]: CSSProperties } = {
    headerBlock: {
      display: "flex",
      alignItems: "center",
    },
    menuIconBlock: {
      width: 40,
      height: 40,
      borderRadius: constants.border_radius,
      backgroundColor: colors.primary_dark,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },

    searchbar: {
      marginLeft: 12,
      width: 202,
      height: 40,
      borderRadius: constants.border_radius,
      backgroundColor: colors.primary_dark,

      display: "flex",
      alignItems: "center",
      position: "relative",
    },
    searchbarImage: {
      width: 20,
      height: 20,
      marginLeft: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchInput: {
      marginLeft: 12,
      border: "none",
      background: "transparent",
      color: "white",
      outline: "none",
      width: "100%",
    },

    searchResults: {
      position: "absolute",
      width: 202,
      marginLeft: 52,
      zIndex: 99,
      display: "flex",
      flexDirection: "column",
      color: "#3381e8",

      background: "linear-gradient(to bottom, #2F396D 0%, #3E6CB6 80%)",
      borderBottomLeftRadius: constants.border_radius,
      borderBottomRightRadius: constants.border_radius,
    },
    coinSearchInfo: {
      display: "flex",
      padding: 9,
      alignItems: "center",
      cursor: "pointer",
    } as any,

    coinSearchInfoFocus: {
      boxShadow: `inset 0 0 4px 3px rgba(255, 255, 255, 0.5)`,
      outline: "none",
      borderRadius: constants.border_radius_small,
    } as any,

    coinImage: {
      width: 22,
      height: 22,
      borderRadius: constants.border_radius_small,
    },

    exchangeName: {
      paddingLeft: 12,
      width: 100,
      color: colors.white_medium,
      fontSize: constants.font_medium,
      fontWeight: constants.font_weight_medium,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    marketCapRank: {
      paddingLeft: 6,
      width: 40,
      color: colors.accent_medium,
      fontSize: constants.font_small,
      fontWeight: constants.font_weight_medium,
    },
    mainLogo: {
      marginLeft: 12,
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    indicationIcon: {
      marginLeft: 12,
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
  };

  const checkStorage = async () => {
    const startPref = await getStartPrefStorage();

    const API_KEY = await getCoingeckoApiKeyStorage();

    if (API_KEY === SHARED_API_KEY) {
      setCoingeckoKeyFeedback(true);
    } else {
      setCoingeckoKeyFeedback(false);
    }

    if (startPref === "search") {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
    // const selectedTokenStorage = await getSelectedTokenStorage();

    // if (selectedTokenStorage) {
    //   setSearchInput(selectedTokenStorage);
    //   searchCoinNames(selectedTokenStorage);
    //   setSelectedTokenStorage("");
    // } else {

    const homeCoinStorage = await getHomeCoinStorage();
    if (homeCoinStorage?.id && homeCoinStorage?.nft) {
      fetchDetailedNftInfo(homeCoinStorage.id);
    } else if (homeCoinStorage?.id) {
      fetchDetailedTokenInfo(homeCoinStorage.id);
    } else {
      fetchDetailedTokenInfo("bitcoin");
    }
  };
  // };

  // get detailed coin info and trending info on startup
  useEffect(() => {
    checkStorage();
    getTrendingCoins();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // handle arrow up key press, collapse
  useEffect(() => {
    const handleKeyDownSearch = (event) => {
      if (event.key === "ArrowUp" && isExpanded) {
        if (focusedOptionIndex > 0) {
          setFocusedOptionIndex((focusedOptionIndex) => focusedOptionIndex - 1);
        } else {
          setIsExpanded(false);
        }
      } else if (event.key === "ArrowDown") {
        if (isExpanded) {
          setFocusedOptionIndex((focusedOptionIndex) => focusedOptionIndex + 1);
        } else {
          setIsExpanded(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDownSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDownSearch);
    };
  }, [focusedOptionIndex]);

  // functionality for clicking outside of the search results block
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the expansion if the click is outside of the search results block
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };

  const getTrendingCoins = async () => {
    try {
      const trendingCoins = await fetchTrendingCoins();

      let searchFormat: ISearchOptions = { tokens: [], total: 0 };
      let trendingTickers = "Top Searched Coins of the Day\n";
      trendingCoins.coins.forEach((coin) => {
        trendingTickers =
          trendingTickers +
          `- ${coin.item.name}, $${coin.item.symbol.toUpperCase()} #${
            coin.item.market_cap_rank
          }\n`;
        searchFormat.tokens.push({
          id: coin.item.id,
          name: coin.item.name,
          image: coin.item.small,
          marketCapRank: coin.item.market_cap_rank,
          nft: false,
        });
      });
      trendingTickers =
        trendingTickers +
        "\nCrypto Explorer Extension\n" +
        "https://chrome.google.com/webstore/detail/crypto-tracker-blockchain/pkaheoacmbdgnemgmcdbekniooabcnmc?hl=en&authuser=0";
      trendingTickers = trendingTickers + "\n#BTC $ETH";

      searchFormat.tokens.unshift({
        id: "",
        name: `Top Trending`,
        image: "",
        marketCapRank: "",
        nft: true,
      });
      console.log(trendingTickers);
      setDisplayResults(searchFormat);
      return searchFormat;
    } catch (error) {
      console.error("getTrendingCoins: Error fetching trending coins:", error);
    }
  };

  const searchCoinNames = async (searchInputProp?: string) => {
    try {
      const searchResults: ISearchCoinList = await fetchNameSearch(
        searchInputProp || searchInput,
      );
      if (searchResults.coins.length === 0 && searchResults.nfts.length === 0) {
        setDisplayResults({
          tokens: [
            {
              id: "noResult",
              name: "No results",
              image:
                "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
              marketCapRank: "",
              nft: false,
            },
          ],
          total: 0,
        });

        setSearchInput("");

        return;
      }
      const nrOfNfts = (await getSearchResultNftAmountStorage()) || 3;
      let displayNrOfNfts: number = Math.min(
        searchResults.nfts.length,
        nrOfNfts,
      );
      let displayNrOfCoins: number = 13 - displayNrOfNfts;

      const searchpreference = (await getSearchPrefStorage()) || "coins";
      if (searchpreference === "coins") {
        let searchFormat: ISearchOptions = { tokens: [], total: 0 };
        // SET COINS
        searchResults.coins.slice(0, displayNrOfCoins).forEach((coin) => {
          searchFormat.tokens.push({
            id: coin.id,
            name: coin.name,
            image: coin.large,
            marketCapRank: coin.market_cap_rank,
            nft: false,
          });
        });
        // SET NFTs
        searchResults.nfts.slice(0, displayNrOfNfts).forEach((nft) => {
          searchFormat.tokens.push({
            id: nft.id,
            name: nft.name,
            image: nft.thumb,
            marketCapRank: "NFT",
            nft: true,
          });
        });
        searchFormat.total =
          searchResults.coins.length + searchResults.nfts.length;
        if (searchFormat.total > 13) {
          searchFormat.tokens.push({
            id: "",
            name: `${searchFormat.total - 13} others`,
            image: "",
            marketCapRank: "",
            nft: true,
          });
        }
        setDisplayResults(searchFormat);
      } else {
        let searchFormat: ISearchOptions = { tokens: [], total: 0 };
        // SET NFTs
        searchResults.nfts.slice(0, displayNrOfNfts).forEach((nft) => {
          searchFormat.tokens.push({
            id: nft.id,
            name: nft.name,
            image: nft.thumb,
            marketCapRank: "NFT",
            nft: true,
          });
        });
        // SET COINS
        searchResults.coins.slice(0, displayNrOfCoins).forEach((coin) => {
          searchFormat.tokens.push({
            id: coin.id,
            name: coin.name,
            image: coin.large,
            marketCapRank: coin.market_cap_rank,
            nft: false,
          });
        });

        searchFormat.total =
          searchResults.coins.length + searchResults.nfts.length;
        if (searchFormat.total > 13) {
          searchFormat.tokens.push({
            id: "",
            name: `${searchFormat.total - 13} others`,
            image: "",
            marketCapRank: "",
            nft: true,
          });
        }
        setDisplayResults(searchFormat);
      }
    } catch (error) {
      console.error("handleSearch: Error searching for coins:", error);
      setDisplayResults({
        tokens: [
          {
            id: "noResult",
            name: "No results",
            image:
              "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            marketCapRank: "",
            nft: false,
          },
        ],
        total: 0,
      });
      setSearchInput("");
    }
  };

  async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (searchInput.length > 0) {
        searchCoinNames();
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
        getTrendingCoins();
      }
    }
  }

  async function handleFocus() {
    setIsExpanded(true);
  }

  useEffect(() => {
    if (portfolioCoinClick?.id) {
      fetchDetailedTokenInfo(portfolioCoinClick.id);
    }
  }, [portfolioCoinClick]);

  const fetchDetailedTokenInfo = async (coinId: string) => {
    try {
      setLoadingError({ isLoading: true, isError: false });

      setTxVolumeChartData([]);
      setTokenTxsChartData([]);
      const [coinInfo, priceMaxHistoryDataRes] = await Promise.all([
        fetchCoinInfo(coinId),
        fetchPriceHistoryData(coinId, "usd", "max"),
      ]);
      if (!coinInfo) {
        console.log(`No results for coinInfo ${coinId}`);
        setLoadingError({ isLoading: false, isError: true });
        return;
      }
      if (!priceMaxHistoryDataRes) {
        console.log(`No results for priceMaxHistoryData ${coinId}`);
        setLoadingError({ isLoading: false, isError: true });
        return;
      }

      // get past 30 days
      coinInfo.price30dHistoryData = FormatChartData({
        prices: priceMaxHistoryDataRes.prices.slice(-31),
        total_volumes: priceMaxHistoryDataRes.total_volumes.slice(-31),
      });
      coinInfo.priceMaxHistoryData = FormatChartData(priceMaxHistoryDataRes);

      setCoinInfo(coinInfo);
      setNftInfo(null);

      if (coinInfo.asset_platform_id && coinInfo.contract_address) {
        await delay(1000);
        const tokenTxChartData = await getTokenTxChartData(
          coinInfo.asset_platform_id,
          coinInfo.contract_address,
          coinInfo.market_data.current_price.usd,
        );

        if (!tokenTxChartData) {
          setLoadingError({ isLoading: false, isError: true });
          console.log(`No results for getTokenTxChartData ${coinId}`);
          return;
        }

        setTokenTxsChartData(tokenTxChartData);
      }
      setLoadingError({ isLoading: false, isError: false });
      return;
    } catch (error) {
      setLoadingError({ isLoading: false, isError: true });
      console.error(
        `fetchDetailedTokenInfo: Error searching for coin: ${coinId}`,
        error,
      );
    }
  };
  const fetchDetailedNftInfo = async (coinId: string) => {
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

  const FormatChartData = (priceHistoryData) => {
    delete priceHistoryData.market_caps;

    if (priceHistoryData.prices.length > 300) {
      priceHistoryData.prices = downsampling(priceHistoryData.prices, 300);
      priceHistoryData.total_volumes = downsampling(
        priceHistoryData.total_volumes,
        300,
      );
    }
    // add all previous day-candle close data
    let formattedChartData: any = [];
    for (let i = 0; i < priceHistoryData.prices.length - 1; i++) {
      const unixPriceArray = priceHistoryData.prices[i];
      const unixVolumeArray = priceHistoryData.total_volumes[i];
      const date = new Date(unixPriceArray[0] - 86400000);
      formattedChartData.push({
        date: date,
        price: unixPriceArray[1],
        totalVolume: unixVolumeArray[1],
      });
    }
    // add today's current volume/price
    const unixPriceArray = priceHistoryData.prices[formattedChartData.length];
    const unixVolumeArray =
      priceHistoryData.total_volumes[formattedChartData.length];
    const date = new Date(unixPriceArray[0]);
    formattedChartData.push({
      date: date,
      price: unixPriceArray[1],
      totalVolume: unixVolumeArray[1],
    });

    // Calculate the min and maximum price and volume value
    let minPrice = Math.min(
      ...formattedChartData.map((dateData) => dateData.price),
    );
    let maxPrice = Math.max(
      ...formattedChartData.map((dateData) => dateData.price),
    );
    let maxVolume = Math.max(
      ...formattedChartData.map((dateData) => dateData.totalVolume),
    );

    // let maxFormattedPrice = (maxPrice - minPrice) / (maxPrice - minPrice) * 0.5
    let maxFormattedPrice = 0.5;
    const barHeightMultiplier = maxVolume / maxFormattedPrice;

    // Add extraKey to each object for chart format
    formattedChartData = formattedChartData.map((dateData) => ({
      ...dateData,
      chartFormatPrice:
        ((dateData.price - minPrice) / (maxPrice - minPrice)) * 0.8 + 0.3,
      chartFormatVolume: dateData.totalVolume / barHeightMultiplier,
    }));
    return formattedChartData;
  };

  function downsampling(originalArray, maxDataPoints) {
    const decimationFactor =
      Math.floor(originalArray.length / maxDataPoints) || 1;
    const newArray = [];

    for (let i = 0; i < originalArray.length; i += decimationFactor) {
      const chunk = originalArray.slice(i, i + decimationFactor);
      const averagedObject = {};

      for (let key in chunk[0]) {
        if (chunk[0].hasOwnProperty(key)) {
          const values = chunk.map((obj) => obj[key]);
          averagedObject[key] =
            values.reduce((sum, value) => sum + value, 0) / values.length;
        }
      }
      newArray.push(averagedObject);
    }
    return newArray;
  }

  const handleCoinOptionClick = async (tokenInfo) => {
    if (!tokenInfo.nft) {
      fetchDetailedTokenInfo(tokenInfo.id);
      await setHomeCoinStorage({ id: tokenInfo.id, nft: false });
    } else {
      fetchDetailedNftInfo(tokenInfo.id);
      await setHomeCoinStorage({ id: tokenInfo.id, nft: true });
    }
    setIsExpanded(false);
  };

  async function getNftTxChartData(platformId, contractAddress): Promise<any> {
    let domain: string;

    switch (platformId) {
      case "arbitrum-one":
        domain = "api.arbiscan.io";
        break;
      case "avalanche":
        domain = "api.snowtrace.io";
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
        console.log(
          `getNftTxChartData error: Invalid platformId: ${platformId}`,
        );
        return [];
    }

    let nftTxsData = await fetchNftTxs(domain, contractAddress, 10000);

    if (nftTxsData.status === "0") {
      console.log("nftTxsData.status ==== 0: ", nftTxsData);
      await delay(5500);
      nftTxsData = await fetchNftTxs(domain, contractAddress, 10000);
    }

    if (nftTxsData.status !== "0" && nftTxsData.result) {
      const nftTxsChartFormat: { date: Date; volume: number }[] =
        Object.entries(
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
    console.log(`getTokenTxChartData error: Invalid platformId: ${platformId}`);
    return null;
  }

  async function getTokenTxChartData(
    platformId,
    contractAddress,
    tokenValue,
  ): Promise<any> {
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
  }

  return (
    <>
      <div style={styles.headerBlock}>
        <div
          style={styles.menuIconBlock}
          title="Menu"
          onClick={() => setMenuIsOpen(true)}
        >
          <MenuIcon style={{ fontSize: 24, color: colors.secondary_medium }} />
        </div>

        <div
          style={{
            ...styles.searchbar,
            borderBottomLeftRadius: isExpanded ? 0 : constants.border_radius,
            borderBottomRightRadius: isExpanded ? 0 : constants.border_radius,
          }}
        >
          <div style={styles.searchbarImage}>
            <SearchIcon
              style={{ fontSize: 24, color: colors.secondary_medium }}
            />
          </div>
          <input
            ref={inputRef}
            type="text"
            style={styles.searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            onClick={() => setSearchInput("")}
            onFocus={handleFocus}
            value={searchInput}
            placeholder={coingeckoKeyFeedback ? "Delayed -> Open menu" : null}
          />
        </div>
        {!loadingError.isError && (
          <img
            style={styles.mainLogo}
            src={
              mainLogo ||
              "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256"
            }
            alt="Main Logo"
          />
        )}
        {loadingError.isLoading && !loadingError.isError && (
          <CircularProgress
            size={41}
            thickness={1}
            style={{
              position: "absolute",
              right: 12,
              zIndex: 1,
              color: "white",
            }}
          />
        )}
        {loadingError.isError && (
          <div style={styles.indicationIcon} title={"Refresh limit: 5/sec"}>
            <SyncProblemIcon
              style={{ fontSize: 30, color: colors.secondary_medium }}
            />
          </div>
        )}
      </div>
      <div style={styles.searchResults} ref={searchResultsRef}>
        {isExpanded &&
          displayResults?.tokens.length > 0 &&
          displayResults?.tokens.slice(0, 13).map((tokenInfo, index) => (
            <div
              key={tokenInfo.id + index}
              style={
                index === focusedOptionIndex
                  ? { ...styles.coinSearchInfo, ...styles.coinSearchInfoFocus }
                  : styles.coinSearchInfo
              }
              tabIndex={index}
              onClick={() =>
                tokenInfo.id.length && handleCoinOptionClick(tokenInfo)
              }
              onKeyDown={(event) => {
                if (tokenInfo.id.length && event.key === "Enter") {
                  handleCoinOptionClick(tokenInfo);
                }
              }}
              onFocus={() =>
                tokenInfo.id.length && setFocusedOptionIndex(index)
              }
              onBlur={() => tokenInfo.id.length && setFocusedOptionIndex(-1)}
              onMouseEnter={() =>
                tokenInfo.id.length && setFocusedOptionIndex(index)
              }
              onMouseLeave={() =>
                tokenInfo.id.length && setFocusedOptionIndex(-1)
              }
            >
              {tokenInfo.image ? (
                <img
                  src={
                    tokenInfo.image ||
                    "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256"
                  }
                  alt={tokenInfo.name}
                  style={styles.coinImage}
                />
              ) : (
                <div style={styles.coinImage} />
              )}
              <span style={styles.exchangeName}>{tokenInfo.name}</span>
              {tokenInfo.marketCapRank &&
                (tokenInfo.marketCapRank === "NFT" ? (
                  <span style={styles.marketCapRank}>
                    {tokenInfo.marketCapRank}
                  </span>
                ) : (
                  <span style={styles.marketCapRank}>
                    #{tokenInfo.marketCapRank}
                  </span>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default HeaderBlock;
