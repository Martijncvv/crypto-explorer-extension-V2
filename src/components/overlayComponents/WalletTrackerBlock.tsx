import React, { CSSProperties, useEffect, useState } from "react";
import colors from "../../static/colors";
import constants from "../../static/constants";
import {
  getTrackedAccountsStorage,
  setTrackedAccountsStorage,
  TrackedAccountType,
} from "../../utils/storage";
import { fetchLatestAddressTxs } from "../../utils/api";
import { isEthereumAddress } from "../../utils/isEthereumAddress";

interface WalletTrackerBlockProps {}

const WalletTrackerBlock: React.FC<WalletTrackerBlockProps> = ({}) => {
  const styles: {
    [key: string]: CSSProperties;
  } = {
    container: {
      height: constants.font_large,
      paddingBottom: constants.default_padding,
      textAlign: "center",
      fontFamily: "Open Sans, sans-serif",
      fontSize: constants.font_large,
      fontWeight: constants.font_weight_large,
      color: colors.white_medium,
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
  };
  const [trackedAccounts, setTrackedAccounts] = useState<TrackedAccountType[]>(
    [],
  );
  const [trackAccountNameInput, setTrackAccountNameInput] =
    useState<string>("");
  const [trackAddressInput, setTrackAddressInput] = useState<string>("");

  // 0x46340b20830761efd32832A74d7169B29FEB9758 cryptocom

  const checkStorage = async () => {
    const trackedAccountsStorage = await getTrackedAccountsStorage();
    if (trackedAccountsStorage) {
      setTrackedAccounts(trackedAccountsStorage);
    }
  };

  useEffect(() => {
    checkStorage();
  }, []);

  const handleSaveNewTrackAddress = async () => {
    if (
      !trackAccountNameInput ||
      !trackAddressInput ||
      !isEthereumAddress(trackAddressInput)
    ) {
      console.log(`invalid account track values: ${trackAddressInput}`);
      return;
    }
    const trackedAccounts = (await getTrackedAccountsStorage()) || [];
    console.log("trackedAccounts123: ", trackedAccounts);

    const latestTxsNewAddress = await fetchLatestAddressTxs(trackAddressInput);
    console.log("latestTxsNewAddress11: ", latestTxsNewAddress);

    if (latestTxsNewAddress?.result?.length > 0) {
      const latestNonce = latestTxsNewAddress.result[0]?.nonce;

      const newAccountToTrack = {
        name: trackAccountNameInput,
        address: trackAddressInput,
        nonce: latestNonce || "",
        lastUpdated: new Date(),
      };
      const response = await setTrackedAccountsStorage([
        ...trackedAccounts,
        newAccountToTrack,
      ]);
      console.log("res,setTrackedAccountsStorage : ", response);
    }
  };

  const handleDeleteTrackedAccount = async (accountNameToDelete: string) => {
    const updatedAccounts = trackedAccounts.filter(
      (account) => account.name !== accountNameToDelete,
    );

    await setTrackedAccountsStorage(updatedAccounts);
    setTrackedAccounts(updatedAccounts);
  };

  const handleTest = async () => {
    const trackedAccounts = await getTrackedAccountsStorage();
    console.log("trackedAccounts123: ", trackedAccounts);
  };

  function formatValue(value: string) {
    if (value.length <= 8) {
      return value;
    }
    const start = value.slice(0, 4);
    const end = value.slice(-4);
    return `${start}...${end}`;
  }

  return (
    <>
      <div
        style={styles.sectionHeader}
        title={"Set an address to get daily updates"}
      >
        Track address
      </div>
      <div style={styles.explanationSubtext}>
        Get notification if account makes a tx
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={styles.sectionHeader}>Tracked Addresses:</div>
        {trackedAccounts?.length > 0 ? (
          trackedAccounts.map((account, index) => (
            <div
              key={`${account.name}-${account.address}`}
              style={styles.inputContainer}
            >
              <span style={{ flex: 1 }}>{account.name}</span>
              <span style={{ flex: 2 }}>{formatValue(account.address)}</span>
              <button
                style={styles.inputContainerDeleteButton}
                onClick={() => handleDeleteTrackedAccount(account.name)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>Add account to track</div>
        )}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={trackAccountNameInput}
          onChange={(e) => setTrackAccountNameInput(e.target.value)}
          style={styles.amountInputField}
          placeholder={`Name`}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={formatValue(trackAddressInput)}
          onChange={(e) => setTrackAddressInput(e.target.value)}
          style={styles.amountInputField}
          placeholder={`Address to track`}
        />
      </div>
      <button style={styles.inputContainerDeleteButton} onClick={handleTest}>
        TEST
      </button>
      <button
        style={styles.inputContainerSaveButton}
        onClick={handleSaveNewTrackAddress}
      >
        Save
      </button>
    </>
  );
};

export default WalletTrackerBlock;
