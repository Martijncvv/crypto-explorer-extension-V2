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
import { formatAddressShort } from "../../utils/formatAddressShort";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface WalletTrackerBlockProps {}

const WalletTrackerBlock: React.FC<WalletTrackerBlockProps> = ({}) => {
  const [trackedAccounts, setTrackedAccounts] = useState<TrackedAccountType[]>(
    [],
  );
  const [trackAccountNameInput, setTrackAccountNameInput] =
    useState<string>("");
  const [trackAddressInput, setTrackAddressInput] = useState<string>("");
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [removeCoinPress, setRemoveCoinPress] = useState<boolean>(false);

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
    if (trackAddressInput === "") {
      setFeedbackMsg("Please enter an address");
      return;
    }
    if (trackAccountNameInput === "") {
      setFeedbackMsg("Please enter a name");
      return;
    }
    if (
      !trackAccountNameInput ||
      !trackAddressInput ||
      !isEthereumAddress(trackAddressInput)
    ) {
      setFeedbackMsg(`Invalid address: ${trackAddressInput}`);
      return;
    }

    const trackedAccountsStorage = (await getTrackedAccountsStorage()) || [];
    if (trackedAccounts.length >= 3) {
      setFeedbackMsg("Max 3 accounts allowed");
      return;
    }

    const latestTxsNewAddress = await fetchLatestAddressTxs(trackAddressInput);

    if (latestTxsNewAddress?.result?.length > 0) {
      const latestNonce = latestTxsNewAddress.result[0]?.nonce;

      const newAccountToTrack = {
        name: trackAccountNameInput,
        address: trackAddressInput,
        nonce: latestNonce || "0",
        lastUpdated: new Date(),
      };

      const response = await setTrackedAccountsStorage([
        ...trackedAccountsStorage,
        newAccountToTrack,
      ]);

      if (!response) {
        setFeedbackMsg("Something went wrong. Please try again.");
      } else {
        setTrackedAccounts([...trackedAccounts, newAccountToTrack]);
        setFeedbackMsg("");
        setTrackAccountNameInput("");
        setTrackAddressInput("");
      }
    }
  };

  const handleDeleteTrackedAccount = async (accountNameToDelete: string) => {
    setRemoveCoinPress(true);
    if (!removeCoinPress) {
      return;
    }
    const updatedAccounts = trackedAccounts.filter(
      (account) => account.name !== accountNameToDelete,
    );

    await setTrackedAccountsStorage(updatedAccounts);
    setTrackedAccounts(updatedAccounts);
  };

  function handleOpenTab(url: string) {
    chrome.tabs.create({ url: url, active: false });
  }

  return (
    <>
      <div style={styles.sectionHeader}>Track Ξ Account</div>
      <div style={styles.explanationSubtext}>
        Get notified when account creates tx
      </div>
      {trackedAccounts?.length > 0 ? (
        trackedAccounts.map((account, index) => (
          <div
            key={`${account.name}-${account.address}`}
            style={styles.accountItemContainer}
          >
            <div style={styles.valueItems}>
              <div
                style={styles.accountItemName}
                onClick={() =>
                  handleOpenTab(
                    `https://etherscan.io/address/${account.address}`,
                  )
                }
              >
                {account.name}
              </div>
              <div
                style={styles.accountItemAddress}
                onClick={() =>
                  handleOpenTab(
                    `https://etherscan.io/address/${account.address}`,
                  )
                }
              >
                {formatAddressShort(account.address)}
              </div>
            </div>
            <div
              style={styles.inputContainerDeleteButton}
              onClick={() => handleDeleteTrackedAccount(account.name)}
            >
              <DeleteIcon
                style={{ fontSize: 14, color: colors.white_medium }}
              />
            </div>
          </div>
        ))
      ) : (
        <div style={styles.placeholderText}>Add account to track</div>
      )}
      <div style={styles.newAccountTrackInputField}>
        <div style={styles.trackAccountInputContainer}>
          <input
            type="text"
            value={trackAccountNameInput}
            onChange={(e) => setTrackAccountNameInput(e.target.value)}
            style={styles.trackNameInputField}
            placeholder={`Name`}
          />
        </div>
        <div style={styles.trackAccountInputContainer}>
          <input
            type="text"
            value={formatAddressShort(trackAddressInput)}
            onChange={(e) => setTrackAddressInput(e.target.value)}
            style={styles.trackAddressInputField}
            placeholder={`Address`}
          />
        </div>
        <div style={styles.trackAccountInputContainer}>
          <div
            style={styles.inputContainerSaveButton}
            onClick={handleSaveNewTrackAddress}
          >
            <PlaylistAddIcon
              style={{ fontSize: 14, color: colors.white_medium }}
            />
          </div>
        </div>
      </div>

      {feedbackMsg && <div style={styles.feedbackMessage}>{feedbackMsg}</div>}
    </>
  );
};

const styles: {
  [key: string]: CSSProperties;
} = {
  newAccountTrackInputField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  trackAccountInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    borderRadius: constants.border_radius,
  },
  trackNameInputField: {
    width: "90%",
    padding: "5px 5px 5px 10px",
    borderRadius: constants.border_radius,
    fontSize: "12px",
    color: colors.primary_medium,
    border: "none",
    outline: "none",
  },
  trackAddressInputField: {
    width: "70px",
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

  accountItemContainer: {
    height: "50px",
    width: "100%",
    marginTop: "6px",
    marginBottom: "6px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: `2px solid ${colors.accent_light}`,
  },
  valueItems: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  accountItemName: {
    width: "80px",
    color: colors.white_medium,
  },

  accountItemAddress: {
    color: colors.white_medium,
  },

  inputContainerDeleteButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 8px",
    fontSize: "12px",
    cursor: "pointer",
    border: "none",
    textAlign: "center",
  },

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
    marginBottom: "8px",
    textAlign: "center",
  },

  placeholderText: {
    marginBottom: "4px",
  },

  feedbackMessage: {
    marginTop: "12px",
    padding: "8px 12px",
    borderRadius: "8px",
    color: colors.red_medium,
    textAlign: "center",
  },
};

export default WalletTrackerBlock;
