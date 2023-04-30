import { fetchCoinsList, fetchNftList } from '../utils/api'
import {
	setStoredCoinList,
	setStoredCoins,
	setStoredNftList,
} from '../utils/storage'

// fetchData()

async function fetchData() {
	let coinList = await fetchCoinsList()
	let nftList = await fetchNftList()
	setStoredCoinList(coinList)
	setStoredNftList(nftList)
	setStoredCoins([{ id: 'bitcoin', symbol: 'btc', name: 'bitcoin' }])
}
