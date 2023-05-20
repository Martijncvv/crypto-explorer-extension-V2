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
import {IPriceData} from "../models/ICoinInfo";

interface ChartsBlockProps {
    pricedata: IPriceData; // Ideally, you should use a specific type for the data instead of 'any'
}

const ChartsBlock: React.FC<ChartsBlockProps> = ( pricedata ) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 330,
            height: 160,
            // backgroundColor: 'white', // Or any other background color
        },
    };

    // TODO format, price data

    console.log("pricedata1: ", pricedata)

    let data = [
        {
            name: 'Page A',
            price: 1.80,
            volume: 80000,
        },
        {
            name: 'Page B',
            price: 1.60,
            volume: 96007,
        },
        {
            name: 'Page C',
            price: 1.30,
            volume: 10098,
        },
        {
            name: 'Page D',
            price: 1.90,
            volume: 12000,
        },
        {
            name: 'Page E',
            price: 2.60,
            volume: 11008,
        },
        {
            name: 'Page F',
            price: 2.40,
            volume: 14000,
        },
        {
            name: 'Page G',
            price: 1.20,
            volume: 23459,
        },
        {
            name: 'Page H',
            price: 0.40,
            volume: 6000,
        },
        {
            name: 'Page I',
            price: 1.20,
            volume: 98999,
        },
        {
            name: 'Page J',
            price: 1.70,
            volume: 38999,
        },
    ];

    for (let i = 0; i < 31; i++) {
        const index = i % data.length;
        const page = {
            name: `Page ${String.fromCharCode(65 + index)}`,
            price: data[index].price,
            volume: data[index].volume,
        };
        data.push(page);
    }

    // Calculate the maximum price and volume value
    let maxPrice = Math.max(...data.map(obj => obj.price));
    let maxVolume = Math.max(...data.map(obj => obj.volume));

    const barHeightMultiplier = (maxVolume / maxPrice) * 2.1;

    // Add extraKey to each object as the volume divided by valueX
    data = data.map(obj => ({
        ...obj,
        volumeChartFormat: obj.volume / barHeightMultiplier
    }));

    return (
        <div style={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
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
                    <Tooltip />
                    <Bar dataKey="volumeChartFormat" fill="rgba(64, 73, 130, 0.8)" />
                    <Line type="monotone" strokeWidth={2} dataKey="price" stroke="#6C74E4" filter="url(#shadow)" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

 export default ChartsBlock;