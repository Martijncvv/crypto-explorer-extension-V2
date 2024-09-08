import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import colors from "../../static/colors";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  getSearchResultNftAmountStorage,
  setSearchResultNftAmountStorage,
} from "../../utils/storage";

export const SearchResultNftAmountSettingsField = () => {
  const [searchResultNftAmount, setSearchResultNftAmount] = useState<number>(3);

  const checkStorage = async () => {
    const searchResultNftAmountStorage =
      await getSearchResultNftAmountStorage();

    setSearchResultNftAmount(searchResultNftAmountStorage);
  };

  useEffect(() => {
    checkStorage();
  }, []);

  const handleSearchResultNftAmount = (
    newSearchResultNftAmount: number | number[],
  ) => {
    if (newSearchResultNftAmount !== null) {
      setSearchResultNftAmount(newSearchResultNftAmount as number);
      setSearchResultNftAmountStorage(newSearchResultNftAmount as number);
    }
  };

  return (
    <>
      <div style={styles.sectionHeader}>Search Results</div>
      <div
        style={styles.explanationSubtext}
      >{`Max number of Nfts from 13 results (${searchResultNftAmount})`}</div>
      <Box sx={{ width: 180 }}>
        <Slider
          size="small"
          aria-label="Max Nfts out of 13 search results"
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
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
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

  sliderMark: {
    fontSize: "12px",
    fontWeight: "bold",
    color: colors.white_medium,
  },
};
