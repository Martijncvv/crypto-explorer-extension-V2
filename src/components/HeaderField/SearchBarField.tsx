import constants, { SHARED_API_KEY_COINGECKO } from "../../static/constants";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../../static/colors";
import CircularProgress from "@mui/material/CircularProgress";
import React, { CSSProperties, useEffect, useState } from "react";
import { searchCoinName } from "../../api/searchCoinName";
import { getTrendingCoins } from "../../api/getTrendingCoins";
import { getCoingeckoApiKeyStorage } from "../../utils/storage";

export const SearchBarField = ({
  mainLogo,
  inputRef,
  isExpanded,
  setIsExpanded,
  setDisplayResults,
  setSearchInput,
  searchInput,
  isLoadingError,
}: {
  mainLogo: string;
  inputRef: any;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  setDisplayResults: (searchResults: any) => void;
  setSearchInput: (searchInput: string) => void;
  searchInput: string;
  isLoadingError: { isLoading: boolean; isError: boolean };
}) => {
  const [coingeckoKeyFeedback, setCoingeckoKeyFeedback] =
    useState<boolean>(false);

  const handleDisplayApiFeedback = async () => {
    const API_KEY = await getCoingeckoApiKeyStorage();
    if (API_KEY === SHARED_API_KEY_COINGECKO) {
      setCoingeckoKeyFeedback(true);
    } else {
      setCoingeckoKeyFeedback(false);
    }
  };

  useEffect(() => {
    handleDisplayApiFeedback();
  }, []);

  async function handleFocus() {
    setIsExpanded(true);
  }

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchInput.length > 0) {
        const searchResult = await searchCoinName(searchInput);
        if (searchResult.total === 0) {
          setSearchInput("");
        }
        setDisplayResults(searchResult);
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
        const trendingCoins = await getTrendingCoins();
        setDisplayResults(trendingCoins);
      }
    }
  };

  return (
    <>
      <div
        style={{
          ...styles.searchbar,
          borderBottomLeftRadius: isExpanded ? 0 : constants.border_radius,
          borderBottomRightRadius: isExpanded ? 0 : constants.border_radius,
        }}
      >
        <div style={styles.searchbarImage}>
          <SearchIcon
            style={{ fontSize: 24, color: colors.secondary_medium }}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          style={styles.searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          onClick={() => setSearchInput("")}
          onFocus={handleFocus}
          value={searchInput}
          placeholder={coingeckoKeyFeedback ? "Delayed -> Open menu" : null}
        />
      </div>

      <img
        style={styles.mainLogo}
        src={
          mainLogo ||
          "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256"
        }
        alt="Main Logo"
      />

      {isLoadingError.isLoading && !isLoadingError.isError && (
        <div style={styles.progressIndication} title={"Loading.."}>
          <CircularProgress
            size={41}
            thickness={1}
            style={{
              color: "white",
            }}
          />
        </div>
      )}
      {isLoadingError.isError && (
        <div style={styles.progressIndication} title={"Refresh limit: 5/sec"}>
          <CircularProgress
            size={41}
            thickness={1}
            style={{
              color: "red",
            }}
          />
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  searchbar: {
    marginLeft: 12,
    width: 202,
    height: 40,
    borderRadius: constants.border_radius,
    backgroundColor: colors.primary_dark,

    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  searchbarImage: {
    width: 20,
    height: 20,
    marginLeft: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    marginLeft: 12,
    border: "none",
    background: "transparent",
    color: "white",
    outline: "none",
    width: "100%",
  },

  mainLogo: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressIndication: {
    position: "absolute",
    right: 12,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
