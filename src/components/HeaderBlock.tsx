import React, { CSSProperties, useState, useEffect } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import {fetchNameSearch, fetchTrendingCoins} from "../utils/api";
import {ISearchCoinList, ITrendingCoinList} from "../models/ICoinInfo";

const menuIcon = require( "../static/images/icons/menu-icon.png")
const searchIcon = require( "../static/images/icons/search-icon.png")
interface HeaderBlockProps {
    mainLogo: string;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ mainLogo }) => {
       const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<ISearchCoinList | [{coins : []}]>([{coins: []}]);
    const [trendingCoins, setTrendingCoins] = useState<ITrendingCoinList>({ coins: [] });
    const [testValue, setTestValue] = useState<string>("");
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
        },
        coinImage: {
            width: 22,
            height: 22,
            borderRadius: constants.border_radius_small,
        },
        exchangeName: {
            paddingLeft: 16,
            width: 100,
            color: colors.white_medium,
            fontSize: constants.font_medium,
            fontWeight: constants.font_weight_medium,
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
    }, []);

    const getTrendingCoins = async () => {
        try {
        const trendingCoins: ITrendingCoinList = await fetchTrendingCoins();
        console.log("getTrendingCoins: ", trendingCoins)
        setTrendingCoins(trendingCoins);
        } catch (error) {
            console.error("getTrendingCoins: Error fetching trending coins:", error);

        }
    }


    async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (searchInput.length > 0) {
                try {
                    const searchResults: ISearchCoinList = await fetchNameSearch(searchInput);
                    if (!searchResults) {
                        setTestValue("No results")
                        console.log("No results")
                    }

                    console.log("searchResults: ", searchResults)
                    setSearchResults(searchResults);

                } catch (error) {
                    console.error("handleSearch: Error searching for coins:", error);

                }
            }
        }
    }
    async function handleFocus() {
        setTestValue("FOCUS")
        toggleExpanded();
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
                {isExpanded && trendingCoins?.coins.length > 0 &&
                    trendingCoins?.coins.map((coinInfo) =>
                        <div
                            key={coinInfo.item.coin_id}
                            style={styles.coinSearchInfo}
                        >
                            <img
                                src={coinInfo.item.small}
                                alt={coinInfo.item.name}
                                style={styles.coinImage}
                            />
                            <span style={styles.exchangeName}>{coinInfo.item.name}</span>
                            <span style={styles.marketCapRank}>#{coinInfo.item.market_cap_rank} </span>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default HeaderBlock;