import SaveIcon from "@mui/icons-material/Save";
import colors from "../../static/colors";
import React, { CSSProperties, useEffect, useState } from "react";
import constants from "../../static/constants";
import {
  getCoingeckoApiKeyStorage,
  setCoingeckoApiKeyStorage,
} from "../../utils/storage";

export const CoingeckoApiField = ({}) => {
  const [coingeckoApiKey, setCoingeckoApiKey] = useState<string>("");

  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    const coingeckoApiKeyStorage = await getCoingeckoApiKeyStorage();
    if (coingeckoApiKeyStorage) {
      setCoingeckoApiKey(coingeckoApiKeyStorage);
    }
  };

  const handleCoingeckoApiKey = async () => {
    if (coingeckoApiKey?.length > 22) {
      await setCoingeckoApiKeyStorage(coingeckoApiKey);
    }
  };

  return (
    <>
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
        {"; \nCreate a Demo Account -> Developer Dashboard -> Copy key below."}
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
          <SaveIcon style={{ fontSize: 14, color: colors.white_medium }} />
        </div>
      </div>
      <div style={styles.explanationSubtext}>
        If you do not add an API key, you share one with other users, which
        results in delays and limited usage.
      </div>
      <div style={styles.explanationSubtext}>
        *CoinGecko's open API is restricted. This approach helps me maintain a
        free extension.
      </div>
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
};
