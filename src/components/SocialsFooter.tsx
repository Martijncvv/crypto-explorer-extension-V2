import SocialsNumberField from "./SocialsNumberField";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React, { CSSProperties, useEffect, useState } from "react";
import colors from "../static/colors";
import {
  getPortfolioDataStorage,
  setPortfolioDataStorage,
} from "../utils/storage";

// const openseaIcon = require("../static/images/icons/opensea-icon.png");
const blockchainIcon = require("../static/images/icons/blockchain-icon.png");
const coingeckoIcon = require("../static/images/icons/coingecko-icon.png");
const redditIcon = require("../static/images/icons/reddit-icon.png");
const telegramIcon = require("../static/images/icons/telegram-icon.png");
const twitterIcon = require("../static/images/icons/twitter-icon.png");
const websiteIcon = require("../static/images/icons/website-icon.png");
const discordIcon = require("../static/images/icons/discord-icon.png");

export const SocialsFooter = ({ coinInfo }) => {
  const [portfolioCoins, setPortfolioCoins] = useState<any>([]);

  const checkStorage = async () => {
    const portfolioDataStorage = await getPortfolioDataStorage();
    const coinIds = [];
    portfolioDataStorage?.forEach((coinInfo) => {
      coinIds.push(coinInfo.id);
    });
    setPortfolioCoins(coinIds);
  };

  useEffect(() => {
    checkStorage();
  }, []);

  const addToPortfolio = async () => {
    await setPortfolioDataStorage({
      id: coinInfo.id,
      ticker: coinInfo.symbol,
      iconUrl: coinInfo.image.thumb,
      amount: 0,
      nft: false,
    });
    checkStorage();
  };

  return (
    <div style={styles.socialBlocks}>
      {coinInfo?.links?.homepage?.[0] && (
        <SocialsNumberField
          image={websiteIcon}
          link={coinInfo.links?.homepage[0]}
        />
      )}
      {coinInfo?.links?.blockchain_site?.[0] && (
        <SocialsNumberField
          image={blockchainIcon}
          link={coinInfo.links?.blockchain_site[0]}
        />
      )}
      {coinInfo?.id && (
        <SocialsNumberField
          image={coingeckoIcon}
          title={"Coingecko watchlist portfolios"}
          mainValue={coinInfo.watchlist_portfolio_users}
          link={`https://www.coingecko.com/en/coins/${coinInfo.id}`}
        />
      )}
      {coinInfo?.links?.twitter_screen_name && (
        <SocialsNumberField
          image={twitterIcon}
          title={"Twitter followers"}
          mainValue={coinInfo.community_data?.twitter_followers}
          link={`https://twitter.com/${coinInfo.links.twitter_screen_name}`}
        />
      )}
      {coinInfo?.links?.subreddit_url && (
        <SocialsNumberField
          image={redditIcon}
          title={"Reddit subs"}
          mainValue={coinInfo.community_data?.reddit_subscribers}
          link={coinInfo.links?.subreddit_url}
        />
      )}
      {coinInfo?.links?.telegram_channel_identifier && (
        <SocialsNumberField
          image={telegramIcon}
          title={"Telegram channel size"}
          mainValue={coinInfo.community_data?.telegram_channel_user_count}
          link={`https://t.me/${coinInfo.links.telegram_channel_identifier}`}
        />
      )}

      {coinInfo?.links?.discord && (
        <SocialsNumberField
          image={discordIcon}
          title={"Discord channel size"}
          link={coinInfo?.links?.discord}
        />
      )}

      {!portfolioCoins.includes(coinInfo.id) && (
        <div style={styles.addToPortfolioIcon} title={"Add to Portfolio"}>
          <PlaylistAddIcon
            style={styles.iconStyling}
            onClick={addToPortfolio}
          />
        </div>
      )}
    </div>
  );
};
const styles: { [key: string]: CSSProperties } = {
  socialBlocks: {
    display: "flex",
    justifyContent: "center",
    gap: "9px",
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
  },
};
