import React, { CSSProperties, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import TitleBlock from "../components/TitleBlock";
import PriceBar from "../components/PriceBar";
import ValueBlock from "../components/ValueBlock";
import ExpandableTextBlock from "../components/ExpandableTextBlock";
import SocialBlock from "../components/SocialBlock";
import ExchangeBlock from "../components/ExchangeBlock";
import HeaderBlock from "../components/HeaderBlock";
import ChartsBlock from "../components/ChartsBlock";
import { IDetailedCoinInfo } from "../models/ICoinInfo";
import { IDetailedNftInfo } from "../models/INftInfo";
import TickerBlock from "../components/TickerBlock";
import {
  amountFormatter,
  numberFormatter,
  percentageFormatter,
} from "../utils/amountFormatter";
import OverlayMenu from "../components/OverlayMenu";
import {
  setPortfolioDataStorage,
  getPortfolioDataStorage,
} from "../utils/storage";

const bitcoinIcon = require("../static/images/icons/bitcoin-icon.png");
const blockchainIcon = require("../static/images/icons/blockchain-icon.png");
const openseaIcon = require("../static/images/icons/opensea-icon.png");
const coingeckoIcon = require("../static/images/icons/coingecko-icon.png");
const redditIcon = require("../static/images/icons/reddit-icon.png");
const telegramIcon = require("../static/images/icons/telegram-icon.png");
const twitterIcon = require("../static/images/icons/twitter-icon.png");
const websiteIcon = require("../static/images/icons/website-icon.png");
const discordIcon = require("../static/images/icons/discord-icon.png");

import colors from "../static/colors";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles: { [key: string]: CSSProperties } = {
  topContainer: {
    padding: "12px",
  },
  bottomContainer: {
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  dataBlocks: {
    display: "flex",
    justifyContent: "space-between",
  },
  socialBlocks: {
    display: "flex",
    justifyContent: "center",
    gap: "9px",
  },
  bottomMargin: {
    marginBottom: "12px",
  },
  addToPortfolioIcon: {
    cursor: "pointer",
    width: 38,
    height: 42,
    padding: "9px 0px 0px",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary_dark,
  },
  iconStyling: {
    fontSize: 20,
    color: colors.white_medium,
    // color: colors.secondary_dark,
  },
};

const App: React.FC = () => {
  const [coinInfo, setCoinInfo] = useState<IDetailedCoinInfo>();
  const [nftInfo, setNftInfo] = useState<IDetailedNftInfo>();
  const [txVolumeChartData, setTxVolumeChartData] = useState<any>([]);
  const [tokenTxsChartData, setTokenTxsChartData] = useState<any>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [portfolioCoins, setPortfolioCoins] = useState<any>([]);

  // todo splash screen/ new icon
  // todo, make ref links of all exchange buttons
  // todo usdt socials

  //  zou ik uitbreiden naar een discord bot zoals whalebot, zo eentje die andere servers inviten en dat ze dan alle commands van whalebot kunnen gebruiken.
  // ideas: store notes for accounts (discord/ twitter)

  const addToPortfolio = () => {
    setPortfolioDataStorage({
      id: coinInfo.id,
      ticker: coinInfo.symbol,
      iconUrl: coinInfo.image.thumb,
      amount: 0,
      nft: false,
    });
    setTimeout(() => {
      setMenuIsOpen(true);
    }, 1000);
  };

  const checkStorage = async () => {
    const portfolioDataStorage = await getPortfolioDataStorage();

    if (portfolioDataStorage?.length > 0) {
      const coinIds = [];
      portfolioDataStorage.forEach((coinInfo) => {
        coinIds.push(coinInfo.id);
      });
      setPortfolioCoins(coinIds);
    }
  };

  useEffect(() => {
    checkStorage();
  }, [menuIsOpen]);

  // keep highest and lowest price on max chart
  // drag and zoom chart functionality
  // fix all anys
  // join a group via name/ code?
  // check watchlist etc.

  return (
    <>
      <OverlayMenu
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        coinInfo={coinInfo}
        nftInfo={nftInfo}
      />
      <div style={styles.topContainer}>
        <HeaderBlock
          mainLogo={
            coinInfo?.image?.small
              ? coinInfo.image.small
              : nftInfo?.image?.small
              ? nftInfo.image.small
              : bitcoinIcon
          }
          setCoinInfo={setCoinInfo}
          setNftInfo={setNftInfo}
          setTxVolumeChartData={setTxVolumeChartData}
          setTokenTxsChartData={setTokenTxsChartData}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
      {coinInfo?.name && (
        <>
          <TitleBlock
            tokenTitle={coinInfo.name}
            title={"Use arrow keys to navigate"}
          />
          <TickerBlock ticker={coinInfo.symbol} />
          <ChartsBlock
            price30dHistorydata={
              coinInfo.price30dHistoryData && coinInfo.price30dHistoryData
            }
            priceMaxHistorydata={
              coinInfo.priceMaxHistoryData && coinInfo.priceMaxHistoryData
            }
            tokenTxsChartData={tokenTxsChartData && tokenTxsChartData}
          />
        </>
      )}

      {nftInfo?.name && (
        <>
          <TitleBlock
            tokenTitle={nftInfo.name}
            title={"Use arrow keys to navigate"}
          />
          <TickerBlock ticker={nftInfo.symbol} />
          <ChartsBlock txVolumeData={txVolumeChartData && txVolumeChartData} />
        </>
      )}
      {!nftInfo?.name && !coinInfo?.name && (
        <>
          <TitleBlock
            tokenTitle="Fetching data"
            title={"Use arrow keys to navigate"}
          />
          <TickerBlock ticker="" />
          <ChartsBlock />
        </>
      )}

      <div style={styles.bottomContainer}>
        {coinInfo?.name && (
          <>
            <div style={styles.bottomMargin} title="ATL / Price / ATH">
              <PriceBar
                allTimeLow={coinInfo.market_data?.atl?.usd}
                allTimeHigh={coinInfo.market_data?.ath?.usd}
                price={coinInfo.market_data?.current_price?.usd}
              />
            </div>
            <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
              <ValueBlock
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
              <ValueBlock
                title="Market Cap"
                tooltipTitle="# Rank"
                mainValue={
                  coinInfo.market_data?.market_cap.usd
                    ? `$${amountFormatter(
                        coinInfo.market_data?.market_cap.usd,
                      )}`
                    : "-"
                }
                secondaryValue={
                  coinInfo.market_cap_rank
                    ? `#${coinInfo.market_cap_rank}`
                    : "/ -"
                }
              />
            </div>
            <div style={styles.bottomMargin}>
              <ExchangeBlock tickers={coinInfo.tickers} />
            </div>
            <div style={styles.bottomMargin}>
              <ExpandableTextBlock text={coinInfo.description?.en} />
            </div>
            <div style={{ ...styles.socialBlocks, ...styles.bottomMargin }}>
              {coinInfo.links?.homepage[0] && (
                <SocialBlock
                  image={websiteIcon}
                  link={coinInfo.links?.homepage[0]}
                />
              )}
              {coinInfo.links?.blockchain_site[0] && (
                <SocialBlock
                  image={blockchainIcon}
                  link={coinInfo.links?.blockchain_site[0]}
                />
              )}
              {coinInfo?.id && (
                <SocialBlock
                  image={coingeckoIcon}
                  title={"Coingecko watchlist portfolios"}
                  mainValue={coinInfo.watchlist_portfolio_users}
                  link={`https://www.coingecko.com/en/coins/${coinInfo.id}`}
                />
              )}
              {coinInfo?.links?.twitter_screen_name && (
                <SocialBlock
                  image={twitterIcon}
                  title={"Twitter followers"}
                  mainValue={coinInfo.community_data?.twitter_followers}
                  link={`https://twitter.com/${coinInfo.links.twitter_screen_name}`}
                />
              )}
              {coinInfo?.links?.subreddit_url && (
                <SocialBlock
                  image={redditIcon}
                  title={"Reddit subs"}
                  mainValue={coinInfo.community_data?.reddit_subscribers}
                  link={coinInfo.links?.subreddit_url}
                />
              )}
              {coinInfo?.links?.telegram_channel_identifier && (
                <SocialBlock
                  image={telegramIcon}
                  title={"Telegram channel size"}
                  mainValue={
                    coinInfo.community_data?.telegram_channel_user_count
                  }
                  link={`https://t.me/${coinInfo.links.telegram_channel_identifier}`}
                />
              )}
              {!portfolioCoins.includes(coinInfo.id) && (
                <div
                  style={styles.addToPortfolioIcon}
                  title={"Add to Portfolio"}
                >
                  <PlaylistAddIcon
                    style={styles.iconStyling}
                    onClick={addToPortfolio}
                  />
                </div>
              )}

              {/*/!*<SocialBlock image={discordIcon}  title={"Discord channel size"}  link={coinInfo.links.homepage[0]} />*!/ find out what to do with this*/}
            </div>
          </>
        )}

        {nftInfo?.name && (
          <>
            <div style={{ ...styles.dataBlocks, ...styles.bottomMargin }}>
              <ValueBlock
                title="Floor"
                tooltipTitle="24h change %"
                mainValue={`$${
                  amountFormatter(nftInfo.floor_price?.usd) || "-"
                }`}
                secondaryValue={`${percentageFormatter(
                  nftInfo.floor_price_in_usd_24h_percentage_change,
                )}%`}
              />
              <ValueBlock
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
              <ValueBlock
                title="Total supply"
                mainValue={
                  nftInfo.total_supply ? `${nftInfo.total_supply}` : "-"
                }
              />
              <ValueBlock
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
              <ValueBlock
                title="Market Cap"
                mainValue={
                  nftInfo?.market_cap?.usd
                    ? `$${amountFormatter(nftInfo?.market_cap?.usd)}`
                    : "-"
                }
              />
              <ValueBlock
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
              <ExpandableTextBlock text={nftInfo.description} />
            </div>
            <div style={{ ...styles.socialBlocks, ...styles.bottomMargin }}>
              {nftInfo?.links?.homepage && (
                <SocialBlock
                  image={websiteIcon}
                  link={nftInfo.links?.homepage}
                />
              )}
              {/*{nftInfo.links?.blockchain_site &&*/}
              {/*	<SocialBlock image={blockchainIcon}  link={coinInfo.links?.blockchain} />*/}
              {nftInfo?.id && (
                <SocialBlock
                  image={coingeckoIcon}
                  title={"Coingecko watchlist portfolios"}
                  link={`https://www.coingecko.com/en/nft/${nftInfo.id}`}
                />
              )}
              {nftInfo?.contract_address && (
                <SocialBlock
                  image={openseaIcon}
                  title={"Opensea page"}
                  link={`https://opensea.io/assets?search[query]=${nftInfo.contract_address}`}
                />
              )}
              {nftInfo?.links?.twitter && (
                <SocialBlock
                  image={twitterIcon}
                  title={"Twitter followers"}
                  link={nftInfo?.links?.twitter}
                />
              )}
              {nftInfo?.links?.reddit && (
                <SocialBlock
                  image={redditIcon}
                  title={"Reddit subs"}
                  link={nftInfo?.links?.reddit}
                />
              )}
              {nftInfo?.links?.telegram && (
                <SocialBlock
                  image={telegramIcon}
                  title={"Telegram channel size"}
                  link={nftInfo?.links?.telegram}
                />
              )}
              {nftInfo?.links?.discord && (
                <SocialBlock
                  image={telegramIcon}
                  title={"Discord channel size"}
                  link={nftInfo?.links?.discord}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
