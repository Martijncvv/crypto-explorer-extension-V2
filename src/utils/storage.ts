import { ICoinGeckoCoinList, ISimpleCoinInfo } from '../models/ICoinInfo'
import { ICoinGeckoNftList, ISimpleNftInfo } from '../models/INftInfo'

export interface LocalStorageData {
	coins?: ICoinGeckoCoinList;
	coinIds?: ISimpleCoinInfo[];
	nfts?: ICoinGeckoNftList;
	nftIds?: ISimpleNftInfo[];
}


export async function setStoredCoinList(coins: ICoinGeckoCoinList): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ coins }, resolve);
	});
}

export async function getStoredCoinList(): Promise<ICoinGeckoCoinList> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['coins'], (res: LocalStorageData) => {
			resolve(res.coins ?? []);
		});
	});
}

export async function setStoredCoins(coinIds: ISimpleCoinInfo[]): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ coinIds }, resolve);
	});
}

export async function getStoredCoins(): Promise<ISimpleCoinInfo[]> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['coinIds'], (res: LocalStorageData) => {
			resolve(res.coinIds ?? []);
		});
	});
}

// NFTs
export async function setStoredNftList(nfts: ICoinGeckoNftList): Promise<void> {
	return new Promise((resolve) => {
		chrome.storage.local.set({ nfts }, resolve);
	});
}

export async function getStoredNftList(): Promise<ICoinGeckoNftList> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['nfts'], (res: LocalStorageData) => {
			resolve(res.nfts ?? []);
		});
	});
}