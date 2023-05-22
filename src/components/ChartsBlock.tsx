import React, {CSSProperties } from 'react';
import colors from "../static/colors";

import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    Tooltip,
    Label,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import {IPriceHistoryData} from "../models/ICoinInfo";
import {amountFormatter} from "../utils/amountFormatter";

interface ChartsBlockProps {
    priceHistorydata: IPriceHistoryData; // Ideally, you should use a specific type for the data instead of 'any'
}

const ChartsBlock: React.FC<ChartsBlockProps> = ( {priceHistorydata} ) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 330,
            height: 160,
        },
    };


    console.log("priceHistorydata1: ", priceHistorydata)

    // add all previous day-candle close data
    let chartData = []
    for (let i = 0; i < priceHistorydata.prices.length - 1; i++) {
        const unixPriceArray = priceHistorydata.prices[i];
        const unixVolumeArray = priceHistorydata.total_volumes[i];
        const date = new Date(unixPriceArray[0] - 86400000);
        chartData.push({
            date: date,
            price: unixPriceArray[1],
            totalVolume: unixVolumeArray[1],
        });
    }
    // add today's current volume/price
    const unixPriceArray = priceHistorydata.prices[chartData.length];
    const unixVolumeArray = priceHistorydata.total_volumes[chartData.length];
    const date = new Date(unixPriceArray[0]);

    chartData.push({
        date: date,
        price: unixPriceArray[1],
        totalVolume: unixVolumeArray[1],
    });



    console.log("chartData1: ", chartData)
    // Calculate the min and maximum price and volume value
    let minPrice = Math.min(...chartData.map(dateData => dateData.price));
    let maxPrice = Math.max(...chartData.map(dateData => dateData.price));
    let maxVolume = Math.max(...chartData.map(dateData => dateData.totalVolume));

    // let maxFormattedPrice = (maxPrice - minPrice) / (maxPrice - minPrice) * 0.5
    let maxFormattedPrice = 0.5
    const barHeightMultiplier = maxVolume / maxFormattedPrice;

    // Add extraKey to each object for chart format
    chartData = chartData.map(dateData => ({
        ...dateData,
        chartFormatPrice: (dateData.price - minPrice) / (maxPrice - minPrice) * 0.8 + 0.3,
        chartFormatVolume: dateData.totalVolume / barHeightMultiplier,
    }));


    const CustomTooltip = props => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
            const date = payload[1].payload.date;
            const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
            const price = amountFormatter(payload[1].payload.price)
            const volume = amountFormatter(payload[1].payload.totalVolume)

            return (
                <div
                    style={{
                        background: colors.primary_dark,
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '10px',
                        fontSize: '14px',
                    }}
                >
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`${formattedDate}`}</p>
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`$${price}`}</p>
                    <p style={{ margin: 0 }}>{`$${volume} / 24h `}</p>
                </div>
            );
        }
        return null;
    };

    const CustomBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill=  date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark

        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} />
        );
    };

    return (
        <div style={styles.container}>
            <ResponsiveContainer width="100%" height="100%" >
                <ComposedChart
                    data={chartData}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                >

                    <defs>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.5" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

                    <Line type="monotone"
                          strokeWidth={2}
                          dataKey="chartFormatPrice"
                          stroke={colors.secondary_medium}
                          filter="url(#shadow)"
                          dot={false}
                    />



                    <ReferenceLine
                        y={Math.max(...chartData.map(dateData => dateData.chartFormatPrice))}
                        stroke={colors.primary_dark}
                        // fill={colors.white_medium}
                        strokeDasharray="0 36 9 0"
                        style={{ display: 'none' }}
                    >
                        <Label
                            value={`$${amountFormatter(Math.max(...chartData.map(dateData => dateData.price)))}`}
                            position="insideTopLeft"
                            fill={colors.secondary_light}
                            // fill={colors.white_medium}
                        />
                    </ReferenceLine>
                    <ReferenceLine
                        y={Math.min(...chartData.map(dateData => dateData.chartFormatPrice))}
                        stroke={colors.primary_dark}
                        // fill={colors.white_medium}
                        strokeDasharray="0 36 9 0"
                        style={{ display: 'none' }}
                    >
                        <Label
                            value={`$${amountFormatter(Math.min(...chartData.map(dateData => dateData.price)))}`}
                            position="insideBottomLeft"
                            fill={colors.secondary_light}
                            // fill={colors.white_medium}
                        />
                    </ReferenceLine>

                    <Bar
                        dataKey="chartFormatVolume"
                        shape={<CustomBar />}
                    />

                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => {
                            if (date.getDay() === 1) { // Show only Monday dates
                                return date.toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    timeZone: 'UTC'
                                }).replace(/\b0(?=\d)/g, '');
                            }
                            return '';
                        }}
                        interval={0}
                        height={28}
                        axisLine={{ stroke: 'none' }}
                        tickLine={{ stroke: 'none' }}
                        tick={{ fontSize: 12, fill: 'white' }}
                        tickMargin={2}
                        padding={{ left: 9, right: 9 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

 export default ChartsBlock;