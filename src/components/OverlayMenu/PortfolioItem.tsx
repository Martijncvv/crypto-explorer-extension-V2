import { amountFormatter } from "../../utils/amountFormatter";
import colors from "../../static/colors";
import React, { CSSProperties } from "react";
import constants from "../../static/constants";

export const PortfolioItem = ({ coinInfo, handlePortfolioCoinPress }) => {
  return (
    <div key={coinInfo.id}>
      <div
        style={styles.portfolioItem}
        onClick={() => handlePortfolioCoinPress(coinInfo.id, coinInfo.ticker)}
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
              {coinInfo.amount > 0 ? amountFormatter(coinInfo.amount) : "-"}
            </div>
            <span style={styles.portfolioItemValue}>
              {coinInfo.amount > 0
                ? `$${amountFormatter(coinInfo.price * coinInfo.amount)}`
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
                coinInfo.usd24Change ? coinInfo.usd24Change?.toFixed(1) : "-"
              }%`}
            </span>
          </div>
        </div>
      </div>
      <div style={styles.portfolioItemDivider} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
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
};
