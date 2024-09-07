import React, { CSSProperties, useEffect, useState } from "react";
import colors from "../static/colors";
import constants from "../static/constants";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";

import {
  getPortfolioDataStorage,
  getSearchResultNftAmountStorage,
  setSearchResultNftAmountStorage,
  getTrackedAccountsStorage,
  TrackedAccountType,
  getCoingeckoApiKeyStorage,
  setCoingeckoApiKeyStorage,
} from "../utils/storage";
import { IDetailedNftInfo } from "../models/INftInfo";
import { IDetailedCoinInfo } from "../models/ICoinInfo";
import { fetchCoinsPrices } from "../utils/api";
import WalletTrackerBlock from "./overlayComponents/WalletTrackerBlock";
import PortfolioBlock from "./overlayComponents/PortfolioBlock";
import SaveIcon from "@mui/icons-material/Save";

interface OverlayMenuProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: any) => void;
  coinInfo?: IDetailedCoinInfo;
  nftInfo?: IDetailedNftInfo;
  setPortfolioCoinClick?: (coinInfo: IDetailedCoinInfo) => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  menuIsOpen,
  setMenuIsOpen,
  coinInfo,
  nftInfo,
  setPortfolioCoinClick,
}) => {
  const [coingeckoApiKey, setCoingeckoApiKey] = useState<string>("");
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

  const handleCoingeckoApiKey = async () => {
    if (coingeckoApiKey?.length > 22) {
      await setCoingeckoApiKeyStorage(coingeckoApiKey);
      setMenuIsOpen(false);
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
      searchResultNftAmountStorage,
      coingeckoApiKeyStorage,
    ] = await Promise.all([
      getPortfolioDataStorage(),
      getSearchResultNftAmountStorage(),
      getCoingeckoApiKeyStorage(),
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

    if (coingeckoApiKeyStorage) {
      setCoingeckoApiKey(coingeckoApiKeyStorage);
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

            <div style={styles.sectionHeader}>Free CoinGecko API Key</div>
            <div style={styles.explanationSubtext}>
              {
                "It is required to use your CoinGecko API key. You can get one for free "
              }
              <a
                href="https://www.coingecko.com/en/api/pricing"
                target="_blank"
                style={{ color: "white" }}
              >
                here
              </a>
              {
                "; \nCreate a Demo Account -> Developer Dashboard -> Copy key below."
              }
            </div>

            <div style={styles.coingeckoApiInputField}>
              <input
                type="password"
                value={coingeckoApiKey}
                onChange={(e) => setCoingeckoApiKey(e.target.value)}
                style={styles.coingeckoApiInput}
                placeholder={`CoinGecko API Key`}
              />

              <div
                style={styles.inputContainerSaveButton}
                onClick={handleCoingeckoApiKey}
              >
                <SaveIcon
                  style={{ fontSize: 14, color: colors.white_medium }}
                />
              </div>
            </div>
            <div style={styles.explanationSubtext}>
              If you do not add an API key, you share one with other users,
              which results in delays and limited usage.
            </div>
            <div style={styles.explanationSubtext}>
              *CoinGecko's open API is now restricted. This approach helps us
              maintain a free extension.
            </div>
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
  supportOpenButton: {
    cursor: "pointer",
  },
  sliderMark: {
    fontSize: "12px",
    fontWeight: "bold",
    color: colors.white_medium,
  },
  coingeckoApiInputField: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  coingeckoApiInput: {
    width: "70%",
    padding: "5px 5px 5px 10px",
    borderRadius: constants.border_radius,
    fontSize: "12px",
    color: colors.primary_medium,
    border: "none",
    outline: "none",
  },
  inputContainerSaveButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 8px",
    color: colors.white_medium,
    fontSize: "12px",
    borderRadius: constants.border_radius,
    cursor: "pointer",
    backgroundColor: colors.secondary_dark,
    border: "none",
    textAlign: "center",
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

export default OverlayMenu;
