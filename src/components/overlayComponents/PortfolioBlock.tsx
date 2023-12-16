import React, { CSSProperties, useState } from "react";
import colors from "../../static/colors";
import constants from "../../static/constants";
import { amountFormatter } from "../../utils/amountFormatter";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changePortfolioCoinAmountStorage,
  removePortfolioCoinStorage,
} from "../../utils/storage";
import SaveIcon from "@mui/icons-material/Save";

interface PortfolioBlockProps {
  portfolioData?: any;
  setPortfolioData: any;
  loading: boolean;
}

const PortfolioBlock: React.FC<PortfolioBlockProps> = ({
  portfolioData,
  setPortfolioData,
  loading,
}) => {
  const styles: { [key: string]: CSSProperties } = {
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
      fontWeight: constants.font_weight_large,
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
      backgroundColor: colors.white_medium,
      padding: "5px",
    },
    amountInputField: {
      width: "70%",
      padding: "5px 0 5px 10px",
      marginRight: "5px",
      borderRadius: constants.border_radius,
      fontSize: "12px",
      color: colors.primary_medium,
      backgroundColor: colors.white_medium,
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
      textAlign: "center",
    },
  };

  const [showInputField, setShowInputField] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [clickedCoinId, setClickedCoinId] = useState<string>("");
  const [clickedCoinTicker, setClickedCoinTicker] = useState<string>("");
  const [removeCoinPress, setRemoveCoinPress] = useState<boolean>(false);

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

  const calculatePortfolioValue = () => {
    let totalValue = 0;
    portfolioData.map((coinInfo) => {
      totalValue += coinInfo.amount * coinInfo.price;
    });
    return totalValue;
  };

  return (
    <>
      <div style={styles.portfolioSectionTitle}>PORTFOLIO BALANCE</div>

      {calculatePortfolioValue() > 0 ? (
        <div style={styles.portfolioValueField}>
          ${amountFormatter(calculatePortfolioValue())}
        </div>
      ) : loading ? (
        <div style={styles.emptyPortfolioValueField}>Loading..</div>
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
          <div
            style={styles.inputContainerSaveButton}
            onClick={handleSaveAmountInput}
          >
            <SaveIcon style={{ fontSize: 14, color: colors.white_medium }} />
          </div>
          <div
            style={styles.inputContainerDeleteButton}
            onClick={handleRemoveCoinButton}
          >
            <DeleteIcon style={{ fontSize: 14, color: colors.white_medium }} />

            <span style={styles.mainValue}></span>
          </div>
        </div>
      )}

      <div style={styles.portfolioItemField}>
        {portfolioData?.length > 0 && (
          <div style={styles.portfolioHeader}>
            <div style={styles.portfolioItemImage} />
            <div style={styles.portfolioHeaderValue}>Price</div>
            <span style={styles.portfolioHeaderValue}>Amount</span>
            <span style={styles.portfolioHeaderValue}>Total/ 24h</span>
          </div>
        )}

        {portfolioData?.length > 0 ? (
          portfolioData.map((coinInfo) => (
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
                    >
                      {`${
                        coinInfo.usd24Change
                          ? coinInfo.usd24Change?.toFixed(1)
                          : "-"
                      }%`}
                    </span>
                  </div>
                </div>
              </div>
              <div style={styles.portfolioItemDivider} />
            </div>
          ))
        ) : (
          <div style={styles.noCoinsText}>
            No coins in portfolio, add coins at the bottom of a page
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioBlock;
