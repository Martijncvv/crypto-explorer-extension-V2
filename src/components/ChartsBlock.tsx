import React, {CSSProperties, useEffect, useState} from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

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
    price30dHistorydata: IPriceHistoryData; // Ideally, you should use a specific type for the data instead of 'any'
    priceMaxHistorydata: IPriceHistoryData; // Ideally, you should use a specific type for the data instead of 'any'
}

const ChartsBlock: React.FC<ChartsBlockProps> = ( {price30dHistorydata, priceMaxHistorydata} ) => {
    const [chartOption, setChartOption] = useState<number>(1)
    // 30d HISTORY = 1
    // max HISTORY = 2
    const [formattedChartData, setFormattedChartData] = useState<any>([]);

    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 330,
            height: 160,
        },
        menuOptions: {
            display: 'flex',
            justifyContent: 'center',
        },
        menuOption: {
            width: 40,
            height: 2,
            marginRight: '9px',
            cursor: 'pointer',
            backgroundColor: colors.primary_medium
        },
        activeOption: {
            width: 40,
            height: 2,
            marginRight: '9px',
            cursor: 'pointer',
            backgroundColor: colors.secondary_medium
        },
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setChartOption(2)
            } else if (event.key === 'ArrowLeft') {
                setChartOption(1)
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (chartOption === 2) {
            setFormattedChartData(priceMaxHistorydata)
        } else {
            setFormattedChartData(price30dHistorydata)
        }
    }, [chartOption, price30dHistorydata]);



    const CustomTooltip = props => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
            const date = payload[1]?.payload.date;
            const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
            const price = amountFormatter(payload[1].payload.price)
            const volume = amountFormatter(payload[1].payload.totalVolume)

            return (
                <div
                    style={{
                        background: colors.primary_dark,
                        border: 'none',
                        borderRadius: constants.border_radius_small,
                        color: '#fff',
                        padding: '10px',
                        fontSize: '14px',
                    }}
                >
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`${formattedDate}`}</p>
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`$${price}`}</p>
                    {volume && <p style={{ margin: 0 }}>{`$${volume} / 24h `}</p>}
                </div>
            );
        }
        return null;
    };

    const CustomBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill=  chartOption === 1 && date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark

        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} />
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.menuOptions}>
                <div
                    onClick={() => setChartOption(1)}
                    style={chartOption === 1 ? styles.activeOption : styles.menuOption}
                />
                <div
                    onClick={() => setChartOption(2)}
                    style={chartOption === 2 ? styles.activeOption : styles.menuOption}
                />
            </div>
            <ResponsiveContainer width="100%" height="100%" >
                    <ComposedChart
                        data={formattedChartData}
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

                        <Bar
                            dataKey="chartFormatVolume"
                            shape={<CustomBar />}
                        />

                        <ReferenceLine
                            y={Math.max(...formattedChartData.map(dateData => dateData.chartFormatPrice))}
                            stroke={colors.primary_dark}
                            // fill={colors.white_medium}
                            strokeDasharray="0 36 9 0"
                            style={{ display: 'none' }}
                        >
                            <Label
                                value={`$${amountFormatter(Math.max(...formattedChartData.map(dateData => dateData.price)))}`}
                                position="insideTopLeft"
                                fill={colors.secondary_light}
                                // fill={colors.white_medium}
                            />
                        </ReferenceLine>
                        <ReferenceLine
                            y={Math.min(...formattedChartData.map(dateData => dateData.chartFormatPrice))}
                            stroke={colors.primary_dark}
                            // fill={colors.white_medium}
                            strokeDasharray="0 36 9 0"
                            style={{ display: 'none' }}
                        >
                            <Label
                                value={`$${amountFormatter(Math.min(...formattedChartData.map(dateData => dateData.price)))}`}
                                position="insideBottomLeft"
                                fill={colors.secondary_light}
                                // fill={colors.white_medium}
                            />
                        </ReferenceLine>

                        <XAxis
                            padding={{ left: chartOption === 2 ? 24 : 12, right: 12 }}
                            dataKey="date"
                            tickFormatter={(date, index) => {
                                if (chartOption === 1 && date.getDay() === 1) {
                                    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
                                }
                                if (chartOption === 2) {
                                    const totalDataPoints = formattedChartData.length;
                                    const desiredTickCount = 5;
                                    const interval = Math.ceil(totalDataPoints / desiredTickCount);

                                    if (index  % interval === 0 && index !== totalDataPoints - 1) {
                                        return date.toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' });
                                    }
                                }
                                return '';
                            }}
                            interval={0}
                            height={28}
                            axisLine={{ stroke: 'none' }}
                            tickLine={{ stroke: 'none' }}
                            tick={{ fontSize: 12, fill: 'white' }}
                            tickMargin={2}
                        />
                    </ComposedChart>

            </ResponsiveContainer>
        </div>
    );
}

 export default ChartsBlock;