import { ISimpleCoinInfo } from '../models/ICoinInfo'
import { getStoredCoinList, setStoredCoins } from '../utils/storage'

console.log('CONTENTSCRIPT is running')

document.addEventListener('selectionchange', getSelection)

async function getSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:"']/g, '')
		.toLowerCase()

	if (selectedTicker !== '' && selectedTicker.length < 7) {
		console.log(`Potential ticker selected: ${selectedTicker}`)

		const coinList: ISimpleCoinInfo[] = await getStoredCoinList()
		console.log(coinList.length)
		const filteredCoinTickers: ISimpleCoinInfo[] = coinList.filter(
			(coin) => coin.symbol === selectedTicker
		)

		let coinIds: ISimpleCoinInfo[] = []
		filteredCoinTickers.forEach((coin: ISimpleCoinInfo) => {
			coinIds.push({
				id: coin.id,
				symbol: coin.symbol,
				name: coin.name,
			})
		})

		setStoredCoins(coinIds)
	}
}
