export type ICoinGeckoNftList = ISimpleNftInfo[]

export interface ISimpleNftInfo {
	id: string
	contract_address: string
	name: string
	asset_platform_id: string
	symbol: string
}

export interface IDetailedNftInfo {
	id: string
	contract_address: string
	asset_platform_id: string
	name: string
	image: ISize
	description: string
	floor_price: IFloor_price
	volume_24h: IVolume_24h
	market_cap: IMarket_cap
	floor_price_in_usd_24h_percentage_change: number
	number_of_unique_addresses: number
	number_of_unique_addresses_24h_percentage_change: number
	total_supply: number
}

interface ISize {
	small: string
}
interface IFloor_price {
	native_currency: number
	usd: number
}
interface IMarket_cap {
	native_currency: number
	usd: number
}
interface IVolume_24h {
	native_currency: number
	usd: number
}
