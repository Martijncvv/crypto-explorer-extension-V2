import {
	ICoinGeckoCoinList,
	ITrendingCoinList,
	IPriceHistoryData,
	ISearchCoinList, IDetailedCoinInfo
} from '../models/ICoinInfo'
import { IAdvancedNftInfo, ICoinGeckoNftList } from '../models/INftInfo'
import ITokenTxs from '../models/ITokenTxs'

const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list'
const COINGECKO_NFTS_LIST_API = 'https://api.coingecko.com/api/v3/nfts/list'
// const COINGECKO_EXCHANGES_LIST_API = 'https://api.coingecko.com/api/v3/exchanges?per_page=250'

export async function fetchCoinsList(): Promise<ICoinGeckoCoinList> {
	try {
		const res = await fetch(COINGECKO_COINS_LIST_API);

		if (!res.ok) {
			throw new Error(`Fetch error, Coingecko Coins List: ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching Coingecko Coins List:', error);
		throw error;
	}
}

export async function fetchNameSearch(searchQuery: string): Promise<ISearchCoinList> {
	try {
		const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`);

		if (!res.ok) {
			throw new Error(`Fetch error, Coingecko searchQuery ${searchQuery}: ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching  Coingecko searchQuery ${searchQuery}', error);
		throw error;
	}
}

export async function fetchTrendingCoins(): Promise<ITrendingCoinList> {
	try {
		const res = await fetch('https://api.coingecko.com/api/v3/search/trending');

		if (!res.ok) {
			throw new Error(`Fetch error, Hot Coins: ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching Hot Coins:', error);
		throw error;
	}
}

export async function fetchCoinInfo(coinId: string): Promise<IDetailedCoinInfo> {
	coinId = coinId || 'bitcoin';
	try {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
		);

		if (!res.ok) {
			throw new Error(`Fetch error, coin info data (${coinId}): ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error(`Error fetching coin info data (${coinId}):`, error);
		throw error;
	}
}

export async function fetchNftInfo(coinId: string): Promise<IAdvancedNftInfo> {
	try {
		const res = await fetch(`https://api.coingecko.com/api/v3/nfts/${coinId}`);

		if (!res.ok) {
			throw new Error(`Fetch error, NFT info data (${coinId}): ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error(`Error fetching NFT info data (${coinId}):`, error);
		throw error;
	}
}

export async function fetchPriceHistoryData(
	coinId: string,
	quote: string,
	chartRange: string
): Promise<IPriceHistoryData> {
	coinId = coinId || 'bitcoin';
	quote = quote || 'usd';
	chartRange = chartRange || '30';

	try {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=${chartRange}&interval=daily`
		);

		if (!res.ok) {
			throw new Error(`Fetch error, price history data (${coinId}): ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error(`Error fetching price history data (${coinId}):`, error);
		throw error;
	}
}

export async function fetchTokenTxs(
	domainName: string,
	contractAddress: string,
	txAmount: number
): Promise<ITokenTxs> {
	try {
		const res = await fetch(
			`https://api.${domainName}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=${txAmount}&startblock=0&endblock=99999999&sort=desc`
		);

		if (!res.ok) {
			throw new Error(`Fetch error, Eth token txs info: ${res.status} ${res.statusText}`);
		}

		return await res.json();
	} catch (error) {
		console.error('Error fetching Eth token txs info:', error);
		throw error;
	}
}

export async function fetchNftList(): Promise<ICoinGeckoNftList> {
	let allNfts: ICoinGeckoNftList = [];

	for (let page = 1; page < 100; page++) {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			const res = await fetch(`${COINGECKO_NFTS_LIST_API}?per_page=250&page=${page}`);

			if (!res.ok) {
				console.log(`Fetch error, API info page ${page}: ${res.status} ${res.statusText}`);
				return allNfts;
			}

			const data: ICoinGeckoNftList = await res.json();
			allNfts.push(...data);

			if (data.length < 250) {
				return allNfts;
			}
		} catch (error) {
			console.error(`Error fetching API info page ${page}:`, error);
			return allNfts;
		}
	}

	return allNfts;
}


// used to fetch exchanges
// export async function fetchExchangesList(): Promise<any> {
// 	try {
// 		let pageNr = 1;
// 		let perPage = 250;
// 		let allExchanges = [];
//
// 		while (true) {
// 			const res = await fetch(`${COINGECKO_EXCHANGES_LIST_API}?per_page=${perPage}&page=${pageNr}`);
//
// 			if (!res.ok) {
// 				throw new Error(`Fetch error, Coingecko exchanges List: ${res.status} ${res.statusText}`);
// 			}
// 			const exchanges = await res.json();
// 			allExchanges.push(...exchanges);
// 			if (exchanges.length < perPage) {
// 				// Reached the last page, exit the loop
// 				break;
// 			}
// 			pageNr++;
// 		}
//
// 		const exchangesObject = allExchanges.reduce((acc, exchange) => {
// 			acc[exchange.id] = exchange.image;
// 			// acc[`"${exchange.id}"`] = exchange.image;
// 			return acc;
// 		}, {});
//
// 		console.log("exchangesObject", JSON.stringify(exchangesObject, null, 2))
// 		console.log("exchangesObject.length", Object.keys(exchangesObject).length)
//
// 		} catch (error) {
// 			console.error('Error fetching Coingecko exchanges List:', error);
// 			throw error;
// 		}
// }