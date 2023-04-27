export type ICoinGeckoCoinList = ISimpleCoinInfo[]
export type TrendingCoinList = { coins: ITrendingCoinInfo[] }

export interface ISimpleCoinInfo {
	id: string
	symbol: string
	name: string
	contract_address?: string
	asset_platform_id?: string
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
