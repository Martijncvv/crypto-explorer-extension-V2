export type ICoinGeckoCoinList = ISimpleCoinInfo[]
export type ITrendingCoinList = { coins: ITrendingCoinInfo[] }
export type ISearchOptions = {
	tokens: ISearchOption[]
	total: number
}


export type ISearchCoinList = {
	coins: ICoinSearchInfo[]
	exchanges: IExchangeSearchInfo[]
	icos: any
	categories: ICategorySearchInfo[]
	nfts: INFTSearchInfo[]
}

export interface ITrendingCoinInfo {
	item: {
		id: string
		coin_id: number
		name: string
		symbol: string
		market_cap_rank: number
		thumb: string
		small: string
		large: string
		slug: string
		price_btc: number
		score: number
	}
}

export interface ICoinSearchInfo{
	id: string
	name: string
	api_symbol: string
	symbol: string
	market_cap_rank: number
	thumb: string
	large: string
}

export interface ISearchOption{
	id: string
	name: string
	image: string
	marketCapRank: number | string
	nft: boolean
}
export interface INFTSearchInfo {
	id: string
	name: string
	symbol: string
	thumb: string
}
export interface ICategorySearchInfo {
	id: number
	name: string
}
export interface IExchangeSearchInfo {
	id: string
	name: string
	market_type: string
	thumb: string
	large: string
}

export interface ISimpleCoinInfo {
	id: string
	symbol: string
	name: string
	contract_address?: string
	asset_platform_id?: string
}

export interface IDetailedCoinInfo {
	circSupply: number
	contractAddress: string
	description: ILanguage
	icon: string
	id: string
	image: ISize
	links: ILinks
	community_data: ICommunityData
	market_data: IMarketData
	market_cap_rank: number
	name: string
	symbol: string
	watchlist_portfolio_users: number
	tickers: IExchangeTickerInfo[]
	price30dHistoryData: any
	priceMaxHistoryData: any
	txVolumeData: any
}


interface IMarketData {
	market_cap: IQuote
	current_price: IQuote
	total_volume: IQuote
	ath: IQuote
	atl: IQuote
	circulating_supply: number
	total_supply: number
}
interface IExchangeTickerInfo {
	base: string;
	target: string;
	market: {
		name: string;
		identifier: string;
		has_trading_incentive: boolean;
	};
	last: number;
	volume: number;
	converted_last: {
		btc: number;
		eth: number;
		usd: number;
	};
	converted_volume: {
		btc: number;
		eth: number;
		usd: number;
	};
	trust_score: string;
	bid_ask_spread_percentage: number;
	timestamp: string;
	last_traded_at: string;
	last_fetch_at: string;
	is_anomaly: boolean;
	is_stale: boolean;
	trade_url: string;
	token_info_url: string | null;
	coin_id: string;
	target_coin_id: string;
}


interface IQuote {
	usd: number
	btc: number
}
interface ICommunityData {
	facebook_likes: number
	reddit_accounts_active_48h: number
	reddit_average_comments_48h: number
	reddit_average_posts_48h: number
	reddit_subscribers: number
	telegram_channel_user_count: number
	twitter_followers: number
}
interface ILanguage {
	en: string
}
interface ISize {
	large: string
	small: string
	thumb: string
}
interface ILinks {
	homepage: string[]
	twitter_screen_name: string
	subreddit_url: string
	telegram_channel_identifier: string
	blockchain_site: string[]
}

export interface IPriceHistoryData {
	prices: IUnixPriceArray[]
	market_caps: IUnixMarketcapArray[]
	total_volumes: IUnixVolumeArray[]
}
interface IUnixPriceArray {
	UnixPrice: number[]
}
interface IUnixVolumeArray {
	UnixVolume: number[]
}
interface IUnixMarketcapArray {
	UnixMarketcap: number[]
}
