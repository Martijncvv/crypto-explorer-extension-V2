import React, { CSSProperties, useEffect, useState } from "react";
import colors from "../static/colors";
import constants from "../static/constants";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import SearchIcon from "@mui/icons-material/Search";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import {
  getPortfolioDataStorage,
  getSearchPrefStorage,
  getStartPrefStorage,
  getSearchResultNftAmountStorage,
  setSearchPrefStorage,
  setStartPrefStorage,
  setSearchResultNftAmountStorage,
  getTrackedAccountsStorage,
  TrackedAccountType,
} from "../utils/storage";
import { IDetailedNftInfo } from "../models/INftInfo";
import { IDetailedCoinInfo } from "../models/ICoinInfo";
import { fetchCoinsPrices } from "../utils/api";
import WalletTrackerBlock from "./overlayComponents/WalletTrackerBlock";
import PortfolioBlock from "./overlayComponents/PortfolioBlock";

interface OverlayMenuProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: any) => void;
  coinInfo?: IDetailedCoinInfo;
  nftInfo?: IDetailedNftInfo;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  menuIsOpen,
  setMenuIsOpen,
  coinInfo,
  nftInfo,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    overlayMenu: {
      position: "fixed",
      top: 0,
      left: 0,
      width: 0,
      zIndex: 100,
      height: "100%",
    },
    scrollContainer: {
      height: "calc(100% - 20px)",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    overlayMenuOpen: {
      width: "100%",
      paddingBottom: "20px",
    },
    menuContent: {
      transition: "transform 0.5s ease",
      transform: "translateX(-100%)",

      position: "relative",
      height: "100%",
      width: "70%",
      maxWidth: "400px",
      padding: "12px",

      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",

      background: "radial-gradient(#5565b0, #344183)",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
      borderTopRightRadius: constants.border_radius,
      borderBottomRightRadius: constants.border_radius,

      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      color: colors.secondary_medium,
      fontSize: "14px",
    },
    sectionHeader: {
      fontWeight: "bold",
      margin: "18px 0 3px 0 ",
      fontSize: "16px",
      color: colors.white_medium,
    },
    explanationSubtext: {
      color: colors.accent_medium,
      fontSize: "12px",
      marginBottom: "12px",
      textAlign: "center",
    },

    menuContentOpen: {
      transform: "translateX(0)",
    },
    menuCloseButton: {
      position: "absolute",
      right: "12px",
      top: "12px",
      border: "none",
      background: "none",
      cursor: "pointer",
    },
    supportOpenButton: {
      cursor: "pointer",
    },
    sliderMark: {
      fontSize: "12px",
      fontWeight: "bold",
      color: colors.white_medium,
    },

    togglePrefButton: {
      fontSize: "14px",
      color: colors.white_medium,
    },
    activePrefButton: {
      backgroundImage: "radial-gradient(#5565b0, #344183)",
      boxShadow: "0 0 8px rgba(85, 101, 176, 0.8)",
    },
    togglePrefButtonIcon: {
      marginRight: "4px",
      fontSize: 24,
      color: colors.white_medium,
    },
  };

  const [searchPref, setSearchPref] = useState<string>("coins");
  const [startPref, setStartPref] = useState<string>("portfolio");
  const [searchResultNftAmount, setSearchResultNftAmount] = useState<number>(3);
  const [portfolioData, setPortfolioData] = useState<
    {
      id: string;
      ticker: string;
      iconUrl: string;
      amount: number;
      price: number;
      usd24Change: number;
      nft: boolean;
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchPref = (newSearchPref: string) => {
    if (newSearchPref !== null) {
      setSearchPref(newSearchPref);
      setSearchPrefStorage(newSearchPref);
    }
  };
  const handleStartPref = (newStartPref: string) => {
    if (newStartPref !== null) {
      setStartPref(newStartPref);
      setStartPrefStorage(newStartPref);
    }
  };

  const handleSearchResultNftAmount = (
    newSearchResultNftAmount: number | number[],
  ) => {
    if (newSearchResultNftAmount !== null) {
      setSearchResultNftAmount(newSearchResultNftAmount as number);
      setSearchResultNftAmountStorage(newSearchResultNftAmount as number);
    }
  };

  const checkStorage = async () => {
    setLoading(true);
    const [
      portfolioDataStorage,
      searchPrefStorage,
      startPrefStorage,
      searchResultNftAmountStorage,
    ] = await Promise.all([
      getPortfolioDataStorage(),
      getSearchPrefStorage(),
      getStartPrefStorage(),
      getSearchResultNftAmountStorage(),
    ]);
    setLoading(false);

    if (portfolioDataStorage?.length > 0) {
      let coinIds = [];
      portfolioDataStorage.forEach((coinInfo) => {
        coinIds.push(coinInfo.id);
      });

      const coinsPricesData = await fetchCoinsPrices(coinIds);

      portfolioDataStorage.forEach((coinData) => {
        const coinPriceData = coinsPricesData[coinData.id];
        if (coinPriceData) {
          coinData.price = coinPriceData.usd;
          coinData.usd24Change = coinPriceData.usd_24h_change;
        }
      });

      setPortfolioData(portfolioDataStorage);
    }
    if (searchPrefStorage) {
      setSearchPref(searchPrefStorage);
    }
    if (startPrefStorage) {
      setStartPref(startPrefStorage);
    }
    if (searchResultNftAmountStorage) {
      setSearchResultNftAmount(searchResultNftAmountStorage);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      checkStorage();
    }
  }, [menuIsOpen]);

  const handleSupportClick = () => {
    chrome.tabs.create({
      url: "https://twitter.com/Marty_cFly",
      active: false,
    });
  };

  return (
    <div
      style={
        menuIsOpen
          ? { ...styles.overlayMenu, ...styles.overlayMenuOpen }
          : styles.overlayMenu
      }
    >
      <div
        style={
          menuIsOpen
            ? { ...styles.menuContent, ...styles.menuContentOpen }
            : styles.menuContent
        }
      >
        <div style={styles.menuCloseButton}>
          <CloseIcon
            style={{ fontSize: 24, color: colors.secondary_medium }}
            onClick={() => setMenuIsOpen(false)}
          />
        </div>
        {menuIsOpen && (
          <div style={styles.scrollContainer}>
            <PortfolioBlock
              loading={loading}
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />
            <WalletTrackerBlock />
            <br />
            <div style={styles.sectionHeader}>Tweet to Me!</div>
            <div style={styles.explanationSubtext}>
              Any feature requests or ideas
            </div>
            <ToggleButton
              value="question"
              style={styles.togglePrefButton}
              onClick={handleSupportClick}
            >
              <QuestionAnswerIcon
                style={{
                  fontSize: 24,
                  cursor: "pointer",
                  color: colors.white_medium,
                }}
              />
            </ToggleButton>
            <div style={styles.sectionHeader}>Start Priority</div>
            <div style={styles.explanationSubtext}>Portfolio/ Search first</div>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={startPref}
              exclusive
              aria-label="StartPref"
            >
              <ToggleButton
                value="portfolio"
                style={{
                  ...styles.togglePrefButton,
                  ...(startPref === "portfolio" && styles.activePrefButton),
                }}
                onClick={() => handleStartPref("portfolio")}
              >
                <QueryStatsIcon style={styles.togglePrefButtonIcon} />
              </ToggleButton>
              <ToggleButton
                value="search"
                style={{
                  ...styles.togglePrefButton,
                  ...(startPref === "search" && styles.activePrefButton),
                }}
                onClick={() => handleStartPref("search")}
              >
                <SearchIcon style={styles.togglePrefButtonIcon} />
              </ToggleButton>
            </ToggleButtonGroup>

            <div style={styles.sectionHeader}>Search Priority</div>
            <div style={styles.explanationSubtext}>Show Coins/ Nfts first</div>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={searchPref}
              exclusive
              aria-label="SearchPref"
            >
              <ToggleButton
                value="coins"
                style={{
                  ...styles.togglePrefButton,
                  ...(searchPref === "coins" && styles.activePrefButton),
                }}
                onClick={() => handleSearchPref("coins")}
              >
                <CurrencyBitcoinIcon style={styles.togglePrefButtonIcon} />
              </ToggleButton>
              <ToggleButton
                value="nfts"
                style={{
                  ...styles.togglePrefButton,
                  ...(searchPref === "nfts" && styles.activePrefButton),
                }}
                onClick={() => handleSearchPref("nfts")}
              >
                <WallpaperIcon style={styles.togglePrefButtonIcon} />
              </ToggleButton>
            </ToggleButtonGroup>

            <div style={styles.sectionHeader}>Search Results</div>
            <div
              style={styles.explanationSubtext}
            >{`Max number of Nfts from 11 results (${searchResultNftAmount})`}</div>
            <Box sx={{ width: 180 }}>
              <Slider
                size="small"
                aria-label="Max Nfts out of 11 search results"
                value={searchResultNftAmount}
                valueLabelDisplay="auto"
                onChange={(event, newTokenNftRatio) => {
                  if (Array.isArray(newTokenNftRatio)) {
                    handleSearchResultNftAmount(newTokenNftRatio[0]);
                  } else {
                    handleSearchResultNftAmount(newTokenNftRatio);
                  }
                }}
                step={1}
                marks={[
                  {
                    value: 2,
                    label: <span style={styles.sliderMark}>2 Nfts</span>,
                  },
                  {
                    value: 9,
                    label: <span style={styles.sliderMark}>9 Nfts</span>,
                  },
                ]}
                min={2}
                max={9}
                style={{ color: colors.white_medium }}
              />
            </Box>
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default OverlayMenu;
