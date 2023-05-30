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
import {amountFormatter, numberFormatter} from "../utils/amountFormatter";

interface ChartsBlockProps {
    price30dHistorydata?: any;
    priceMaxHistorydata?: any;
    txVolumeData?: any;
    tokenTxsChartData?: any
}

const ChartsBlock: React.FC<ChartsBlockProps> = ( {price30dHistorydata, priceMaxHistorydata, txVolumeData, tokenTxsChartData} ) => {
    let availableCharts = []
    if (price30dHistorydata) {
        availableCharts.push('price30dHistorydata')
    }
    if (priceMaxHistorydata) {
        availableCharts.push('priceMaxHistorydata')
    }
    if (txVolumeData) {
        availableCharts.push('txVolumeData')
    }
    if (tokenTxsChartData) {
        availableCharts.push('tokenTxsChartData')
    }
    const chartOptionCount = availableCharts.length;
    const [chartOption, setChartOption] = useState<number>(0)

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
                if (chartOption < chartOptionCount - 1) {
                    setChartOption((prevOption) => prevOption + 1);
                }
            } else if (event.key === 'ArrowLeft') {
                if (chartOption > 0) {
                    setChartOption((prevOption) => prevOption - 1);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [chartOptionCount, chartOption]);

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
    const CustomOnchainVolumeTooltip = props => {
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
    const CustomOnchainTxsTooltip = props => {
        const { active, payload } = props;

        if (active && payload && payload.length) {

            const date = payload[0]?.payload.date;
            const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
            const amount = payload[0].payload.amount
            const usdValue = payload[0].payload.usdValue
            const native = payload[0].payload.native;

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
                    <p style={{ margin: 0, marginBottom: '6px',}}>{`${numberFormatter(amount)}`}</p>
                    <p style={{ margin: 0, marginBottom: '6px' }}>{`$${amountFormatter(usdValue)}`}</p>
                    <p style={{ margin: 0, marginBottom: '3px', color: colors.accent_medium, textTransform: 'capitalize'  }}>{`Top 50/ 10k ${native} txs`}</p>
                </div>
            );
        }
        return null;
    };

    const CustomPriceBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill=  chartOption === 1 && date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark

        const yString = isNaN(y) ? "0" : y.toString();
        return (
            <rect x={x} y={yString} width={width} height={height} fill={fill} />
        );
    };
    const CustomOnchainVolumeBar = (props) => {
        const { x, y, width, height, date } = props;
        let fill= date.getDay() === 1 ? colors.secondary_dark : colors.primary_dark
        const yString = isNaN(y) ? "0" : y.toString();
        return (
            <rect x={x} y={yString} width={width} height={height} fill={fill} />
        );
    };
    const CustomOnchainTxsBar = (props) => {
        const { x, y, width, height } = props;
        let fill= colors.primary_dark
        const yString = isNaN(y) ? "0" : y.toString();
        return (
            <rect x={x} y={yString} width={width} height={height} fill={fill} />
        );
    };

    const handleTokenTxsBarClick = (event) => {
        chrome.tabs.create({
            url: event.explorerUrl,
            active: false,
        })
    }

    return (
        <div style={styles.container} title="Use arrow keys to navigate">
            {availableCharts.length === 0 && (
                <div style={styles.emptyChartMessage}>
                    Data not (yet) available</div>
            )}
            {availableCharts.length > 0 &&
                <div style={styles.menuOptions}>
                    {
                        Array.from({ length: chartOptionCount }, (_, index) => index).map((option) => (
                            <div
                                key={option}
                                onClick={() => setChartOption(option)}
                                style={chartOption === option ? styles.activeOption : styles.menuOption}
                            />
                        ))
                    }
                </div>
            }
            {( (availableCharts[chartOption] === "price30dHistorydata") || (availableCharts[chartOption] === "priceMaxHistorydata")) &&
                <ResponsiveContainer width="100%" height="100%" >
                        <ComposedChart
                            data={availableCharts[chartOption] === "price30dHistorydata" ? price30dHistorydata : priceMaxHistorydata}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            <XAxis
                                padding={{ left: chartOption === 2 ? 24 : 12, right: 12 }}
                                dataKey="date"
                                tickFormatter={(date, index) => {
                                    if (availableCharts[chartOption] === "price30dHistorydata" && price30dHistorydata.length > 40 ) {
                                        return '';
                                    }
                                    if (availableCharts[chartOption] === "price30dHistorydata"  && date.getDay() === 1) {
                                        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
                                    }
                                    if (availableCharts[chartOption] === "priceMaxHistorydata" ) {
                                        const totalDataPoints = priceMaxHistorydata.length;
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
                                y={(availableCharts[chartOption] === "price30dHistorydata") ? Math.max(...price30dHistorydata.map(dateData => dateData.chartFormatPrice)) :  Math.max(...priceMaxHistorydata.map(dateData => dateData.chartFormatPrice))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                                style={{ display: 'none' }}
                            >
                                <Label
                                    value={`$${amountFormatter((availableCharts[chartOption] === "price30dHistorydata") ? Math.max(...price30dHistorydata.map(dateData => dateData.price)) : Math.max(...priceMaxHistorydata.map(dateData => dateData.price)))}`}
                                    position="insideTopLeft"
                                    fill={colors.secondary_light}
                                />
                            </ReferenceLine>
                            <ReferenceLine
                                y={(availableCharts[chartOption] === "price30dHistorydata") ? Math.min(...price30dHistorydata.map(dateData => dateData.chartFormatPrice)) : Math.min(...priceMaxHistorydata.map(dateData => dateData.chartFormatPrice))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                                style={{ display: 'none' }}
                            >
                                <Label
                                    value={`$${amountFormatter((availableCharts[chartOption] === "price30dHistorydata") ? Math.min(...price30dHistorydata.map(dateData => dateData.price)) : Math.min(...priceMaxHistorydata.map(dateData => dateData.price)) )}`}
                                    position="insideBottomLeft"
                                    fill={colors.secondary_light}
                                />
                            </ReferenceLine>
                        </ComposedChart>
                </ResponsiveContainer>
            }
            {(availableCharts[chartOption] === "txVolumeData") &&
                <ResponsiveContainer width="100%" height="100%" >
                        <ComposedChart
                            data={txVolumeData}
                            margin={{ top: 12, left: 24, right: 0, bottom: 0 }}
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

                            <Tooltip content={<CustomOnchainVolumeTooltip />} cursor={{ fill: 'transparent' }} />

                            <Bar
                                dataKey="volume"
                                shape={<CustomOnchainVolumeBar />}
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
            {(availableCharts[chartOption] === "tokenTxsChartData") &&
                <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={tokenTxsChartData}
                            margin={{ top: 14, left: 24, right: 0, bottom: 0 }}
                            style={{ cursor: 'pointer' }}
                        >

                            <XAxis
                                padding={{ left: 12, right: 12 }}
                                dataKey="date"
                                tickFormatter={(date, index) => {
                                    const totalDataPoints = tokenTxsChartData.length;
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

                            <Tooltip content={<CustomOnchainTxsTooltip />} cursor={{ fill: 'transparent' }} />

                            <Bar
                                dataKey="usdValue"
                                shape={<CustomOnchainTxsBar />}
                                onClick={(event) => handleTokenTxsBarClick(event)}
                            />

                            <ReferenceLine
                                y={Math.max(...tokenTxsChartData.map(dateData => dateData.usdValue))}
                                stroke={colors.primary_dark}
                                strokeDasharray="0 36 9 0"
                            >
                                <Label
                                    value={`$${amountFormatter(Math.max(...tokenTxsChartData.map(dateData => dateData.usdValue)))}`}
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