import React, { CSSProperties, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import TitleField from "../components/TitleField";
import OverlayMenu from "../components/OverlayMenu/OverlayMenu";

import HeaderField from "../components/HeaderField/HeaderField";
import ChartsField from "../components/ChartsField";
import TickerField from "../components/TickerField";
import { getTrendingCoins } from "../api/getTrendingCoins";
import { fetchDetailedNftInfo } from "../api/fetchDetailedNftInfo";
import { fetchDetailedTokenInfo } from "../api/fetchDetailedTokenInfo";
import { IDetailedCoinInfo, ISearchOptions } from "../models/ICoinInfo";
import { IDetailedNftInfo } from "../models/INftInfo";
import { getHomeCoinStorage, setHomeCoinStorage } from "../utils/storage";

const bitcoinIcon = require("../static/images/icons/bitcoin-icon.png");
import { NftInfoField } from "../components/NftInfoField";
import { CoinInfoField } from "../components/CoinInfoField";
import { getTokenTxChartData } from "../api/getTokenTxChartData";
import { getNftTxChartData } from "../api/getNftTxChartData";

export interface IIsLoadingError {
  isLoading: boolean;
  isError: boolean;
}

// keep highest and lowest price on max chart
// drag and zoom chart functionality
// fix all anys
// join a group via name/ code?
// check watchlist etc.

// splash screen/ new icon
// make ref links of all exchange buttons
// usdt socials
// zou ik uitbreiden naar een discord bot zoals whalebot, zo eentje die andere servers inviten en dat ze dan alle commands van whalebot kunnen gebruiken.
// ideas: store notes for accounts (discord/ twitter)

const App: React.FC = () => {
  const [coinInfo, setCoinInfo] = useState<IDetailedCoinInfo>();
  const [nftInfo, setNftInfo] = useState<IDetailedNftInfo>();
  const [txVolumeChartData, setTxVolumeChartData] = useState<any>([]);
  const [tokenTxsChartData, setTokenTxsChartData] = useState<any>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<ISearchOptions>({
    tokens: [],
    total: 0,
  });
  const [isLoadingError, setIsLoadingError] = useState<IIsLoadingError>({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    handleStartupInfo();
  }, []);

  // get detailed coin info and trending info on startup
  const handleStartupInfo = async () => {
    // check which token info to display on startup
    const homeCoinStorage = await getHomeCoinStorage();
    if (homeCoinStorage?.id) {
      handleFetchTokenInfo(homeCoinStorage.id, homeCoinStorage?.nft);
    } else {
      handleFetchTokenInfo("bitcoin", false); // default to corn
    }
    const trendingCoins = await getTrendingCoins();
    setSearchResults(trendingCoins);
  };

  const handleFetchTokenInfo = async (coinId: string, isNft: boolean) => {
    if (isNft) {
      await handleNftFetchLogic(coinId);
    } else {
      await handleTokenFetchLogic(coinId);
    }
  };

  const handleNftFetchLogic = async (coinId: string) => {
    try {
      setIsLoadingError({ isLoading: true, isError: false });
      const result = await fetchDetailedNftInfo(coinId);
      setIsLoadingError(result.isLoadingError);
      setNftInfo(result.nftInfo);
      setHomeCoinStorage({ id: coinId, nft: true });

      // Fetch transaction volume data if NFT info is available
      if (nftInfo?.asset_platform_id && nftInfo?.contract_address) {
        setIsLoadingError({ isLoading: true, isError: false });
        const txVolumeData = await getNftTxChartData(
          nftInfo.asset_platform_id,
          nftInfo.contract_address,
        );

        if (!txVolumeData) {
          setIsLoadingError({ isLoading: false, isError: true });
          console.log(`No results for getNftTxChartData ${coinId}`);
          return {
            nftInfo,
            coinInfo,
            txVolumeChartData,

            isLoadingError,
          };
        }
        if (txVolumeData.length > 0) {
          setTxVolumeChartData(txVolumeData);
          setIsLoadingError({ isLoading: false, isError: false });
        }
      }
    } catch (error) {
      console.error(`Error fetching info for ${coinId}:`, error);
      setIsLoadingError({ isLoading: false, isError: true });
    }
  };

  const handleTokenFetchLogic = async (coinId: string) => {
    try {
      setIsLoadingError({ isLoading: true, isError: false });
      const result = await fetchDetailedTokenInfo(coinId);
      setIsLoadingError(result.isLoadingError);
      setCoinInfo(result.coinInfo);
      setHomeCoinStorage({ id: coinId, nft: false });

      // Fetch token transaction chart data if applicable
      if (coinInfo?.asset_platform_id && coinInfo?.contract_address) {
        setIsLoadingError({ isLoading: true, isError: false });
        const fetchedTokenTxChartData = await getTokenTxChartData(
          coinInfo.asset_platform_id,
          coinInfo.contract_address,
          coinInfo.market_data.current_price.usd,
        );
        if (!fetchedTokenTxChartData) {
          console.log(`No results for getTokenTxChartData ${coinId}`);
          setIsLoadingError({ isLoading: false, isError: true });
        } else {
          setTokenTxsChartData(fetchedTokenTxChartData);
          setIsLoadingError({ isLoading: false, isError: false });
        }
      }
    } catch (error) {
      console.error(`Error fetching info for ${coinId}: `, error);
      setIsLoadingError({ isLoading: false, isError: true });
    }
  };

  console.log("coinInfo123: ", coinInfo);
  console.log("nftInfo123: ", nftInfo);

  return (
    <>
      <OverlayMenu
        menuIsOpen={isOverlayOpen}
        setMenuIsOpen={setIsOverlayOpen}
        handleFetchTokenInfo={handleFetchTokenInfo}
      />
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <HeaderField
            mainLogo={
              coinInfo?.image?.small || nftInfo?.image?.small || bitcoinIcon
            }
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            setMenuIsOpen={setIsOverlayOpen}
            handleFetchTokenInfo={handleFetchTokenInfo}
            isLoadingError={isLoadingError}
          />
        </div>

        {!nftInfo?.name && !coinInfo?.name && (
          <>
            <TitleField
              tokenTitle="Fetching data"
              title={"Use arrow keys to navigate"}
            />
            <TickerField ticker="" />
            <ChartsField />
          </>
        )}

        {coinInfo?.name && (
          <CoinInfoField
            coinInfo={coinInfo}
            tokenTxsChartData={tokenTxsChartData}
          />
        )}

        {nftInfo?.name && (
          <NftInfoField
            nftInfo={nftInfo}
            txVolumeChartData={txVolumeChartData}
          />
        )}
      </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  headerContainer: {
    padding: "0px 12px",
  },
  container: {
    padding: "12px 0px 0px",
  },
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
