// Listen for the 'selectionchange' event to process the selected text
import {setSelectedToken} from "../utils/storage";

document.addEventListener('selectionchange', handleSelection);

async function handleSelection() {
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()

	if (selectedTicker.includes('$') || selectedTicker.includes('#')) {
		selectedTicker = selectedTicker.replace(/[#$?!.,:"']/g, '').toLowerCase();
		if (selectedTicker !== '' && selectedTicker.length < 7) {
			setSelectedToken(selectedTicker)
		}
	}
}