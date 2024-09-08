import React, { CSSProperties } from "react";
import constants from "../../static/constants";
import colors from "../../static/colors";

export const HeaderMenuItem = ({
  tokenInfo,
  index,
  handleCoinOptionClick,
  setFocusedOptionIndex,
  focusedOptionIndex,
}) => {
  return (
    <div
      key={tokenInfo.id + index}
      style={
        index === focusedOptionIndex
          ? { ...styles.coinSearchInfo, ...styles.coinSearchInfoFocus }
          : styles.coinSearchInfo
      }
      tabIndex={index}
      onClick={() => tokenInfo.id.length && handleCoinOptionClick(tokenInfo)}
      onKeyDown={(event) => {
        if (tokenInfo.id.length && event.key === "Enter") {
          handleCoinOptionClick(tokenInfo);
        }
      }}
      onFocus={() => tokenInfo.id.length && setFocusedOptionIndex(index)}
      onBlur={() => tokenInfo.id.length && setFocusedOptionIndex(-1)}
      onMouseEnter={() => tokenInfo.id.length && setFocusedOptionIndex(index)}
      onMouseLeave={() => tokenInfo.id.length && setFocusedOptionIndex(-1)}
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
          <span style={styles.marketCapRank}>{tokenInfo.marketCapRank}</span>
        ) : (
          <span style={styles.marketCapRank}>#{tokenInfo.marketCapRank}</span>
        ))}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
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
};
