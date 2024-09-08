import React, { CSSProperties, useState, useEffect, useRef } from "react";
import constants from "../../static/constants";

import { ISearchOptions } from "../../models/ICoinInfo";
import { HeaderMenuItem } from "./HeaderMenuItem";
import { OpenOverlayButton } from "./OpenOverlayButton";
import { SearchBarField } from "./SearchBarField";
import { ILoadingError } from "../../popup/popup";

interface HeaderBlockProps {
  mainLogo: string;
  setMenuIsOpen: (menuIsOpen: any) => void;
  setSearchResults: (searchResults: ISearchOptions) => void;
  searchResults: ISearchOptions;
  loadingError: ILoadingError;
  handleFetchTokenInfo: (coinId: string, isNft: boolean) => void;
}

const HeaderField: React.FC<HeaderBlockProps> = ({
  mainLogo,
  setMenuIsOpen,
  setSearchResults,
  searchResults,
  loadingError,
  handleFetchTokenInfo,
}) => {
  const searchResultsRef = useRef(null);
  const inputRef = useRef(null);

  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  const handleCoinOptionClick = async (tokenInfo) => {
    handleFetchTokenInfo(tokenInfo.id, tokenInfo.nft);
    setIsExpanded(false);
  };

  return (
    <>
      <div style={styles.headerBlock}>
        <OpenOverlayButton setMenuIsOpen={setMenuIsOpen} />
        <SearchBarField
          mainLogo={mainLogo}
          inputRef={inputRef}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          setDisplayResults={setSearchResults}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          loadingError={loadingError}
        />
      </div>

      <div style={styles.searchResults} ref={searchResultsRef}>
        {isExpanded &&
          searchResults?.tokens.length > 0 &&
          searchResults?.tokens
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

export default HeaderField;
