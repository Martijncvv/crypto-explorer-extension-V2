

// Listen for the 'selectionchange' event to process the selected text
document.addEventListener('selectionchange', handleSelection);
// TODO do we want this feature. People freaking on warning at installation permission requests

async function handleSelection() {
	// Get the selected text, remove special characters, and convert to lowercase
	let selectedTicker = window
		.getSelection()
		.toString()
		.trim()
		.replace(/[#$?!.,:"']/g, '')
		.toLowerCase();

	// Process the selected text if it's not empty and shorter than 7 characters //
	// todo check if this can be improved
	if (selectedTicker !== '' && selectedTicker.length < 7) {

	}
}