import React, { CSSProperties } from "react";
import colors from "../static/colors";
import constants from "../static/constants";

interface ValueBlockProps {
  title: string;
  mainValue: string;
  secondaryValue?: string;
  tooltipTitle?: string;
}

const ValueField: React.FC<ValueBlockProps> = ({
  title,
  mainValue,
  secondaryValue,
  tooltipTitle,
}) => {
  const styles: { [key: string]: CSSProperties } = {
    rectangle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 144,
      height: 48,
      backgroundColor: colors.primary_dark,
      borderRadius: constants.border_radius,
    },
    title: {
      fontSize: 14,
      height: 16,
      fontWeight: constants.font_weight_medium,
      color: colors.secondary_light,
      marginTop: 4,
      marginBottom: 0,
    },
    values: {
      display: "flex",
      alignItems: "flex-end",
      height: 24,
      marginBottom: 6,
    },
    mainValue: {
      fontSize: constants.font_medium,
      fontWeight: constants.font_weight_medium,
      color: colors.white_medium,
    },
    secondaryValue: {
      fontSize: constants.font_small,
      fontWeight: constants.font_weight_medium,
      color: colors.accent_medium,
      marginLeft: 4,
    },
  };

  return (
    <div style={styles.rectangle} title={tooltipTitle}>
      <div style={styles.title}>{title}</div>
      <div style={styles.values}>
        <span style={styles.mainValue}>{mainValue}</span>
        {secondaryValue && (
          <span style={styles.secondaryValue}>{secondaryValue}</span>
        )}
      </div>
    </div>
  );
};

export default ValueField;
