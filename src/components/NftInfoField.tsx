import TitleField from "./TitleField";
import TickerField from "./TickerField";
import ChartsField from "./ChartsField";
import React, { CSSProperties } from "react";
import ValueField from "./ValueField";
import {
  amountFormatter,
  numberFormatter,
  percentageFormatter,
} from "../utils/amountFormatter";
import ExpandableTextField from "./ExpandableTextField";
import { SocialsFooter } from "./SocialsFooter";
import { IDetailedNftInfo } from "../models/INftInfo";

interface INftInfoFieldProps {
  nftInfo: IDetailedNftInfo;
  txVolumeChartData: any;
}

// Use props type in component
export const NftInfoField: React.FC<INftInfoFieldProps> = ({
  nftInfo,
  txVolumeChartData,
}) => {
  return (
    <>
      <div style={styles.topContainer}>
        <TitleField
          tokenTitle={nftInfo.name}
          title={"Use arrow keys to navigate"}
        />
        <TickerField ticker={nftInfo.symbol} />
      </div>
      <ChartsField txVolumeData={txVolumeChartData} />
      <div style={styles.bottomContainer}>
        <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
          <ValueField
            title="Floor"
            tooltipTitle="24h change %"
            mainValue={`$${amountFormatter(nftInfo.floor_price?.usd) || "-"}`}
            secondaryValue={`${percentageFormatter(
              nftInfo.floor_price_in_usd_24h_percentage_change,
            )}%`}
          />
          <ValueField
            title="Native"
            tooltipTitle="Native floor/ platform"
            mainValue={`${
              amountFormatter(nftInfo.floor_price?.native_currency) || "-"
            }`}
            secondaryValue={
              nftInfo.native_currency
                ? (
                    nftInfo.native_currency.charAt(0).toUpperCase() +
                    nftInfo.native_currency.slice(1)
                  ).substring(0, 8)
                : "-"
            }
          />
        </div>
        <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
          <ValueField
            title="Total supply"
            mainValue={nftInfo.total_supply ? `${nftInfo.total_supply}` : "-"}
          />
          <ValueField
            title="Unique owners"
            tooltipTitle="24h change %"
            mainValue={
              nftInfo.number_of_unique_addresses
                ? numberFormatter(nftInfo.number_of_unique_addresses)
                : "-"
            }
            secondaryValue={
              nftInfo.number_of_unique_addresses_24h_percentage_change
                ? `${percentageFormatter(
                    nftInfo.number_of_unique_addresses_24h_percentage_change,
                  )}%`
                : ""
            }
          />
        </div>
        <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
          <ValueField
            title="Market Cap"
            mainValue={
              nftInfo?.market_cap?.usd
                ? `$${amountFormatter(nftInfo?.market_cap?.usd)}`
                : "-"
            }
          />
          <ValueField
            title="Volume"
            tooltipTitle="24h change %"
            mainValue={
              nftInfo.volume_24h.usd
                ? `$${amountFormatter(nftInfo.volume_24h.usd)}`
                : "-"
            }
            secondaryValue={
              nftInfo.volume_in_usd_24h_percentage_change
                ? `${percentageFormatter(
                    nftInfo.volume_in_usd_24h_percentage_change,
                  )}%`
                : ""
            }
          />
        </div>

        <div style={styles.bottomMargin}>
          <ExpandableTextField text={nftInfo.description} />
        </div>
        <SocialsFooter coinInfo={nftInfo} />
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
};
