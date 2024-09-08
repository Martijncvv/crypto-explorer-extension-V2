import React, { CSSProperties, useEffect, useState } from "react";
import colors from "../../static/colors";
import constants from "../../static/constants";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";

import {
  getPortfolioDataStorage,
  getSearchResultNftAmountStorage,
  setSearchResultNftAmountStorage,
} from "../../utils/storage";
import { IDetailedCoinInfo } from "../../models/ICoinInfo";
import { fetchCoinsPrices } from "../../api/api";
import WalletTrackerBlock from "./WalletTrackerBlock";
import PortfolioBlock from "./PortfolioBlock";
import { CoingeckoApiField } from "./CoingeckoApiField";

interface OverlayMenuProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: any) => void;
  setPortfolioCoinClick?: (coinInfo: IDetailedCoinInfo) => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  menuIsOpen,
  setMenuIsOpen,
  setPortfolioCoinClick,
}) => {
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
    const [portfolioDataStorage, searchResultNftAmountStorage] =
      await Promise.all([
        getPortfolioDataStorage(),
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
              setPortfolioCoinClick={setPortfolioCoinClick}
            />
            <WalletTrackerBlock />

            <div style={styles.sectionHeader}>Tweet to Me!</div>
            <div style={styles.explanationSubtext}>
              Using the extension? Let me know! I'm always looking for feedback
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
                    value: 11,
                    label: <span style={styles.sliderMark}>11 Nfts</span>,
                  },
                ]}
                min={2}
                max={11}
                style={{ color: colors.white_medium }}
              />
            </Box>
            <CoingeckoApiField />
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

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

  sliderMark: {
    fontSize: "12px",
    fontWeight: "bold",
    color: colors.white_medium,
  },

  togglePrefButton: {
    fontSize: "14px",
    color: colors.white_medium,
  },
};

export default OverlayMenu;
