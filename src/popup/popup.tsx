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

export interface ILoadingError {
  isLoading: boolean;
  isError: boolean;
}

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
  const [loadingError, setLoadingError] = useState<ILoadingError>({
    isLoading: true,
    isError: false,
  });

  // todo splash screen/ new icon
  // todo, make ref links of all exchange buttons
  // todo usdt socials
  //  zou ik uitbreiden naar een discord bot zoals whalebot, zo eentje die andere servers inviten en dat ze dan alle commands van whalebot kunnen gebruiken.
  // todo ideas: store notes for accounts (discord/ twitter)

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
    try {
      const fetchInfo = isNft ? fetchDetailedNftInfo : fetchDetailedTokenInfo;
      const result = await fetchInfo(coinId);

      setLoadingError(result.loadingError);
      setNftInfo(result.nftInfo);
      setCoinInfo(result.coinInfo);
      setTxVolumeChartData(result.txVolumeChartData);
      setTokenTxsChartData(result.tokenTxsChartData);
      setHomeCoinStorage({ id: coinId, nft: isNft });
    } catch (error) {
      console.error("Error fetching info:", error);
      setLoadingError({ isLoading: false, isError: true });
    }
  };

  // keep highest and lowest price on max chart
  // drag and zoom chart functionality
  // fix all anys
  // join a group via name/ code?
  // check watchlist etc.

  return (
    <>
      <OverlayMenu
        menuIsOpen={isOverlayOpen}
        setMenuIsOpen={setIsOverlayOpen}
        handleFetchTokenInfo={handleFetchTokenInfo}
      />
      <div style={styles.container}>
        <HeaderField
          mainLogo={
            coinInfo?.image?.small || nftInfo?.image?.small || bitcoinIcon
          }
          setSearchResults={setSearchResults}
          searchResults={searchResults}
          setMenuIsOpen={setIsOverlayOpen}
          handleFetchTokenInfo={handleFetchTokenInfo}
          loadingError={loadingError}
        />

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
  container: {
    padding: "12px",
  },
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
