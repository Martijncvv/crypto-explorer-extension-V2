import { ISearchCoinList, ISearchOptions } from "../models/ICoinInfo";
import { fetchNameSearch } from "./api";
import { getSearchResultNftAmountStorage } from "../utils/storage";

export const searchCoinName = async (searchInput: string) => {
  try {
    const searchResults: ISearchCoinList = await fetchNameSearch(searchInput);
    if (searchResults.coins.length === 0 && searchResults.nfts.length === 0) {
      return {
        tokens: [
          {
            id: "noResult",
            name: "No results",
            image:
              "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            marketCapRank: "",
            nft: false,
          },
        ],
        total: 0,
      };
    }
    const nrOfNfts = (await getSearchResultNftAmountStorage()) || 3;
    let displayNrOfNfts: number = Math.min(searchResults.nfts.length, nrOfNfts);
    let displayNrOfCoins: number = 13 - displayNrOfNfts;

    let searchFormat: ISearchOptions = { tokens: [], total: 0 };
    // SET COINS
    searchResults.coins.slice(0, displayNrOfCoins).forEach((coin) => {
      searchFormat.tokens.push({
        id: coin.id,
        name: coin.name,
        image: coin.large,
        marketCapRank: coin.market_cap_rank,
        nft: false,
      });
    });
    // SET NFTs
    searchResults.nfts.slice(0, displayNrOfNfts).forEach((nft) => {
      searchFormat.tokens.push({
        id: nft.id,
        name: nft.name,
        image: nft.thumb,
        marketCapRank: "NFT",
        nft: true,
      });
    });
    searchFormat.total = searchResults.coins.length + searchResults.nfts.length;
    if (searchFormat.total > 13) {
      searchFormat.tokens.push({
        id: "",
        name: `${searchFormat.total - 13} others`,
        image: "",
        marketCapRank: "",
        nft: true,
      });
    }
    return searchFormat;
  } catch (error) {
    console.error("handleSearch: Error searching for coins:", error);
    return {
      tokens: [
        {
          id: "noResult",
          name: "No results",
          image:
            "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
          marketCapRank: "",
          nft: false,
        },
      ],
      total: 0,
    };
  }
};
