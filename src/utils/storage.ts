
export interface LocalStorageData {
	favouriteToken?: string;
	selectedToken?: string;
}

export async function setSelectedToken(token: string): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ selectedToken: token }, () => {
			resolve();
		});
	});
}
export async function getSelectedToken(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['selectedToken'], (res: LocalStorageData) => {
			resolve(res.selectedToken);
		});
	});
}

export async function setFavouriteToken(token: string): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ favouriteToken: token }, () => {
			resolve();
		});
	});
}
export async function getStoredFavouriteToken(): Promise<string> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['favouriteToken'], (res: LocalStorageData) => {
			resolve(res.favouriteToken);
		});
	});
}