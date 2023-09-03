import React, { CSSProperties, useState } from "react";
import colors from "../../static/colors";
import constants from "../../static/constants";
import { setTrackAddressStorage } from "../../utils/storage";

interface WalletTrackerBlockProps {
  title?: string;
}

const WalletTrackerBlock: React.FC<WalletTrackerBlockProps> = () => {
  const styles: { [key: string]: CSSProperties } = {
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
  const [trackAddress, setTrackAddress] = useState<string>("");

  const handleSaveAddressTracker = (trackAddress) => {
    console.log("trackAddress2: ", trackAddress);
    setTrackAddressStorage(trackAddress);
  };

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
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={trackAddress}
          onChange={(e) => setTrackAddress(e.target.value)}
          style={styles.amountInputField}
          placeholder={`Address to track`}
        />
        <button
          style={styles.inputContainerSaveButton}
          onClick={handleSaveAddressTracker}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default WalletTrackerBlock;
