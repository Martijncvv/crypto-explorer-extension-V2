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
    const [searchResults, setSearchResults] = useState<ISearchCoinList | []>([]);
    const [trendingCoins, setTrendingCoins] = useState<ITrendingCoinList | []>([]);
    const [testValue, setTestValue] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
        mainLogo: {
            marginLeft: 12,
            width: 40,
            height: 40,
            borderRadius: constants.border_radius_small,
        },


    };

    async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (searchInput.length > 0) {
                try {
                    const searchResults: ISearchCoinList = await fetchNameSearch(searchInput);
                    if (!searchResults) {
                        setTestValue("No results")
                        console.log("No results")
                    }

                    console.log(searchResults)
                    setSearchResults(searchResults);

                } catch (error) {
                    console.error("handleSearch: Error searching for coins:", error);

                }
            }
        }
    }

    return (
        <div style={styles.headerBlock}>
            <div style={styles.rectangle}>
                <img style={styles.centeredImage} src={menuIcon} alt="Centered" />
            </div>
            <div style={{
                ...styles.searchbar,
                display: !isExpanded? "flex" : "none",
            }}>
                <img style={styles.searchbarImage} src={searchIcon} alt="Search" />
                <input
                    type="text"
                    style={styles.searchInput}
                    onChange={(e => setSearchInput(e.target.value))}
                    onKeyDown={handleSearch}
                    placeholder={testValue}
                />
            </div>
            <img style={styles.mainLogo} src={mainLogo} alt="Main Logo" />
        </div>
    );
};

export default HeaderBlock;