import { ISimpleCoinInfo } from '../models/ICoinInfo';
import { getStoredCoinList, setStoredCoins } from '../utils/storage';

// Listen for the 'selectionchange' event to process the selected text
document.addEventListener('selectionchange', handleSelection);
// TODO uncomment this

async function handleSelection() {
	// Get the selected text, remove special characters, and convert to lowercase
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:"']/g, '')
		.toLowerCase();

	// Process the selected text if it's not empty and shorter than 7 characters
	if (selectedTicker !== '' && selectedTicker.length < 7) {
		const coinList: ISimpleCoinInfo[] = await getStoredCoinList();

		// Filter the coin list based on the selected ticker
		const filteredCoinTickers: ISimpleCoinInfo[] = coinList.filter(
			(coin) => coin.symbol === selectedTicker
		);

		// Create a new array of coin IDs based on the filtered coin tickers
		let coinIds: ISimpleCoinInfo[] = [];
		filteredCoinTickers.forEach((coin: ISimpleCoinInfo) => {
			coinIds.push({
				id: coin.id,
				symbol: coin.symbol,
				name: coin.name,
			});
		});

		// Store the coin IDs in the local storage
		setStoredCoins(coinIds);
	}
}