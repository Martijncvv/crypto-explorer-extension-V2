import React, { CSSProperties } from "react";
import constants from "../../static/constants";
import colors from "../../static/colors";

export const PortfolioHeader = () => {
  return (
    <div style={styles.portfolioHeader}>
      <div style={styles.portfolioItemImage} />
      <div style={styles.portfolioHeaderValue}>Price</div>
      <span style={styles.portfolioHeaderValue}>Amount</span>
      <span style={styles.portfolioHeaderValue}>Total/ 24h</span>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
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
  portfolioItemImage: {
    width: "22px",
    height: "22px",
  },
};
