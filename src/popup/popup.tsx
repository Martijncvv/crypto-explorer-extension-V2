import React, { CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../App.css';
import PriceBar from '../components/PriceBar';
import ValueBlock from '../components/ValueBlock';
import ExpandableTextField from "../components/ExpandableTextField";
import SocialBlock from "../components/SocialBlock";
import ExchangeBlock from "../components/ExchangeBlock";
import HeaderBlock from "../components/HeaderBlock";
import ChartsBlock from "../components/ChartsBlock";
import {IDetailedCoinInfo} from "../models/ICoinInfo";

const blockchainIcon = require( "../static/images/icons/blockchain-icon.png")
const coingeckoIcon = require( "../static/images/icons/coingecko-icon.png")
const discordIcon = require( "../static/images/icons/discord-icon.png")
const redditIcon = require( "../static/images/icons/reddit-icon.png")
const telegramIcon = require( "../static/images/icons/telegram-icon.png")
const twitterIcon = require( "../static/images/icons/twitter-icon.png")
const websiteIcon = require( "../static/images/icons/website-icon.png")

const styles: { [key: string]: CSSProperties } = {
	container: {
		padding: '12px',
	},
	dataBlocks: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	socialBlocks: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
};

const App: React.FC = () => {
	const [coinInfo, setCoinInfo] = useState<IDetailedCoinInfo>()

	console.log("coinInfo1: ", coinInfo)
	// TODO fix conditional rendering
	return (
		<div style={styles.container}>
			<HeaderBlock mainLogo={coinInfo?.image?.small ? coinInfo.image.small : blockchainIcon} setCoinInfo={setCoinInfo}/>
			<ChartsBlock pricedata={[]} volumedata={[]} />
			{coinInfo?.name &&
			<>
				<PriceBar allTimeLow={coinInfo.market_data.atl.usd} allTimeHigh={coinInfo.market_data.ath.usd} price={coinInfo.market_data.current_price.usd} />
				<div style={styles.dataBlocks}>
					<ValueBlock title="Circ. Supply" mainValue={coinInfo.market_data.circulating_supply.toString()} secondaryValue={`/ ${coinInfo.market_data.total_supply}`}/>
					<ValueBlock title="Market Cap" mainValue={coinInfo.market_data.market_cap.toString()} secondaryValue={coinInfo.market_cap_rank.toString()} />
				</div>
				<ExchangeBlock exchanges={[
					{
						image: redditIcon,
						exchangeName: "WOOnetwork",
						tradingVolume: "$2.6 B",
						websiteLink: "https://www.reddit.com/r/dogecoin/",
					},
					{
						image: discordIcon,
						exchangeName: "Binance",
						tradingVolume: "$13.4 M",
						websiteLink: "https://www.reddit.com/r/dogecoin/",
					},
					{
						image: twitterIcon,
						exchangeName: "Huobi",
						tradingVolume: "$1.4 M",
						websiteLink: "https://www.reddit.com/r/dogecoin/",
					},
					{
						image: coingeckoIcon,
						exchangeName: "Bittrex",
						tradingVolume: "$0.5 M",
						websiteLink: "https://www.reddit.com/r/dogecoin/",
					},

				]} />
				<ExpandableTextField text={coinInfo.description} />
				<div style={styles.socialBlocks}>
					<SocialBlock image={websiteIcon} link={coinInfo.links.homepage[0]}  />
					<SocialBlock image={blockchainIcon}  link={coinInfo.links.blockchain_site[0]} />
					<SocialBlock image={coingeckoIcon} mainValue="9 M" link={`https://www.coingecko.com/en/coins/${coinInfo.id}`}  />
					<SocialBlock image={twitterIcon} mainValue="1.7 K"  link={`https://twitter.com/${coinInfo.links.twitter_screen_name}`} />
					<SocialBlock image={redditIcon} mainValue="14 M"  link={coinInfo.links.subreddit_url} />
					<SocialBlock image={telegramIcon} mainValue="10 K"  link={`https://t.me/${coinInfo.links.telegram_channel_identifier}`} />
					{/*/!*<SocialBlock image={discordIcon}  link={coinInfo.links.homepage[0]} />*!/ find out what to do with this*/}
				</div>
			</>
			}

		</div>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<App />);
