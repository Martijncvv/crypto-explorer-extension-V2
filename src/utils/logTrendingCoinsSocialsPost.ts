import { ITrendingCoinList } from "../models/ICoinInfo";

export const logTrendingCoinsSocialsPost = (
  trendingCoins: ITrendingCoinList,
) => {
  let trendingTickers = "Top Searched Coins of the Day\n";
  trendingCoins.coins.forEach((coin) => {
    trendingTickers =
      trendingTickers +
      `- ${coin.item.name}, $${coin.item.symbol.toUpperCase()} #${
        coin.item.market_cap_rank
      }\n`;
  });
  trendingTickers =
    trendingTickers +
    "\nCrypto Explorer Extension\n" +
    "https://chrome.google.com/webstore/detail/crypto-tracker-blockchain/pkaheoacmbdgnemgmcdbekniooabcnmc?hl=en&authuser=0";
  trendingTickers = trendingTickers + "\n#BTC $ETH";

  console.log(trendingTickers);
};
