import React, { CSSProperties } from "react";

interface TickerBlockProps {
  ticker: string;
}

const TickerField: React.FC<TickerBlockProps> = ({ ticker }) => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      height: 65,
      width: 260,

      position: "absolute",
      top: "100px",
      left: "50%",
      transform: "translateX(-50%)",

      textAlign: "center",
      fontFamily: "Open Sans, sans-serif",
      color: "#0000001A",
      // backgroundColor: 'red'
    },
    tickerText: {
      fontSize: ticker.length > 9 ? 32 : ticker.length > 5 ? 40 : 64,
      wordWrap: "break-word",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.tickerText}>{ticker.toUpperCase()}</span>
    </div>
  );
};

export default TickerField;
