import colors from "../../static/colors";
import React, { CSSProperties } from "react";
import constants from "../../static/constants";
import MenuIcon from "@mui/icons-material/Menu";

export const OverlayButton = ({ setMenuIsOpen }) => {
  return (
    <div
      style={styles.menuIconBlock}
      title="Menu"
      onClick={() => setMenuIsOpen(true)}
    >
      <MenuIcon style={{ fontSize: 24, color: colors.secondary_medium }} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  menuIconBlock: {
    width: 40,
    height: 40,
    borderRadius: constants.border_radius,
    backgroundColor: colors.primary_dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};
