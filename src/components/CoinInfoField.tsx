import TitleField from "./TitleField";
import TickerField from "./TickerField";
import ChartsField from "./ChartsField";
import React, { CSSProperties } from "react";
import ValueField from "./ValueField";
import { amountFormatter } from "../utils/amountFormatter";
import ExpandableTextField from "./ExpandableTextField";
import { SocialsFooter } from "./SocialsFooter";
import PriceBarField from "./PriceBarField";
import ExchangesField from "./ExchangesField";
import { IDetailedCoinInfo } from "../models/ICoinInfo";

interface ICoinInfoFieldProps {
  coinInfo: IDetailedCoinInfo;
  tokenTxsChartData: any;
}

// Use props type in component
export const CoinInfoField: React.FC<ICoinInfoFieldProps> = ({
  coinInfo,
  tokenTxsChartData,
}) => {
  const handleHelpClick = () => {
    window.open("https://forms.gle/Q8wXHYAmwojH64zS6", "_blank");
  };
  const isBeforeNovember20 = new Date() < new Date("2024-11-24");
  return (
    <>
      <div style={styles.topContainer}>
        <TitleField
          tokenTitle={coinInfo.name}
          title={"Use arrow keys to navigate"}
        />
        <TickerField ticker={coinInfo.symbol} />
      </div>
      <ChartsField
        price30dHistorydata={coinInfo.price30dHistoryData}
        priceMaxHistorydata={coinInfo.priceMaxHistoryData}
        tokenTxsChartData={tokenTxsChartData}
      />

      <div style={styles.bottomContainer}>
        <div style={styles.bottomMargin} title="ATL / Price / ATH">
          <PriceBarField
            allTimeLow={coinInfo.market_data?.atl?.usd}
            allTimeHigh={coinInfo.market_data?.ath?.usd}
            price={coinInfo.market_data?.current_price?.usd}
          />
        </div>
        <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
          <ValueField
            title="Circ. Supply"
            tooltipTitle="/ Total supply"
            mainValue={
              coinInfo.market_data?.circulating_supply
                ? amountFormatter(coinInfo.market_data?.circulating_supply)
                : "-"
            }
            secondaryValue={
              coinInfo.market_data?.total_supply
                ? `/ ${amountFormatter(coinInfo.market_data?.total_supply)}`
                : "/ -"
            }
          />
          <ValueField
            title="Market Cap"
            tooltipTitle="# Rank"
            mainValue={
              coinInfo.market_data?.market_cap.usd
                ? `$${amountFormatter(coinInfo.market_data?.market_cap.usd)}`
                : "-"
            }
            secondaryValue={
              coinInfo.market_cap_rank ? `#${coinInfo.market_cap_rank}` : "/ -"
            }
          />
        </div>
        <div style={styles.bottomMargin}>
          <ExchangesField tickers={coinInfo.tickers} />
        </div>
        <div style={styles.bottomMargin}>
          <ExpandableTextField text={coinInfo.description?.en} />
        </div>
        {/*https://forms.gle/Q8wXHYAmwojH64zS6*/}
        {isBeforeNovember20 && (
          <div style={styles.helpContainer} onClick={handleHelpClick}>
            <p style={styles.helpText}>Marty here! Help me out (click here)</p>
          </div>
        )}
        <SocialsFooter coinInfo={coinInfo} />
      </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  topContainer: {
    padding: "0 12px",
  },
  bottomContainer: {
    padding: "0 12px",
  },
  dataBlocks: {
    display: "flex",
    justifyContent: "space-between",
  },

  bottomMargin: {
    marginBottom: "12px",
  },
  helpContainer: {
    textAlign: "center",
    cursor: "pointer",
    padding: "10px",
    backgroundColor: "rgba(0,123,255,0.18)",
    borderRadius: "5px",
    color: "white",
    marginTop: "12px",
    marginBottom: "12px",
    transition: "background-color 0.3s",
  },
  helpText: {
    margin: 0,
    fontWeight: "bold",
  },
};
