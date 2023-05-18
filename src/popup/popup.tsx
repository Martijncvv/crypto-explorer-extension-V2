import React, { CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css'
import TitleBlock from '../components/TitleBlock';
import PriceBar from '../components/PriceBar';
import ValueBlock from '../components/ValueBlock';
import ExpandableTextField from "../components/ExpandableTextField";
import SocialBlock from "../components/SocialBlock";
import ExchangeBlock from "../components/ExchangeBlock";
import HeaderBlock from "../components/HeaderBlock";
import ChartsBlock from "../components/ChartsBlock";
import {IDetailedCoinInfo} from "../models/ICoinInfo";
// import {fetchExchangesList} from "../utils/api"; used for fetching all exchange icons

const blockchainIcon = require( "../static/images/icons/blockchain-icon.png")
const coingeckoIcon = require( "../static/images/icons/coingecko-icon.png")
// const discordIcon = require( "../static/images/icons/discord-icon.png")
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
	// fetchExchangesList()

	// TODO: graph data
	// display total nr of search results after search click


	const formatExchangeInfo = (tickers) => {
		if (!tickers) return [];

		const sortedTickers = tickers.sort((a, b) => b.converted_volume.usd - a.converted_volume.usd);
		const top10Tickers = sortedTickers.slice(0, 10); // by volume

		return top10Tickers.map(obj => {
			let quote = String(obj.target)
			if (quote.length > 5) {
				quote = obj.target_coin_id.toUpperCase()
			}

			return {
				image: redditIcon,
				id: obj.market.identifier,
				exchangeName: obj.market.name,
				tradingVolume: obj.converted_volume.usd,
				quote,
				exchangeURL: obj.trade_url
			};
		});

	}

	console.log("coinInfo1: ", coinInfo)
	if (coinInfo?.tickers)	formatExchangeInfo(coinInfo.tickers)

	return (
		<>
			<div style={styles.container}>
				<HeaderBlock mainLogo={coinInfo?.image?.small ? coinInfo.image.small : blockchainIcon} setCoinInfo={setCoinInfo}/>
			</div>
			{coinInfo?.name &&
				<TitleBlock title={coinInfo.name} />
			}
			<ChartsBlock pricedata={[]} volumedata={[]} />

			<div style={styles.container}>
				{coinInfo?.name &&
					<>
						<PriceBar allTimeLow={coinInfo.market_data?.atl?.usd} allTimeHigh={coinInfo.market_data?.ath?.usd} price={coinInfo.market_data?.current_price?.usd} />
						<div style={styles.dataBlocks}>
							<ValueBlock title="Circ. Supply" mainValue={coinInfo.market_data?.circulating_supply} secondaryValue={coinInfo.market_data?.total_supply} secondaryPreFix='/ '/>
							<ValueBlock title="Market Cap" mainValue={coinInfo.market_data?.market_cap.usd} mainPreFix='$' secondaryValue={coinInfo.market_cap_rank} secondaryPreFix='#' secondaryFormatter={false}/>
						</div>
						<ExchangeBlock exchanges={formatExchangeInfo(coinInfo.tickers)} />

						<ExpandableTextField text={coinInfo.description?.en} />
						<div style={styles.socialBlocks}>
							<SocialBlock image={websiteIcon} link={coinInfo.links?.homepage[0]}  />
							<SocialBlock image={blockchainIcon}  link={coinInfo.links?.blockchain_site[0]} />
							<SocialBlock image={coingeckoIcon} mainValue={coinInfo.watchlist_portfolio_users} link={`https://www.coingecko.com/en/coins/${coinInfo.id}`}  />
							<SocialBlock image={twitterIcon} mainValue={coinInfo.community_data?.twitter_followers}  link={`https://twitter.com/${coinInfo.links.twitter_screen_name}`} />
							<SocialBlock image={redditIcon} mainValue={coinInfo.community_data?.reddit_subscribers}   link={coinInfo.links?.subreddit_url} />
							<SocialBlock image={telegramIcon} mainValue={coinInfo.community_data?.telegram_channel_user_count}   link={`https://t.me/${coinInfo.links.telegram_channel_identifier}`} />
							{/*/!*<SocialBlock image={discordIcon}  link={coinInfo.links.homepage[0]} />*!/ find out what to do with this*/}
						</div>
					</>
				}
			</div>
		</>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<App />);
