
export interface LocalStorageData {
	favouriteToken?: string;
	selectedToken?: string;
	searchPref?: string;
	searchResultNftAmount?: number;
}



// SETTERS
export async function setSelectedTokenStorage(token: string): Promise<void> {
	try {
	return new Promise((resolve) => {
		chrome.storage.local.set({ selectedToken: token }, () => {
			resolve();
		});
	});
	} catch (error) {
		console.log("setSelectedToken error: ", error);
	}
}
export async function setSearchPrefStorage(searchPref: string): Promise<void> {
	try {
	return new Promise((resolve) => {
		chrome.storage.local.set({ searchPref: searchPref }, () => {
			resolve();
		});
	});
	} catch (error) {
		console.log("setSearchPrefStorage error: ", error);
	}
}
export async function setSearchResultNftAmountStorage(searchResultNftAmount: number): Promise<void> {
	try {
	return new Promise((resolve) => {
		chrome.storage.local.set({ searchResultNftAmount }, () => {
			resolve();
		});
	});
	} catch (error) {
		console.log("setSearchResultNftAmountStorage error: ", error);
	}
}


// GETTERS
export async function getSelectedTokenStorage(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['selectedToken'], (res: LocalStorageData) => {
			if (res?.selectedToken) {
				resolve(res.selectedToken);
			}
		});
	});
}
export async function getSearchPrefStorage(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['searchPref'], (res: LocalStorageData) => {
			if (res?.searchPref) {
				resolve(res.searchPref);
			}
		});
	});
}
export async function getSearchResultNftAmountStorage(): Promise<number> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['searchResultNftAmount'], (res: LocalStorageData) => {
			if (res?.searchResultNftAmount) {
				resolve(res.searchResultNftAmount);
			}
		});
	});
}




// export async function setFavouriteToken(token: string): Promise<void> {
// 	return new Promise((resolve) => {
// 		chrome.storage.local.set({ favouriteToken: token }, () => {
// 			resolve();
// 		});
// 	});
// }
// export async function getStoredFavouriteToken(): Promise<string> {
// 	return new Promise((resolve) => {
// 		chrome.storage.local.get(['favouriteToken'], (res: LocalStorageData) => {
// 			if (res?.selectedToken) {
// 				resolve(res.favouriteToken);
// 			}
// 		});
// 	});
// }