import React, { CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../App.css';
import PriceBar from '../components/PriceBar';
import ValueBlock from '../components/ValueBlock';
import ExpandableTextField from "../components/ExpandableTextField";
import SocialBlock from "../components/SocialBlock";
import ExchangeBlock from "../components/ExchangeBlock";

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
		marginTop: '18px',
	},
	socialBlocks: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
};


const App: React.FC = () => {
	return (
		<div style={styles.container}>
			<PriceBar allTimeLow={0.22} allTimeHigh={1.78} price={1.60} />
			<div style={styles.dataBlocks}>
				<ValueBlock title="Circ. Supply" mainValue="139 T" secondaryValue="/ 250 T" />
				<ValueBlock title="Market Cap" mainValue="$11.6 B" secondaryValue="#9" />
			</div>
			<ExpandableTextField text={"Dogecoin is a cryptocurrency based on the popular \"Doge\" Internet meme and features a Shiba Inu on its logo. Dogecoin is a Litecoin fork. Introduced as a \"joke currency\" on 6 December 2013, Dogecoin quickly developed its own online community and reached a capitalization of US$60 million in January 2014. Compared with other cryptocurrencies, Dogecoin had a fast initial coin production schedule: 100 billion coins were in circulation by mid-2015, with an additional 5.256 billion coins every year thereafter. As of 30 June 2015, the 100 billionth Dogecoin had been mined. Dogecoin was created by Billy Markus from Portland, Oregon and Jackson Palmer from Sydney, Australia. Both wanted to create a fun cryptocurrency that will appeal beyond the core Bitcoin audience. Dogecoin is primarily used as a tipping system on Reddit and Twitter where users tip each other for creating or sharing good content. The community is very active in organising fundraising activities for deserving causes. The developers of Dogecoin haven’t made any major changes to the coin since 2015. This means that Dogecoin could get left behind and is why Shibas are leaving Dogecoin to join more advanced platforms like Ethereum. One of Dogecoin strengths is its relaxed and fun-loving community. However, this is also a weakness because other currencies are way more professional. To purchase Dogecoin, it involves downloading a crypto wallet, setting up a crypto exchange account and then trading away for your desired crypto currency. Once we have set up an account with a DOGE currency exchange and deposited some funds, you are ready to start trading."} />
			<ExchangeBlock exchanges={[
				{
					image: redditIcon,
					exchangeName: "WOOnetwork",
					tradingVolume: "$2.6 B",
				},
				{
					image: discordIcon,
					exchangeName: "Binance",
					tradingVolume: "$13.4 M",
				},
				{
					image: twitterIcon,
					exchangeName: "Huobi",
					tradingVolume: "$1.4 M",
				},
				{
					image: coingeckoIcon,
					exchangeName: "Bittrex",
					tradingVolume: "$0.5 M",
				},

			]} />
			<div style={styles.socialBlocks}>
				<SocialBlock image={websiteIcon}   />
				<SocialBlock image={blockchainIcon}  />
				<SocialBlock image={coingeckoIcon} mainValue="9 M"  />
				<SocialBlock image={twitterIcon} mainValue="1.7 K"  />
				<SocialBlock image={redditIcon} mainValue="14 M"  />
				<SocialBlock image={telegramIcon} mainValue="10 K"  />
				<SocialBlock image={discordIcon}  />
			</div>
		</div>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<App />);
