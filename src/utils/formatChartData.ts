export const formatChartData = (priceHistoryData) => {
  delete priceHistoryData.market_caps;

  if (priceHistoryData.prices.length > 300) {
    priceHistoryData.prices = downsampling(priceHistoryData.prices, 300);
    priceHistoryData.total_volumes = downsampling(
      priceHistoryData.total_volumes,
      300,
    );
  }
  // add all previous day-candle close data
  let formattedChartData: any = [];
  for (let i = 0; i < priceHistoryData.prices.length - 1; i++) {
    const unixPriceArray = priceHistoryData.prices[i];
    const unixVolumeArray = priceHistoryData.total_volumes[i];
    const date = new Date(unixPriceArray[0] - 86400000);
    formattedChartData.push({
      date: date,
      price: unixPriceArray[1],
      totalVolume: unixVolumeArray[1],
    });
  }
  // add today's current volume/price
  const unixPriceArray = priceHistoryData.prices[formattedChartData.length];
  const unixVolumeArray =
    priceHistoryData.total_volumes[formattedChartData.length];
  const date = new Date(unixPriceArray[0]);
  formattedChartData.push({
    date: date,
    price: unixPriceArray[1],
    totalVolume: unixVolumeArray[1],
  });

  // Calculate the min and maximum price and volume value
  let minPrice = Math.min(
    ...formattedChartData.map((dateData) => dateData.price),
  );
  let maxPrice = Math.max(
    ...formattedChartData.map((dateData) => dateData.price),
  );
  let maxVolume = Math.max(
    ...formattedChartData.map((dateData) => dateData.totalVolume),
  );

  // let maxFormattedPrice = (maxPrice - minPrice) / (maxPrice - minPrice) * 0.5
  let maxFormattedPrice = 0.5;
  const barHeightMultiplier = maxVolume / maxFormattedPrice;

  // Add extraKey to each object for chart format
  formattedChartData = formattedChartData.map((dateData) => ({
    ...dateData,
    chartFormatPrice:
      ((dateData.price - minPrice) / (maxPrice - minPrice)) * 0.8 + 0.3,
    chartFormatVolume: dateData.totalVolume / barHeightMultiplier,
  }));
  return formattedChartData;
};

function downsampling(originalArray, maxDataPoints) {
  const decimationFactor =
    Math.floor(originalArray.length / maxDataPoints) || 1;
  const newArray = [];

  for (let i = 0; i < originalArray.length; i += decimationFactor) {
    const chunk = originalArray.slice(i, i + decimationFactor);
    const averagedObject = {};

    for (let key in chunk[0]) {
      if (chunk[0].hasOwnProperty(key)) {
        const values = chunk.map((obj) => obj[key]);
        averagedObject[key] =
          values.reduce((sum, value) => sum + value, 0) / values.length;
      }
    }
    newArray.push(averagedObject);
  }
  return newArray;
}
