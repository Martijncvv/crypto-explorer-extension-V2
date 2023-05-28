// Listen for the 'selectionchange' event to process the selected text
import {setSelectedToken} from "../utils/storage";

document.addEventListener('selectionchange', handleSelection);

async function handleSelection() {
	// Get the selected text, remove special characters, and convert to lowercase
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


	// Process the selected text if it's not empty and shorter than 7 characters //
	// todo check if this can be improved

}