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
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getPortfolioDataStorage,
  getSearchPrefStorage,
  getStartPrefStorage,
  getSearchResultNftAmountStorage,
  changePortfolioCoinAmountStorage,
  removePortfolioCoinStorage,
  setSearchPrefStorage,
  setStartPrefStorage,
  setSearchResultNftAmountStorage,
} from "../utils/storage";
import { IDetailedNftInfo } from "../models/INftInfo";
import { IDetailedCoinInfo } from "../models/ICoinInfo";
import { fetchCoinsPrices } from "../utils/api";
import { amountFormatter } from "../utils/amountFormatter";

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
      overflowY: "auto",
      height: "100%",
      zIndex: 100,
      // transition: 'width 0.5s ease',
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    overlayMenuOpen: {
      width: "100%",
      paddingBottom: "20px",
    },
    menuContent: {
      transition: "transform 0.5s ease",
      transform: "translateX(-100%)",
      zIndex: 101,

      position: "relative",
      width: "70%",
      maxWidth: "400px",
      height: "100%",
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

    // PORTFOLIO

    portfolioSectionTitle: {
      marginTop: constants.default_padding,
      marginBottom: "2px",
      color: colors.accent_medium,
      fontSize: constants.font_nano,
      fontWeight: constants.font_weight_large,
    },
    portfolioValueField: {
      color: colors.white_medium,
      fontSize: constants.font_large,
      fontWeight: constants.font_weight_large,
      marginBottom: "6px",
    },
    emptyPortfolioValueField: {
      color: colors.white_medium,
      fontSize: constants.font_micro,
      // fontWeight: constants.font_weight_large,
      marginBottom: "6px",
    },
    portfolioHeader: {
      display: "flex",
      alignItems: "flex-start",
    },
    portfolioHeaderValue: {
      width: "55px",
      marginLeft: "14px",

      color: colors.accent_medium,
      fontSize: constants.font_micro,
      fontWeight: constants.font_weight_medium,
    },
    portfolioItemField: {
      // backgroundColor: 'rgba(52, 65, 131, 0.8)',
      // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',

      paddingTop: 10,
      paddingBottom: 10,
    },
    portfolioItem: {
      height: "32px",
      width: "220px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    portfolioItemImage: {
      width: "22px",
      height: "22px",
    },
    portfolioItemTopRow: {
      height: "16px",
      fontSize: constants.font_small,
      display: "flex",
      alignItems: "flex-start",
      fontWeight: constants.font_weight_large,
    },
    portfolioItemBottomRow: {
      height: "16px",
      fontSize: constants.font_micro,
      display: "flex",
      alignItems: "flex-end",
      fontWeight: constants.font_weight_medium,
    },
    portfolioItemValue: {
      width: "55px",
      marginLeft: "14px",
      color: colors.white_medium,
    },
    tickerText: {
      color: colors.accent_medium,
      fontWeight: 600,
    },
    amountText: {
      width: "55px",
      marginLeft: "14px",
      color: colors.white_medium,
    },

    portfolioItemDivider: {
      marginTop: "6px",
      marginBottom: "6px",
      width: "100%",
      borderBottom: `2px solid ${colors.accent_light}`,
    },

    inputContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      borderRadius: constants.border_radius,
      backgroundColor: "#f8f9fa",
      padding: "5px",
      boxSizing: "border-box",
    },
    amountInputField: {
      width: "70%",
      padding: "5px 0 5px 10px",
      marginRight: "5px",
      borderRadius: constants.border_radius,
      fontSize: "12px",
      color: colors.primary_medium,
      backgroundColor: "#e9ecef",
      border: "none",
      outline: "none",
    },
    inputContainerSaveButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px 8px",
      marginRight: "5px",
      color: colors.white_medium,
      fontSize: "12px",
      borderRadius: constants.border_radius,
      cursor: "pointer",
      backgroundColor: colors.secondary_dark,
      border: "none",
      textAlign: "center",
    },
    inputContainerDeleteButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px 8px",
      fontSize: "12px",
      borderRadius: constants.border_radius,
      cursor: "pointer",
      backgroundColor: colors.secondary_dark,
      border: "none",
      textAlign: "center",
    },
    noCoinsText: {
      // width: "100%",
      // justifyContent: "center",
      // alignItems: "center",
      textAlign: "center",
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
  const [showInputField, setShowInputField] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [clickedCoinId, setClickedCoinId] = useState<string>("");
  const [clickedCoinTicker, setClickedCoinTicker] = useState<string>("");
  const [removeCoinPress, setRemoveCoinPress] = useState<boolean>(false);

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

    if (portfolioDataStorage.length > 0) {
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
    checkStorage();
  }, [menuIsOpen]);

  const handleSaveAmountInput = () => {
    const updatedPortfolioData = portfolioData.map((coinInfo) => {
      if (coinInfo.id === clickedCoinId) {
        return { ...coinInfo, amount: parseFloat(inputAmount) };
      }
      return coinInfo;
    });

    setPortfolioData(updatedPortfolioData);
    changePortfolioCoinAmountStorage(clickedCoinId, parseFloat(inputAmount));
    setInputAmount("");
    setShowInputField(false);
  };

  const handleRemoveCoinButton = () => {
    if (removeCoinPress) {
      const updatedPortfolioData = portfolioData.filter((coinInfo) => {
        return coinInfo.id !== clickedCoinId;
      });

      removePortfolioCoinStorage(clickedCoinId);
      setPortfolioData(updatedPortfolioData);
      setShowInputField(false);
    } else {
      setRemoveCoinPress(true);
    }
  };

  const handlePortfolioCoinPress = (coinInfoId: string, coinTicker: string) => {
    setClickedCoinId(coinInfoId);
    setClickedCoinTicker(coinTicker);
    setShowInputField(!showInputField);
  };

  const handleSupportClick = () => {
    chrome.tabs.create({
      url: "https://twitter.com/Marty_cFly",
      active: false,
    });
  };

  const calculatePortfolioValue = () => {
    let totalValue = 0;
    portfolioData.map((coinInfo) => {
      totalValue += coinInfo.amount * coinInfo.price;
    });
    return totalValue;
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
          <>
            <div style={styles.portfolioSectionTitle}>PORTFOLIO BALANCE</div>

            {calculatePortfolioValue() > 0 ? (
              <div style={styles.portfolioValueField}>
                ${amountFormatter(calculatePortfolioValue())}
              </div>
            ) : (
              <div style={styles.emptyPortfolioValueField}>
                Click on coin to add amount
              </div>
            )}

            {showInputField && (
              <div style={styles.inputContainer}>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  style={styles.amountInputField}
                  placeholder={`Amount (${clickedCoinTicker})`}
                />
                <button
                  style={styles.inputContainerSaveButton}
                  onClick={handleSaveAmountInput}
                >
                  Save
                </button>
                <div
                  style={styles.inputContainerDeleteButton}
                  onClick={handleRemoveCoinButton}
                >
                  <DeleteIcon
                    style={{ fontSize: 14, color: colors.white_medium }}
                  />

                  <span style={styles.mainValue}></span>
                </div>
              </div>
            )}

            <div style={styles.portfolioItemField}>
              {portfolioData.length > 0 && (
                <div style={styles.portfolioHeader}>
                  <div style={styles.portfolioItemImage} />
                  <div style={styles.portfolioHeaderValue}>Price</div>
                  <span style={styles.portfolioHeaderValue}>Amount</span>
                  <span style={styles.portfolioHeaderValue}>Total/ 24h</span>
                </div>
              )}

              {portfolioData.length > 0 ? (
                portfolioData.map((coinInfo, index) => (
                  <div key={coinInfo.id}>
                    <div
                      style={styles.portfolioItem}
                      onClick={() =>
                        handlePortfolioCoinPress(coinInfo.id, coinInfo.ticker)
                      }
                    >
                      <img
                        style={styles.portfolioItemImage}
                        src={coinInfo.iconUrl}
                        alt={coinInfo.ticker}
                      />
                      <div style={styles.portfolioItemDataField}>
                        <div style={styles.portfolioItemTopRow}>
                          <span style={styles.portfolioItemValue}>
                            ${amountFormatter(coinInfo.price)}
                          </span>

                          <div style={styles.amountText}>
                            {coinInfo.amount > 0
                              ? amountFormatter(coinInfo.amount)
                              : "-"}
                          </div>
                          <span style={styles.portfolioItemValue}>
                            {coinInfo.amount > 0
                              ? `$${amountFormatter(
                                  coinInfo.price * coinInfo.amount,
                                )}`
                              : "-"}
                          </span>
                        </div>
                        <div style={styles.portfolioItemBottomRow}>
                          <span
                            style={{
                              ...styles.portfolioItemValue,
                              ...styles.tickerText,
                            }}
                          >
                            {coinInfo.ticker.toUpperCase()}
                          </span>
                          <div style={styles.portfolioItemValue}></div>
                          <span
                            style={{
                              ...styles.portfolioItemValue,
                              color:
                                coinInfo.usd24Change > 0
                                  ? colors.green_medium
                                  : colors.red_medium,
                            }}
                          >{`${coinInfo.usd24Change.toFixed(1)}%`}</span>
                        </div>
                      </div>
                    </div>
                    <div style={styles.portfolioItemDivider} />
                    {/*{index < portfolioItems.length - 1 && <div style={styles.portfolioItemDivider}/>}*/}
                  </div>
                ))
              ) : (
                <div style={styles.noCoinsText}>
                  No coins in portfolio, add coins at the bottom of a page
                </div>
              )}
            </div>

            <div style={styles.sectionHeader}>Tweet Me!</div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default OverlayMenu;
