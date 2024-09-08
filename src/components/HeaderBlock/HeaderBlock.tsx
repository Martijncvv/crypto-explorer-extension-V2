import React, { CSSProperties, useState, useEffect, useRef } from "react";
import constants from "../../static/constants";

import { IDetailedCoinInfo, ISearchOptions } from "../../models/ICoinInfo";
import { IDetailedNftInfo } from "../../models/INftInfo";
import { getHomeCoinStorage, setHomeCoinStorage } from "../../utils/storage";
import { fetchDetailedTokenInfo } from "../../api/fetchDetailedTokenInfo";
import { fetchDetailedNftInfo } from "../../api/fetchDetailedNftInfo";
import { getTrendingCoins } from "../../api/getTrendingCoins";
import { HeaderMenuItem } from "./HeaderMenuItem";
import { OverlayButton } from "./OverlayButton";
import { SearchBar } from "./SearchBar";

interface HeaderBlockProps {
  mainLogo: string;
  setCoinInfo: (coinInfo: IDetailedCoinInfo) => void;
  setNftInfo: (nftInfo: IDetailedNftInfo) => void;
  setTxVolumeChartData: (txVolumeChartData: any) => void;
  setTokenTxsChartData: (tokenTxsChartData: any) => void;
  setMenuIsOpen: (menuIsOpen: any) => void;
  portfolioCoinClick: any;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  mainLogo,
  setCoinInfo,
  setNftInfo,
  setTxVolumeChartData,
  setTokenTxsChartData,
  setMenuIsOpen,
  portfolioCoinClick,
}) => {
  const searchResultsRef = useRef(null);
  const inputRef = useRef(null);
  const [loadingError, setLoadingError] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({
    isLoading: false,
    isError: false,
  });
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [displayResults, setDisplayResults] = useState<ISearchOptions>({
    tokens: [],
    total: 0,
  });

  const [searchInput, setSearchInput] = useState<string>("");

  const checkStartupCoinInfo = async () => {
    // check which token info to display on startup

    const homeCoinStorage = await getHomeCoinStorage();
    if (homeCoinStorage?.id && homeCoinStorage?.nft) {
      fetchDetailedNftInfo(
        homeCoinStorage.id,
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
    } else if (homeCoinStorage?.id) {
      fetchDetailedTokenInfo(
        homeCoinStorage.id,
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
    } else {
      fetchDetailedTokenInfo(
        "bitcoin",
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
    }
  };

  // get detailed coin info and trending info on startup
  useEffect(() => {
    handleStartupInfo();
  }, []);

  const handleStartupInfo = async () => {
    checkStartupCoinInfo();
    const trendingCoins = await getTrendingCoins();
    setDisplayResults(trendingCoins);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // handle arrow up key press, collapse
  useEffect(() => {
    const handleKeyDownSearch = (event) => {
      if (event.key === "ArrowUp" && isExpanded) {
        if (focusedOptionIndex > 0) {
          setFocusedOptionIndex((focusedOptionIndex) => focusedOptionIndex - 1);
        } else {
          setIsExpanded(false);
        }
      } else if (event.key === "ArrowDown") {
        if (isExpanded) {
          setFocusedOptionIndex((focusedOptionIndex) => focusedOptionIndex + 1);
        } else {
          setIsExpanded(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDownSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDownSearch);
    };
  }, [focusedOptionIndex]);

  // functionality for clicking outside of the search results block
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the expansion if the click is outside of the search results block
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (portfolioCoinClick?.id) {
      fetchDetailedTokenInfo(
        portfolioCoinClick.id,
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
    }
  }, [portfolioCoinClick]);

  const handleCoinOptionClick = async (tokenInfo) => {
    if (!tokenInfo.nft) {
      fetchDetailedTokenInfo(
        tokenInfo.id,
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
      await setHomeCoinStorage({ id: tokenInfo.id, nft: false });
    } else {
      fetchDetailedNftInfo(
        tokenInfo.id,
        setLoadingError,
        setCoinInfo,
        setNftInfo,
        setTxVolumeChartData,
        setTokenTxsChartData,
      );
      await setHomeCoinStorage({ id: tokenInfo.id, nft: true });
    }
    setIsExpanded(false);
  };

  return (
    <>
      <div style={styles.headerBlock}>
        <OverlayButton setMenuIsOpen={setMenuIsOpen} />
        <SearchBar
          mainLogo={mainLogo}
          inputRef={inputRef}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          setDisplayResults={setDisplayResults}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          loadingError={loadingError}
        />
      </div>

      <div style={styles.searchResults} ref={searchResultsRef}>
        {isExpanded &&
          displayResults?.tokens.length > 0 &&
          displayResults?.tokens
            .slice(0, 13)
            .map((tokenInfo, index) => (
              <HeaderMenuItem
                key={tokenInfo.id + index}
                tokenInfo={tokenInfo}
                index={index}
                focusedOptionIndex={focusedOptionIndex}
                setFocusedOptionIndex={setFocusedOptionIndex}
                handleCoinOptionClick={handleCoinOptionClick}
              />
            ))}
      </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  headerBlock: {
    display: "flex",
    alignItems: "center",
  },

  searchResults: {
    position: "absolute",
    width: 202,
    marginLeft: 52,
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    color: "#3381e8",

    background: "linear-gradient(to bottom, #2F396D 0%, #3E6CB6 80%)",
    borderBottomLeftRadius: constants.border_radius,
    borderBottomRightRadius: constants.border_radius,
  },
};

export default HeaderBlock;
