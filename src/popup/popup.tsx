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
import {IDetailedNftInfo} from "../models/INftInfo";
import TickerBlock from "../components/TickerBlock";
import {amountFormatter, numberFormatter, percentageFormatter} from "../utils/amountFormatter";
import {ITokenTxs} from "../models/ITokenTxs";
// import {fetchExchangesList} from "../utils/api"; used for fetching all exchange icons

const bitcoinIcon = require( "../static/images/icons/bitcoin-icon.png")
const blockchainIcon = require( "../static/images/icons/blockchain-icon.png")
const coingeckoIcon = require( "../static/images/icons/coingecko-icon.png")
const redditIcon = require( "../static/images/icons/reddit-icon.png")
const telegramIcon = require( "../static/images/icons/telegram-icon.png")
const twitterIcon = require( "../static/images/icons/twitter-icon.png")
const websiteIcon = require( "../static/images/icons/website-icon.png")
// const discordIcon = require( "../static/images/icons/discord-icon.png")

const styles: { [key: string]: CSSProperties } = {
	topContainer: {
		padding: '12px',
	},
	bottomContainer: {
		paddingLeft: '12px',
		paddingRight: '12px',
	},
	dataBlocks: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	socialBlocks: {
		display: 'flex',
		justifyContent: 'center',
		gap: '9px',
	},
	bottomMargin: {
		marginBottom: '12px',
	},
};

const App: React.FC = () => {
	const [coinInfo, setCoinInfo] = useState<IDetailedCoinInfo>()
	const [nftInfo, setNftInfo] = useState<IDetailedNftInfo>()
	const [txVolumeChartData, setTxVolumeChartData] = useState<any>([])
	const [tokenTxsChartData, setTokenTxsChartData] = useState<any>([])

	// todo fix onchain txs chart; detailed txs info for coins
	// todo tab selection of coin menu styling;  whiteblack edge
	// todo, check other social link names: reddit, telegram, explorer, conigecko id

	// improve rendering efficiency
	// fix all anys
	// keep highest and lowest price on max chart
	// bring formatExchangeInfo function to exchangeBlock component
	// drag and zoom chart functionality
	// join a group via name/ code?
	// check watchlist etc.

	// Avoid Complex Calculations in the Render Method: Move the calculation of minPrice, maxPrice, maxVolume, maxFormattedPrice, barHeightMultiplier and the map operation to format the chart data outside the Format30dChartData and FormatMaxChartData functions. Store these values in state variables and update them only when price30dHistorydata and priceMaxHistorydata change.
	//
	// Limit the Number of Re-Renders: Instead of using the useState hook for chartOption and listening for changes with useEffect, consider using the useMemo hook. This way, you only calculate the formatted chart data when chartOption, price30dHistorydata, and priceMaxHistorydata change.
	//
	// Memoize Components: React creates a new function instance for every render when you define CustomTooltip and CustomBar within the ChartsBlock component. To prevent unnecessary re-renders and optimize performance, memoize these components with React.memo.
	//
	// Efficient Event Listening: Instead of attaching and removing event listeners on every render, use the useEffect hook to attach the event listener when the component mounts and remove it when the component unmounts.
	//
	// Use React.PureComponent or React.memo for Child Components: If you have child components inside the ChartsBlock that receive props, and you want to prevent unnecessary renders, consider converting these child components to PureComponent or wrapping them with React.memo.
	//
	// Debounce or Throttle Event Handlers: If you're dealing with events that fire rapidly (like scrolling or keyboard events), you might want to limit how often your component re-renders in response to those events.

	const formatExchangeInfo = (tickers) => {
		if (!tickers) return [];

		const sortedTickers = tickers.sort((a, b) => b.converted_volume.usd - a.converted_volume.usd);
		const totalExchanges = sortedTickers.length;
		const top10Tickers = sortedTickers.slice(0, 10); // by volume

		const exchangesFormatted = top10Tickers.map(obj => {
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
		if ((totalExchanges - top10Tickers.length) > 0) {
			exchangesFormatted.push({
				image: "",
				id: "",
				exchangeName: `${totalExchanges - top10Tickers.length} others`,
				tradingVolume: 0,
				quote: '',
				exchangeURL: ''
			})
		}

		return exchangesFormatted
	}

	if (coinInfo?.tickers)	formatExchangeInfo(coinInfo.tickers)

	console.log("nfinfo3: ", nftInfo)

	return (
		<>
			<div style={styles.topContainer}>
				<HeaderBlock mainLogo={coinInfo?.image?.small ? coinInfo.image.small : nftInfo?.image?.small ?  nftInfo.image.small : bitcoinIcon}
							 setCoinInfo={setCoinInfo}
							 setNftInfo={setNftInfo}
							 setTxVolumeChartData={setTxVolumeChartData}
							 setTokenTxsChartData={setTokenTxsChartData}
				/>
			</div>
			{coinInfo?.name &&
				<>
					<TitleBlock title={coinInfo.name} />
					<TickerBlock ticker={coinInfo.symbol} />
					<ChartsBlock
						price30dHistorydata={coinInfo.price30dHistoryData}
						priceMaxHistorydata={coinInfo.priceMaxHistoryData}
						tokenTxsChartData={tokenTxsChartData}
					/>
				</>
			}

			{nftInfo?.name &&
				<>
					<TitleBlock title={nftInfo.name} />
					<TickerBlock ticker={nftInfo.symbol} />
					<ChartsBlock
						txVolumeData={txVolumeChartData}
					/>
				</>
			}
			{(!nftInfo?.name && !coinInfo?.name) &&
				<>
					<TitleBlock title="Fetching data" />
					<TickerBlock ticker="" />
					{/*<TitleBlock title="Fetching data" />*/}
					{/*<TickerBlock ticker="Loading" />*/}
					<ChartsBlock
						txVolumeData={[{date: new Date(), value: 1}]}
					/>
				</>
			}

			<div style={styles.bottomContainer}>
				{coinInfo?.name &&
					<>
						<div  style={styles.bottomMargin} title="ATL / Price / ATH">
							<PriceBar allTimeLow={coinInfo.market_data?.atl?.usd} allTimeHigh={coinInfo.market_data?.ath?.usd} price={coinInfo.market_data?.current_price?.usd} />
						</div>
						<div style={{...styles.dataBlocks, ...styles.bottomMargin}} >
							<ValueBlock title="Circ. Supply" tooltipTitle="/ Total supply" mainValue={coinInfo.market_data?.circulating_supply ? amountFormatter(coinInfo.market_data?.circulating_supply) : "-"} secondaryValue={ coinInfo.market_data?.total_supply ? `/ ${amountFormatter(coinInfo.market_data?.total_supply)}` : "/ -"}/>
							<ValueBlock title="Market Cap" tooltipTitle="# Rank" mainValue={ coinInfo.market_data?.market_cap.usd ? `$${amountFormatter(coinInfo.market_data?.market_cap.usd)}` : "-"}  secondaryValue={coinInfo.market_cap_rank ? `#${coinInfo.market_cap_rank}` : "/ -"}/>
						</div>
						<div  style={styles.bottomMargin}>
							<ExchangeBlock exchanges={formatExchangeInfo(coinInfo.tickers)} />
						</div>
						<div  style={styles.bottomMargin}>
							<ExpandableTextField text={coinInfo.description?.en} />
						</div>
						<div style={{...styles.socialBlocks, ...styles.bottomMargin}}>
							{coinInfo.links?.homepage[0] &&
								<SocialBlock image={websiteIcon} link={coinInfo.links?.homepage[0]}  />
							}
							{coinInfo.links?.blockchain_site[0] &&
								<SocialBlock image={blockchainIcon}  link={coinInfo.links?.blockchain_site[0]} />
							}
							{coinInfo.id &&
								<SocialBlock image={coingeckoIcon} mainValue={coinInfo.watchlist_portfolio_users} link={`https://www.coingecko.com/en/coins/${coinInfo.id}`}  />
							}
							{coinInfo?.links?.twitter_screen_name &&
								<SocialBlock image={twitterIcon} mainValue={coinInfo.community_data?.twitter_followers}  link={`https://twitter.com/${coinInfo.links.twitter_screen_name}`} />
							}
							{coinInfo?.links?.subreddit_url &&
								<SocialBlock image={redditIcon} mainValue={coinInfo.community_data?.reddit_subscribers}   link={coinInfo.links?.subreddit_url} />
							}
							{coinInfo?.links?.telegram_channel_identifier &&
								<SocialBlock image={telegramIcon} mainValue={coinInfo.community_data?.telegram_channel_user_count}   link={`https://t.me/${coinInfo.links.telegram_channel_identifier}`} />
							}
							{/*/!*<SocialBlock image={discordIcon}  link={coinInfo.links.homepage[0]} />*!/ find out what to do with this*/}
						</div>
					</>
				}

				{nftInfo?.name &&
					<>
					<div style={{...styles.dataBlocks, ...styles.bottomMargin}}>
						<ValueBlock
							title="Floor"
							tooltipTitle="24h change %"
							mainValue={`$${amountFormatter(nftInfo.floor_price?.usd) || '-'}`}
							secondaryValue={`${percentageFormatter(nftInfo.floor_price_in_usd_24h_percentage_change)}%`}
						/>
						<ValueBlock
							title="Native"
							tooltipTitle="Native floor/ platform"
							mainValue={`${amountFormatter(nftInfo.floor_price?.native_currency) || '-'}`}
							secondaryValue={nftInfo.native_currency ? (nftInfo.native_currency.charAt(0).toUpperCase() + nftInfo.native_currency.slice(1)).substring(0, 8) : '-'}
						/>
						</div>
						<div style={{...styles.dataBlocks, ...styles.bottomMargin}}>
							<ValueBlock title="Total supply" mainValue={nftInfo.total_supply ? `${nftInfo.total_supply}` : "-"}/>
							<ValueBlock title="Unique owners" tooltipTitle="24h change %" mainValue={nftInfo.number_of_unique_addresses ? numberFormatter(nftInfo.number_of_unique_addresses) : "-"} secondaryValue={nftInfo.number_of_unique_addresses_24h_percentage_change ? `${percentageFormatter(nftInfo.number_of_unique_addresses_24h_percentage_change)}%` : "-"}/>
						</div>
						<div style={{...styles.dataBlocks, ...styles.bottomMargin}}>
							<ValueBlock title="Market Cap" mainValue={nftInfo?.market_cap?.usd ? `$${amountFormatter(nftInfo?.market_cap?.usd)}`: "-"}/>
							<ValueBlock title="Volume" tooltipTitle="24h change %" mainValue={nftInfo.volume_24h.usd ? `$${amountFormatter(nftInfo.volume_24h.usd)}` : "-"} secondaryValue={nftInfo.volume_in_usd_24h_percentage_change ? `${percentageFormatter(nftInfo.volume_in_usd_24h_percentage_change)}%` : "-%"}/>
						</div>

						<div  style={styles.bottomMargin}>
							<ExpandableTextField text={nftInfo.description} />
						</div>
						<div style={{...styles.socialBlocks, ...styles.bottomMargin}}>
							{nftInfo?.links?.homepage &&
								<SocialBlock image={websiteIcon} link={nftInfo.links?.homepage}  />
							}
							{/*{nftInfo.links?.blockchain_site &&*/}
							{/*	<SocialBlock image={blockchainIcon}  link={coinInfo.links?.blockchain} />*/}
						{/*todo find out what to do with this*/}
							{nftInfo?.id &&
								<SocialBlock image={coingeckoIcon}  link={`https://www.coingecko.com/en/coins/${nftInfo.id}`}  />
							}
							{nftInfo?.links?.twitter &&
								<SocialBlock image={twitterIcon}   link={nftInfo?.links?.twitter} />
							}
							{nftInfo?.links?.reddit &&
								<SocialBlock image={redditIcon}  link={nftInfo?.links?.reddit} />
							}
							{nftInfo?.links?.telegram &&
								<SocialBlock image={telegramIcon}  link={nftInfo?.links?.telegram} />
							}
							{nftInfo?.links?.discord &&
								<SocialBlock image={telegramIcon}  link={nftInfo?.links?.discord} />
							}
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
