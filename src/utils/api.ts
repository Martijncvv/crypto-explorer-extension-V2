import {
	IAdvancedCoinInfo,
	ICoinGeckoCoinList,
	TrendingCoinList,
	IPriceData,
} from '../models/ICoinInfo'
import { IAdvancedNftInfo, ICoinGeckoNftList } from '../models/INftInfo'
import ITokenTxs from '../models/ITokenTxs'

const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list'
const COINGECKO_NFTS_LIST_API = 'https://api.coingecko.com/api/v3/nfts/list'

export async function fetchCoinsList(): Promise<ICoinGeckoCoinList> {
	const res = await fetch(COINGECKO_COINS_LIST_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Coingecko Coins List}`)
	}

	const data: ICoinGeckoCoinList = await res.json()
	return data
}

export async function fetchTrendingCoins(): Promise<TrendingCoinList> {
	const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
	if (!res.ok) {
		throw new Error(`Fetch error, Hot Coins}`)
	}

	const data = await res.json()
	return data
}

export async function fetchCoinInfo(
	coinId: string
): Promise<IAdvancedCoinInfo> {
	coinId = coinId ? coinId : 'bitcoin'
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
	)
	if (!res.ok) {
		throw new Error(`Fetch error, coin info data: ${coinId}`)
	}

	const data = await res.json()
	return data
}
export async function fetchNftInfo(coinId: string): Promise<IAdvancedNftInfo> {
	const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${coinId}`)
	if (!res.ok) {
		throw new Error(`Fetch error, nft info data: ${coinId}`)
	}

	const data = await res.json()
	return data
}

export async function fetchPriceHistoryData(
	coinId: string,
	quote: string,
	chartRange: string
): Promise<IPriceData> {
	coinId = coinId ? coinId : 'bitcoin'
	quote = quote ? quote : 'usd'

	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=${chartRange}&interval=daily`
	)
	if (!res.ok) {
		throw new Error(`Fetch error, price history data: ${coinId}`)
	}

	const priceData = await res.json()
	return priceData
}

export async function fetchTokenTxs(
	domainName: string,
	contractAddress: string,
	txAmount: number
): Promise<ITokenTxs> {
	const res = await fetch(
		'https://api.' +
			domainName +
			'/api?module=account&action=tokentx&contractaddress=' +
			contractAddress +
			'&page=1&offset=' +
			txAmount +
			'&startblock=0&endblock=99999999&sort=desc'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, Eth token txs info}`)
	}

	const data = await res.json()

	return data
}

export async function fetchNftList(): Promise<ICoinGeckoNftList> {
	let allNfts = []
	for (let page = 1; page < 100; page++) {
		await new Promise((resolve) => setTimeout(resolve, 500))
		let res = await fetch(
			`${COINGECKO_NFTS_LIST_API}?per_page=250&page=${page}`
		)
		if (!res.ok) {
			console.log(`Fetch error, API info page ${page}`)
			return allNfts
		}

		let data: ICoinGeckoNftList = await res.json()

		await allNfts.push(...data)
		if (data.length < 250) {
			return allNfts
		}
	}
}
