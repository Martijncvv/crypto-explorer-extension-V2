import React, { CSSProperties, useState, useEffect } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import {fetchCoinInfo, fetchNameSearch, fetchTrendingCoins} from "../utils/api";
import {
    IDetailedCoinInfo,
    ISearchCoinList,
    ISearchOptions,
    ITrendingCoinList
} from "../models/ICoinInfo";

const menuIcon = require( "../static/images/icons/menu-icon.png")
const searchIcon = require( "../static/images/icons/search-icon.png")
interface HeaderBlockProps {
    mainLogo: string;
    setCoinInfo: (coinInfo: IDetailedCoinInfo) => void;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ mainLogo, setCoinInfo }) => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [displayResults, setDisplayResults] = useState<ISearchOptions>({tokens: [], total: 0});
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const [testValue, setTestValue] = useState<string>("");

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
            '&:hover': {
                backgroundColor: colors.primary_dark,
                cursor: 'pointer',
            },
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

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        getTrendingCoins();
        fetchDetailedInfo('bitcoin');
    }, []);

    const getTrendingCoins = async () => {
        try {
            const trendingCoins: ITrendingCoinList = await fetchTrendingCoins();
            console.log("getTrendingCoins: ", trendingCoins)
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

        } catch (error) {
            console.error("getTrendingCoins: Error fetching trending coins:", error);
        }
    }

    const searchCoinNames = async (coinId: string) => {
        try {
            const searchResults: ISearchCoinList = await fetchNameSearch(searchInput);
            if (!searchResults) {
                setTestValue("No results")
                console.log("No results")
            }
            console.log("searchResults: ", searchResults)
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
            setDisplayResults(searchFormat);

        } catch (error) {
            console.error("handleSearch: Error searching for coins:", error);
        }
    }

    async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (searchInput.length > 0) {
                searchCoinNames(searchInput);
            }
        }
    }
    async function handleFocus() {
        setTestValue("FOCUS")
        toggleExpanded();
    }

    const fetchDetailedInfo = async (coinId: string) => {
        try {
            const coinSearchResult: IDetailedCoinInfo = await fetchCoinInfo(coinId);
            if (!coinSearchResult) {
                console.log(`No results for ${coinId}`)
                setTestValue(`No results for ${coinId}`)
                return
            }
            console.log("coinSearchResult: ", coinSearchResult)
            setCoinInfo(coinSearchResult)
        } catch (error) {
            console.error("handleCoinOptionClick: Error searching for coin:", error);
        }
    }

    const handleCoinOptionClick = async (coinId: string) => {
        fetchDetailedInfo(coinId)
        toggleExpanded()
    }

    return (
        <>
            <div style={styles.headerBlock}>
                <div style={styles.rectangle}>
                    <img style={styles.centeredImage} src={menuIcon} alt="Centered" />
                </div>
            <div style={{
                ...styles.searchbar,
                borderBottomLeftRadius:isExpanded ? 0 : constants.border_radius,
                borderBottomRightRadius:isExpanded ? 0 : constants.border_radius,
            }}>
                    <img style={styles.searchbarImage} src={searchIcon} alt="Search" />
                    <input
                        type="text"
                        style={styles.searchInput}
                        onChange={(e => setSearchInput(e.target.value))}
                        onKeyDown={handleSearch}
                        onFocus={handleFocus}
                        placeholder={testValue}
                    />
                </div>

                <img style={styles.mainLogo} src={mainLogo} alt="Main Logo" />
            </div>
            <div style={ styles.searchResults }>
                {isExpanded && displayResults?.tokens.length > 0 &&
                    displayResults?.tokens.slice(0, 12).map((tokenInfo, index) =>
                        <div
                            key={tokenInfo.id}
                            style={styles.coinSearchInfo}
                            tabIndex={index }
                            onClick={() => handleCoinOptionClick(tokenInfo.id)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleCoinOptionClick(tokenInfo.id);
                                }
                            }}
                        >
                            <img
                                src={tokenInfo.image }
                                alt={tokenInfo.name}
                                style={styles.coinImage}
                            />
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