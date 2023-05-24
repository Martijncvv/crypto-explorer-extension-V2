import React, { CSSProperties, useState, useEffect, useRef } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import {
    fetchCoinInfo,
    fetchPriceHistoryData,
    fetchNameSearch,
    fetchTrendingCoins,
    fetchNftTxs,
    fetchNftInfo
} from "../utils/api";
import {
    IDetailedCoinInfo,
    IPriceHistoryData,
    ISearchCoinList,
    ISearchOptions,
    ITrendingCoinList
} from "../models/ICoinInfo";
import {IDetailedNftInfo} from "../models/INftInfo";
import { ITokenTxs } from "../models/ITokenTxs";

const menuIcon = require( "../static/images/icons/menu-icon.png")
const searchIcon = require( "../static/images/icons/search-icon.png")
interface HeaderBlockProps {
    mainLogo: string;
    setCoinInfo: (coinInfo: IDetailedCoinInfo) => void;
    setNftInfo: (nftInfo: IDetailedNftInfo) => void;
    setPrice30dChartData: (priceChartData: IPriceHistoryData) => void;
    setPriceMaxChartData: (priceChartData: IPriceHistoryData) => void;
    setTxsData: (txsData: any) => void;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ mainLogo, setCoinInfo, setNftInfo, setPrice30dChartData, setPriceMaxChartData, setTxsData }) => {
    const searchResultsRef = useRef(null);
    const inputRef = useRef(null);

    const [searchInput, setSearchInput] = useState<string>('');
    const [displayResults, setDisplayResults] = useState<ISearchOptions>({tokens: [], total: 0});
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const styles: { [key: string]: CSSProperties } = {
        headerBlock: {
            display: 'flex',
            alignItems: 'center',
        },
        rectangle: {
            width: 40,
            height: 40,
            borderRadius: constants.border_radius,
            backgroundColor: colors.primary_dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        centeredImage: {
            width: 20,
            height: 20,
        },
        searchbar: {
            marginLeft: 12,
            width: 202,
            height: 40,
            borderRadius: constants.border_radius,
            backgroundColor: colors.primary_dark,

            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        searchbarImage: {
            width: 20,
            height: 20,
            marginLeft: 12,
        },
        searchInput: {
            marginLeft: 12,
            border: 'none',
            background: 'transparent',
            color: 'white',
            outline: 'none',
            width: '100%',
        },

        searchResults: {
            position: 'absolute',
            width: 202,
            marginLeft: 52,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            color: '#3381e8',

            background: 'linear-gradient(to bottom, #2F396D 0%, #3E6CB6 80%)',
            borderBottomLeftRadius: constants.border_radius,
            borderBottomRightRadius: constants.border_radius,
        },
        coinSearchInfo: {
            display: 'flex',
            padding: 9,
            cursor: "pointer",
        } as any,

        coinImage: {
            width: 22,
            height: 22,
            borderRadius: constants.border_radius_small,
        },

        exchangeName: {
            paddingLeft: 12,
            width: 100,
            color: colors.white_medium,
            fontSize: constants.font_medium,
            fontWeight: constants.font_weight_medium,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        marketCapRank: {
            paddingLeft: 6,
            width: 40,
            color: colors.accent_medium,
            fontSize: constants.font_small,
            fontWeight: constants.font_weight_medium,
        },
        mainLogo: {
            marginLeft: 12,
            width: 40,
            height: 40,
            borderRadius: constants.border_radius_small,
        },
    };

    // functionality for clicking outside of the search results block
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    // get detailed coin info and trending info on startup
    useEffect(() => {
        getTrendingCoins()
        fetchDetailedTokenInfo('bitcoin');
        // fetchDetailedNftInfo('bored-ape-yacht-club');
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
    }, []);

    // Close the expansion if the click is outside of the search results block
    const handleClickOutside = (event: MouseEvent) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
    };

    const getTrendingCoins = async () => {
        try {
            const trendingCoins: ITrendingCoinList = await fetchTrendingCoins();
            let searchFormat:ISearchOptions = {tokens: [], total: 0}
            trendingCoins.coins.forEach((coin) => {
                searchFormat.tokens.push(
                    {
                        id: coin.item.id,
                        name: coin.item.name,
                        image: coin.item.small,
                        marketCapRank: coin.item.market_cap_rank,
                        nft: false,
                    }
                )
            })
            setDisplayResults(searchFormat);
            return searchFormat
        } catch (error) {
            console.error("getTrendingCoins: Error fetching trending coins:", error);
        }
    }

    const searchCoinNames = async () => {
        try {
            const searchResults: ISearchCoinList = await fetchNameSearch(searchInput);
            if (searchResults.coins.length === 0 && searchResults.nfts.length === 0) {
                console.log("No results")
                setDisplayResults( {tokens: [{
                    id: "noResult",
                    name: "No results",
                    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
                    marketCapRank: '',
                    nft: false
                }], total: 0});
                setSearchInput("")
                return
            }

            let displayNrOfNfts: number = Math.min(searchResults.nfts.length, 3);
            let displayNrOfCoins: number = 11 - displayNrOfNfts

            // SET COINS
            let searchFormat:ISearchOptions = {tokens: [], total: 0}
            searchResults.coins.slice(0, displayNrOfCoins).forEach((coin) => {
                searchFormat.tokens.push(
                    {
                        id: coin.id,
                        name: coin.name,
                        image: coin.large,
                        marketCapRank: coin.market_cap_rank,
                        nft: false,
                    }
                )
            })
            // SET NFTs
            searchResults.nfts.slice(0, displayNrOfNfts).forEach((nft) => {
                searchFormat.tokens.push(
                    {
                        id: nft.id,
                        name: nft.name,
                        image: nft.thumb,
                        marketCapRank: 'NFT',
                        nft: true,
                    }
                )
            })
            searchFormat.total = searchResults.coins.length + searchResults.nfts.length
            if (searchFormat.total > 11) {
            searchFormat.tokens.push(
                {
                    id: '',
                    name: `${searchFormat.total - 11} others`,
                    image: '',
                    marketCapRank: '',
                    nft: true,
                }
            )
            }
            console.log("searchResults: ", searchResults)
            setDisplayResults(searchFormat);

        } catch (error) {
            console.error("handleSearch: Error searching for coins:", error);
            setDisplayResults( {tokens: [{
                    id: "noResult",
                    name: "No results",
                    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
                    marketCapRank: '',
                    nft: false
                }], total: 0});
            setSearchInput("")
        }
    }

    async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (searchInput.length > 0) {
                searchCoinNames();
                setIsExpanded(true);
            }
            else {
                setIsExpanded(false);
                getTrendingCoins()
            }
        }
    }
    async function handleFocus() {
        setIsExpanded(true);
    }

    const fetchDetailedTokenInfo = async (coinId: string) => {
        try {
            const [coinInfo, price30dHistoryData, priceMaxHistoryData] = await Promise.all([
                fetchCoinInfo(coinId),
                fetchPriceHistoryData(coinId, 'usd', '30'),
                fetchPriceHistoryData(coinId, 'usd', 'max'),
            ]);

            if (!coinInfo) {
                console.log(`No results for coinInfo ${coinId}`)
                return
            }
            if (!price30dHistoryData) {
                console.log(`No results for price30dHistoryData ${coinId}`)
                return
            }
            if (!priceMaxHistoryData) {
                console.log(`No results for priceMaxHistoryData ${coinId}`)
                return
            }

            setCoinInfo(coinInfo)
            setNftInfo(null)

            setPrice30dChartData(FormatChartData(price30dHistoryData)) // combine this in 1 fetch, last 30 days from the max
            setPriceMaxChartData(FormatChartData(priceMaxHistoryData))
        } catch (error) {
            console.error(`fetchDetailedTokenInfo: Error searching for coin: ${coinId}`, error);
        }
    }
    const fetchDetailedNftInfo = async (coinId: string) => {
        try {
            const [nftInfo] = await Promise.all([
                fetchNftInfo(coinId),
            ]);
            if (!nftInfo) {
                console.log(`No results for nftInfo ${coinId}`)
                return
            }
            console.log("nftInfo-header: ", nftInfo)

            // todo check if has contract
            const txData = await getTxData(nftInfo.asset_platform_id, nftInfo.contract_address)
            console.log("txData: ", txData)
            setNftInfo(nftInfo)
            setCoinInfo(null)
            setTxsData(txData)
            setPrice30dChartData(null)
            setPriceMaxChartData(null)
        } catch (error) {
            console.error(`fetchDetailedNftInfo: Error searching for coin: ${coinId}`, error);
            setNftInfo(null)
            setCoinInfo(null)
            setPrice30dChartData(null)
            setPriceMaxChartData(null)
        }
    }

    const FormatChartData = (priceHistoryData) => {
        delete priceHistoryData.market_caps;

        if (priceHistoryData.prices.length > 100 ) {
            priceHistoryData.prices = downsampling(priceHistoryData.prices, 300)
            priceHistoryData.total_volumes = downsampling(priceHistoryData.total_volumes, 300)
        }

        // add all previous day-candle close data
        let formattedChartData: any = []
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
        const unixVolumeArray = priceHistoryData.total_volumes[formattedChartData.length];
        const date = new Date(unixPriceArray[0]);

        formattedChartData.push({
            date: date,
            price: unixPriceArray[1],
            totalVolume: unixVolumeArray[1],
        });

        // Calculate the min and maximum price and volume value
        let minPrice = Math.min(...formattedChartData.map(dateData => dateData.price));
        let maxPrice = Math.max(...formattedChartData.map(dateData => dateData.price));
        let maxVolume = Math.max(...formattedChartData.map(dateData => dateData.totalVolume));

        // let maxFormattedPrice = (maxPrice - minPrice) / (maxPrice - minPrice) * 0.5
        let maxFormattedPrice = 0.5
        const barHeightMultiplier = maxVolume / maxFormattedPrice;

        // Add extraKey to each object for chart format
        formattedChartData = formattedChartData.map(dateData => ({
            ...dateData,
            chartFormatPrice: (dateData.price - minPrice) / (maxPrice - minPrice) * 0.8 + 0.3,
            chartFormatVolume: dateData.totalVolume / barHeightMultiplier,
        }));
        return formattedChartData
    }

    function downsampling(originalArray, maxDataPoints) {
        const decimationFactor = Math.floor(originalArray.length / maxDataPoints);
        const newArray = [];

        for (let i = 0; i < originalArray.length; i += decimationFactor) {
            const chunk = originalArray.slice(i, i + decimationFactor);
            const averagedObject = {};

            for (let key in chunk[0]) {
                if (chunk[0].hasOwnProperty(key)) {
                    const values = chunk.map(obj => obj[key]);
                    const averageValue = values.reduce((sum, value) => sum + value, 0) / values.length;
                    averagedObject[key] = averageValue;
                }
            }
            newArray.push(averagedObject);
        }
        return newArray;
    }

    const handleCoinOptionClick = async (tokenInfo) => {
        if (!tokenInfo.nft) {
         fetchDetailedTokenInfo(tokenInfo.id)
        } else {
          fetchDetailedNftInfo(tokenInfo.id)
        }
        setIsExpanded(false);
    }


    async function getTxData(platformId, contractAddress): Promise<any> {
        let domain: string;

        switch (platformId) {
            case 'ethereum':
                domain = 'etherscan.io';
                break;
            case 'binance-smart-chain':
                domain = 'bscscan.com';
                break;
            case 'polygon-pos':
                domain = 'polygonscan.com';
                break;
            case 'fantom':
                domain = 'ftmscan.com';
                break;
            case 'cronos':
                domain = 'cronoscan.com';
                break;
            case 'avalanche':
                domain = 'snowtrace.io';
                break;
            case 'celo':
                domain = 'celoscan.io';
                break;
            default:
                throw new Error('Invalid platformId');
        }

        const nftTxsData = await fetchNftTxs(domain, contractAddress, 10000);

        const nftTxsChartFormat: { date: Date, volume: number }[] = Object.entries(nftTxsData.result.reduce((result: { [dateString: string]: { date: Date, volume: number } }, txInfo: any) => {
            const date = new Date(Number(txInfo.timeStamp) * 1000);
            const dateString = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

            if (result[dateString]) {
                result[dateString].volume += 1;
            } else {
                result[dateString] = { date: date, volume: 1 };
            }

            return result;
        }, {})).map(([dateString, { date, volume }]) => ({ date, volume }));

        return nftTxsChartFormat;
    }

    return (
        <>
            <div style={styles.headerBlock}>
                <div style={styles.rectangle}>
                    <img style={styles.centeredImage} src={menuIcon} alt="Centered" />
                </div>

                    <div  style={{
                        ...styles.searchbar,
                        borderBottomLeftRadius:isExpanded ? 0 : constants.border_radius,
                        borderBottomRightRadius:isExpanded ? 0 : constants.border_radius,
                    }}>
                            <img style={styles.searchbarImage} src={searchIcon} alt="Search" />
                            <input
                                ref={inputRef}
                                type="text"
                                style={styles.searchInput}
                                onChange={(e => setSearchInput(e.target.value))}
                                onKeyDown={handleSearch}
                                onClick={() => setSearchInput("")}
                                onFocus={handleFocus}
                                value={searchInput}
                            />
                        </div>

                        <img style={styles.mainLogo} src={mainLogo} alt="Main Logo" />
                    </div>
                    <div  style={ styles.searchResults } ref={searchResultsRef}>
                        {isExpanded && displayResults?.tokens.length > 0 &&
                            displayResults?.tokens.slice(0, 12).map((tokenInfo, index) =>
                                <div
                                    key={tokenInfo.id + index}
                                    style={styles.coinSearchInfo}
                                    tabIndex={index}
                                    onClick={() => handleCoinOptionClick(tokenInfo)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleCoinOptionClick(tokenInfo);
                                        }
                                    }}
                                >
                                    {tokenInfo.image ?
                                    <img
                                        src={tokenInfo.image}
                                        alt={tokenInfo.name}
                                        style={styles.coinImage}
                                    /> :
                                        <div
                                            style={styles.coinImage}
                                        />
                                    }
                                    <span style={styles.exchangeName}>{tokenInfo.name}</span>
                                    {tokenInfo.marketCapRank &&
                                        (tokenInfo.marketCapRank === 'NFT' ? (
                                        <span style={styles.marketCapRank}>{tokenInfo.marketCapRank}</span>
                                    )
                                    :
                                        (
                                            <span style={styles.marketCapRank}>#{tokenInfo.marketCapRank}</span>
                                        )
                                        )}
                                </div>
                            )
                        }
                    </div>
        </>
    );
};

export default HeaderBlock;