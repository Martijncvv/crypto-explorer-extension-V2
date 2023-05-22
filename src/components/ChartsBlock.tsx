import React, {PureComponent, CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
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
            // backgroundColor: 'white', // Or any other background color
        },
    };

    let chartData = []
    for (let i = 0; i < priceHistorydata.prices.length; i++) {
        const unixPriceArray = priceHistorydata.prices[i];
        const unixVolumeArray = priceHistorydata.total_volumes[i];
        const date = new Date(unixPriceArray[0]);
        date.setHours(0, 0, 0, 0);
        chartData.push({
            date: date,
            price: unixPriceArray[1],
            totalVolume: unixVolumeArray[1],
        });
    }

    // Calculate the maximum price and volume value
    let maxPrice = Math.max(...chartData.map(dateData => dateData.price));
    let maxVolume = Math.max(...chartData.map(dateData => dateData.totalVolume));

    const barHeightMultiplier = (maxVolume / maxPrice) * 2.1;

    // Add extraKey to each object for chart format
    chartData = chartData.map(dateData => ({
        ...dateData,
        chartFormatVolume: dateData.totalVolume / barHeightMultiplier
    }));


    const CustomTooltip = props => {
        const { active, payload } = props;
        console.log(payload)
        if (active && payload && payload.length) {
            const date = payload[1].payload.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
            const price = amountFormatter(payload[1].payload.price)
            const volume = amountFormatter(payload[1].payload.totalVolume)

            return (
                <div
                    style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '10px',
                        fontSize: '14px',
                    }}
                >
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`${date}`}</p>
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`$${price}`}</p>
                    <p style={{ margin: 0 }}>{`${volume} / 24h `}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div style={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
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
                    <Bar dataKey="chartFormatVolume" fill="rgba(64, 73, 130, 0.8)" />
                    <Line type="monotone"
                          strokeWidth={2}
                          dataKey="price"
                          stroke="#6C74E4"
                          filter="url(#shadow)"
                          dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

 export default ChartsBlock;