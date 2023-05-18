import { ICoinGeckoCoinList, ISimpleCoinInfo } from '../models/ICoinInfo'
import { ICoinGeckoNftList, ISimpleNftInfo } from '../models/INftInfo'

export interface LocalStorageData {
	coins?: ICoinGeckoCoinList;
	coinIds?: ISimpleCoinInfo[];
	nfts?: ICoinGeckoNftList;
	nftIds?: ISimpleNftInfo[];
}

// settings storage


export async function getStoredNftList(): Promise<ICoinGeckoNftList> {
	return new Promise((resolve) => {
		chrome.storage.local.get(['nfts'], (res: LocalStorageData) => {
			resolve(res.nfts ?? []);
		});
	});
}