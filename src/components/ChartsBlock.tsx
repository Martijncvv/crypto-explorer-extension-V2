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
import {ITokenTxs} from "../models/ITokenTxs";
import {amountFormatter} from "../utils/amountFormatter";

interface ChartsBlockProps {
    price30dHistorydata?: IPriceHistoryData;
    priceMaxHistorydata?: IPriceHistoryData;
    txVolumeData?: any;
    tokenTxsChartData?: any
}

const ChartsBlock: React.FC<ChartsBlockProps> = ( {price30dHistorydata, priceMaxHistorydata, txVolumeData, tokenTxsChartData} ) => {
    const [chartOption, setChartOption] = useState<number>(1)
    const chartOptionCount = [price30dHistorydata, priceMaxHistorydata, txVolumeData].filter(Boolean).length;
    // 30d HISTORY = 1
    // max HISTORY = 2
    // txvolume = 3
    const [formattedPriceChartData, setFormattedPriceChartData] = useState<any>([]);

    console.log("txVolumeData44: ", txVolumeData)
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
        emptyChartMessage: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '16px',
            color: colors.primary_medium,
        },
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                if (chartOption < chartOptionCount) {
                    setChartOption((prevChartOption) => prevChartOption + 1);
                }
            } else if (event.key === 'ArrowLeft') {
                if (chartOption > 1) {
                    setChartOption((prevChartOption) => prevChartOption - 1);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [chartOption, chartOptionCount]);

    useEffect(() => {
        if (price30dHistorydata && !txVolumeData) {
            if (chartOption === 1) {
                setFormattedPriceChartData(price30dHistorydata)
            }
            else {
                setFormattedPriceChartData(priceMaxHistorydata)
            }
        }

        if (price30dHistorydata && txVolumeData) {
            if (chartOption === 1) {
                setFormattedPriceChartData(price30dHistorydata)
            }
            else if (chartOption === 2) {
                setFormattedPriceChartData(priceMaxHistorydata)
            }
        }

        if (txVolumeData && !price30dHistorydata) {
            setChartOption(3)
        }

    }, [chartOption, price30dHistorydata, txVolumeData]);



    const CustomPriceTooltip = props => {
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
    const CustomOnchainTooltip = props => {
        const { active, payload } = props;

        if (active && payload && payload.length) {

            const date = payload[0]?.payload.date;
            const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
            const volume = payload[0].payload.volume

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
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`${volume} txs`}</p>
                </div>
            );
        }
        return null;
    };

    const CustomPriceBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill=  chartOption === 1 && date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark

        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} />
        );
    };
    const CustomOnchainBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill= date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark

        return (
            <rect x={x} y={y} width={width} height={height} fill={fill} />
        );
    };
    return (
        <div style={styles.container}>
            {chartOptionCount === 0 && (
                <div style={styles.emptyChartMessage}>
                    No chart data available</div>
            )}
            {chartOptionCount > 1 &&
                <div style={styles.menuOptions}>
                    {
                        Array.from({ length: chartOptionCount }, (_, index) => index + 1).map((option) => (
                            <div
                                key={option}
                                onClick={() => setChartOption(option)}
                                style={chartOption === option ? styles.activeOption : styles.menuOption}
                            />
                        ))
                    }
                </div>
            }
            {(chartOption === 1 || chartOption === 2) &&
                <ResponsiveContainer width="100%" height="100%" >
                        <ComposedChart
                            data={formattedPriceChartData}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            <XAxis
                                padding={{ left: chartOption === 2 ? 24 : 12, right: 12 }}
                                dataKey="date"
                                tickFormatter={(date, index) => {
                                    if (chartOption === 1 && formattedPriceChartData.length > 40 ) {
                                        return '';
                                    }
                                    if (chartOption === 1 && date.getDay() === 1) {
                                        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
                                    }
                                    if (chartOption === 2) {
                                        const totalDataPoints = formattedPriceChartData.length;
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

                            <Tooltip content={<CustomPriceTooltip />} cursor={{ fill: 'transparent' }} />

                            <Line type="monotone"
                                  strokeWidth={2}
                                  dataKey="chartFormatPrice"
                                  stroke={colors.secondary_medium}
                                  filter="url(#shadow)"
                                  dot={false}
                            />

                            <Bar
                                dataKey="chartFormatVolume"
                                shape={<CustomPriceBar />}
                            />

                            <ReferenceLine
                                y={Math.max(...formattedPriceChartData.map(dateData => dateData.chartFormatPrice))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                                style={{ display: 'none' }}
                            >
                                <Label
                                    value={`$${amountFormatter(Math.max(...formattedPriceChartData.map(dateData => dateData.price)))}`}
                                    position="insideTopLeft"
                                    fill={colors.secondary_light}
                                />
                            </ReferenceLine>
                            <ReferenceLine
                                y={Math.min(...formattedPriceChartData.map(dateData => dateData.chartFormatPrice))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                                style={{ display: 'none' }}
                            >
                                <Label
                                    value={`$${amountFormatter(Math.min(...formattedPriceChartData.map(dateData => dateData.price)))}`}
                                    position="insideBottomLeft"
                                    fill={colors.secondary_light}
                                />
                            </ReferenceLine>
                        </ComposedChart>
                </ResponsiveContainer>
            }
            {(chartOption === 3) &&
                <ResponsiveContainer width="100%" height="100%" >
                        <ComposedChart
                            data={txVolumeData}
                            margin={{ top: 6, left: 24, right: 0, bottom: 0 }}
                        >

                            <XAxis
                                padding={{ left: 12, right: 12 }}
                                dataKey="date"
                                tickFormatter={(date, index) => {
                                    const totalDataPoints = txVolumeData.length;
                                    const desiredTickCount = 5;
                                    const interval = Math.ceil(totalDataPoints / desiredTickCount);

                                    if (index % interval === 0 && index !== totalDataPoints - 1) {
                                        return date.toLocaleDateString('en-GB', {
                                            month: '2-digit',
                                            year: '2-digit'
                                        });
                                    } else {
                                        return ''
                                    }
                                }}
                                interval={0}
                                height={28}
                                axisLine={{ stroke: 'none' }}
                                tickLine={{ stroke: 'none' }}
                                tick={{ fontSize: 12, fill: 'white' }}
                                tickMargin={2}
                            />

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

                            <Tooltip content={<CustomOnchainTooltip />} cursor={{ fill: 'transparent' }} />

                            <Bar
                                dataKey="volume"
                                shape={<CustomOnchainBar />}
                            />

                            <ReferenceLine
                                y={Math.max(...txVolumeData.map(dateData => dateData.volume))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                            >
                                <Label
                                    value={`${Math.max(...txVolumeData.map(dateData => dateData.volume))}`}
                                    position="insideBottomLeft"
                                    fill={colors.secondary_light}
                                />
                            </ReferenceLine>


                        </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    );
}

 export default ChartsBlock;