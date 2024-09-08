import { fetchTrendingCoins } from "./api";
import { ISearchOptions } from "../models/ICoinInfo";
import { logTrendingCoinsSocialsPost } from "../utils/logTrendingCoinsSocialsPost";

export const getTrendingCoins = async () => {
  try {
    const trendingCoins = await fetchTrendingCoins();
    let searchFormat: ISearchOptions = { tokens: [], total: 0 };
    searchFormat.tokens.push({
      id: "",
      name: `Top Trending`,
      image: "",
      marketCapRank: "",
      nft: true,
    });
    trendingCoins.coins.forEach((coin) => {
      searchFormat.tokens.push({
        id: coin.item.id,
        name: coin.item.name,
        image: coin.item.small,
        marketCapRank: coin.item.market_cap_rank,
        nft: false,
      });
    });

    logTrendingCoinsSocialsPost(trendingCoins);
    return searchFormat;
  } catch (error) {
    console.error("getTrendingCoins: Error fetching trending coins:", error);
  }
};
