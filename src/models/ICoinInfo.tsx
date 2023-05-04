export type ICoinGeckoCoinList = ISimpleCoinInfo[]
export type ITrendingCoinList = { coins: ITrendingCoinInfo[] }
export type ISearchCoinList = {
	coins: ICoinSearchInfo[]
	exchanges: IExchangeSearchInfo[]
	icos: any
	categories: ICategorieSearchInfo[]
	nfts: INFTSearchInfo[]
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
export interface INFTSearchInfo {
	id: string
	name: string
	symbol: string
	thumb: string
}
export interface ICategorieSearchInfo {
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
	assetPlatformId: string
	blockExplorerLink: string
	circSupply: number
	coingeckoLink: string
	contractAddress: string
	description: string
	icon: string
	id: string
	marketCapRank: string
	name: string
	price: number
	symbol: string
	telegramLink: string
	totalSupply: string
	twitterLink: string
	websiteLink: string
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
export interface IAdvancedCoinInfo {
	id: string
	symbol: string
	name: string
	image: ISize
	coingecko_rank: number
	asset_platform_id: string
	contract_address: string
	description: ILanguage
	market_data: IMarket_data
	market_cap_rank: number
	links: ILinks
}
interface IMarket_data {
	market_cap: IQuote
	current_price: IQuote
	total_volume: IQuote
	ath: IQuote
	atl: IQuote
	circulating_supply: number
	total_supply: number
}

interface IQuote {
	usd: number
	btc: number
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
	telegram_channel_identifier: string
	blockchain_site: string[]
}

export interface IPriceData {
	prices: IUnixPriceArray[]
	market_caps: IUnixPriceArray[]
	total_volumes: IUnixPriceArray[]
}
interface IUnixPriceArray {
	UnixPrice: IUnixPrice[]
}
interface IUnixPrice {
	value: number
}
