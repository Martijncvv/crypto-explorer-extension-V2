import { ICoinGeckoCoinList, ISimpleCoinInfo } from '../models/ICoinInfo'
import { ICoinGeckoNftList, ISimpleNftInfo } from '../models/INftInfo'

export interface LocalStorage {
	coins?: ICoinGeckoCoinList
	coinIds?: ISimpleCoinInfo[]
	nfts?: ICoinGeckoNftList
	nftIds?: ISimpleNftInfo[]
	darkmodeChecked?: boolean
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCoinList(coins: ICoinGeckoCoinList): Promise<void> {
	const vals: LocalStorage = {
		coins,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoinList(): Promise<ICoinGeckoCoinList> {
	const keys: LocalStorageKeys[] = ['coins']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coins ?? [])
		})
	})
}

export function setStoredCoins(coinIds: ISimpleCoinInfo[]): Promise<void> {
	const vals: LocalStorage = {
		coinIds,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredCoins(): Promise<ISimpleCoinInfo[]> {
	const keys: LocalStorageKeys[] = ['coinIds']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.coinIds ?? [])
		})
	})
}
///////////////////////////
///////////////////////////
export function setStoredNftList(nfts: ICoinGeckoNftList): Promise<void> {
	const vals: LocalStorage = {
		nfts,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}

export function getStoredNftList(): Promise<ICoinGeckoNftList> {
	const keys: LocalStorageKeys[] = ['nfts']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.nfts ?? [])
		})
	})
}

export function setDarkmode(darkmodeChecked: boolean): Promise<void> {
	const vals: LocalStorage = {
		darkmodeChecked,
	}

	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve()
		})
	})
}
export function getDarkmode(): Promise<boolean> {
	const keys: LocalStorageKeys[] = ['darkmodeChecked']
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: LocalStorage) => {
			resolve(res.darkmodeChecked)
		})
	})
}
