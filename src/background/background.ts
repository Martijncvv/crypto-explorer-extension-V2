import { fetchCoinsList, fetchNftList } from '../utils/api'
import {
	setStoredCoinList,
	setStoredCoins,
	setStoredNftList,
} from '../utils/storage'

fetchData()

async function fetchData() {
	let coinList = await fetchCoinsList()
	console.log('coinList')
	console.log(coinList)

	let nftList = await fetchNftList()
	console.log('nftList')
	console.log(nftList)

	setStoredCoinList(coinList)
	setStoredNftList(nftList)
	console.log('BACKGROUND; Coingecko info fetched')
	setStoredCoins([{ id: 'bitcoin', symbol: 'btc', name: 'bitcoin' }])
}
