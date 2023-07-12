import React, {CSSProperties, useEffect, useState} from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import {
    getHomeCoinStorage, getPortfolioDataStorage,
    getSearchPrefStorage,
    getSearchResultNftAmountStorage,
    setSearchPrefStorage,
    setSearchResultNftAmountStorage
} from "../utils/storage";
import {IDetailedNftInfo} from "../models/INftInfo";
import {IDetailedCoinInfo} from "../models/ICoinInfo";
import {fetchCoinsPrices} from "../utils/api";

interface OverlayMenuProps {
    menuIsOpen: boolean;
    setMenuIsOpen: (menuIsOpen: any) => void;
    coinInfo?:IDetailedCoinInfo;
    nftInfo?:IDetailedNftInfo
}

// todo # onchain txs

const OverlayMenu: React.FC<OverlayMenuProps> = ({menuIsOpen, setMenuIsOpen, coinInfo, nftInfo}) => {

    const styles: { [key: string]: CSSProperties } = {
        overlayMenu: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: 0,
            overflowY: 'auto',
            maxHeight: '100vh',
            zIndex: 100,
            // transition: 'width 0.5s ease',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        overlayMenuOpen: {
            width: '100%',
        },
        menuContent: {
            transition: 'transform 0.5s ease',
            transform: 'translateX(-100%)',
            zIndex: 101,

            position: 'relative',
            width: '70%',
            maxWidth: '400px',
            height: '100%',
            padding: '12px',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',

            background: "radial-gradient(#5565b0, #344183)",
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            borderTopRightRadius: constants.border_radius,
            borderBottomRightRadius: constants.border_radius,

            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            color: colors.secondary_medium,
            fontSize: '14px',
        },
        sectionHeader: {
            fontWeight: 'bold',
            margin: '18px 0 3px 0 ',
            fontSize: '16px',
            color: colors.white_medium,
        },
        explanationSubtext: {
            color: colors.accent_medium,
            fontSize: '12px',
            marginBottom: "12px",
            textAlign: 'center',
        },

        menuContentOpen: {
            transform: 'translateX(0)',
        },
        menuCloseButton: {
            position: 'absolute',
            right: '12px',
            top: '12px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
        },
        supportOpenButton: {
            cursor: 'pointer',
        },
        sliderMark: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: colors.white_medium,
        },

        togglePrefButton: {
            fontSize: '14px',
            color: colors.white_medium,
        },
        activePrefButton: {
            backgroundImage: 'radial-gradient(#5565b0, #344183)',
            boxShadow: '0 0 8px rgba(85, 101, 176, 0.8)',
        } ,
        togglePrefButtonIcon: {
            marginRight: '4px',
            fontSize: 24,
            color: colors.white_medium,
        },

        // PORTFOLIO
        portfolioSectionTitle :{
            marginTop: constants.default_padding,
            marginBottom: "2px",
            color: colors.accent_medium,
            fontSize: constants.font_nano,
            fontWeight: constants.font_weight_large
        },
        portfolioValueField: {
            color: colors.white_medium,
            fontSize: constants.font_large,
            fontWeight: constants.font_weight_large,
            marginBottom: "6px",
        },
        portfolioHeader:{
            display: "flex",
            alignItems: "center",
            marginLeft: "53px",
            marginBottom: "2px"
        },
        portfolioHeaderValue: {
            width: "60px",
            marginRight: "4px",
            color: colors.accent_medium,
            fontSize: constants.font_micro,
            fontWeight: constants.font_weight_medium
        },
        portfolioItemField: {
            // backgroundColor: 'rgba(52, 65, 131, 0.8)',
            // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            paddingTop: 10,
            paddingBottom: 10,
        },
        portfolioItem: {
            height: "32px",
            width: "220px",
            display: "flex",
            alignItems: "center",
            // marginLeft: "12px",
        },
        portfolioItemImage: {
            width: "22px",
            height: "22px",
        },
        portfolioItemTopRow: {
            height: "16px",
            fontSize: constants.font_small,
            display: "flex",
            alignItems: "flex-end",
            fontWeight: constants.font_weight_large
        },
        portfolioItemBottomRow : {
            height: "16px",
            fontSize: constants.font_micro,
            display: "flex",
            alignItems: "flex-end",
            fontWeight: constants.font_weight_medium
        },
        portfolioItemValue: {
            width: "50px",
            marginLeft: "16px",
            color: colors.white_medium,
        },
        tickerText: {
            color: colors.accent_medium,
            fontWeight: 600,
        },
        portfolioItemDivider: {
            backgroundImage: colors.accent_medium,
            marginTop: "6px",
            marginBottom: "6px",
            height: "0px",
            width: "100%",
            borderBottom: `2px solid ${colors.accent_light}`
        }
    };

    // todo portfolio field styling
    // todo save to portfolio from coin page
    // todo edit amounts in portfolio
    // todo remove from portfolio

    const handleSupportClick = () => {
        chrome.tabs.create({ url: "https://twitter.com/Marty_cFly", active: false })
    }

    const [searchPref, setSearchPref] = useState<string>('coins');
    const [searchResultNftAmount, setSearchResultNftAmount] = useState<number>(3);
    const [portfolioData, setPortfolioData] = useState<{id: string, ticker: string, iconUrl: string, amount: number, price: number, usd24Change: number, nft: boolean}[]>([]);
    const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);


    const handleSearchPref = (newSearchPref: string) => {
        if (newSearchPref !== null) {
            setSearchPref(newSearchPref);
            setSearchPrefStorage(newSearchPref);
        }
    }
    const handleSearchResultNftAmount = (newSearchResultNftAmount: number | number[]) => {
        if (newSearchResultNftAmount !== null) {
            setSearchResultNftAmount(newSearchResultNftAmount as number);
            setSearchResultNftAmountStorage(newSearchResultNftAmount as number);
        }
    }

    const checkStorage = async () => {
        const [portfolioDataStorage, searchPrefStorage, searchResultNftAmountStorage] = await Promise.all([
            getPortfolioDataStorage(),
            getSearchPrefStorage(),
            getSearchResultNftAmountStorage(),
        ]);

        if (portfolioDataStorage.length > 0) {
            let coinIds = []
            portfolioDataStorage.forEach((coinInfo => {
                coinIds.push(coinInfo.id)
            }))

            const coinsPricesData = await fetchCoinsPrices(coinIds)

            portfolioDataStorage.forEach((coinData) => {
                const coinPriceData = coinsPricesData[coinData.id]
                if (coinPriceData) {
                    coinData.price = coinPriceData.usd
                    coinData.usd24Change = coinPriceData.usd_24h_change
                }
            })
            console.log("portfolioDataStorage2: ", portfolioDataStorage)
            setPortfolioData(portfolioDataStorage);
        }
        if (searchPrefStorage) {
            setSearchPref(searchPrefStorage);
        }
        if (searchResultNftAmountStorage) {
            setSearchResultNftAmount(searchResultNftAmountStorage);
        }
    }

    useEffect(() => {
        checkStorage()
    }, []);


    const portfolioItems = [
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Portfolio coin Logo",
            price: "$0.151",
            amount: "100 K",
            total24: "$13.6 K",
            coinName: "WOO",
            change: "-6.6%"
        },
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Bitcoin Logo",
            price: "$30,000",
            amount: "2.00",
            total24: "$60,000",
            coinName: "BTC",
            change: "-1.5%"
        },
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Ethereum Logo",
            price: "$2000",
            amount: "15.0",
            total24: "$30,000",
            coinName: "ETH",
            change: "+2.5%"
        },
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Uniswap Logo",
            price: "$20",
            amount: "1000",
            total24: "$20,000",
            coinName: "UNI",
            change: "+10%"
        },
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Chainlink Logo",
            price: "$25",
            amount: "400",
            total24: "$10,000",
            coinName: "LINK",
            change: "+0.8%"
        },
        {
            src: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256",
            alt: "Litecoin Logo",
            price: "$140",
            amount: "70.2",
            total24: "$9,800",
            coinName: "LTC",
            change: "-2%"
        },
    ];

    return (
            <div style={menuIsOpen ? {...styles.overlayMenu, ...styles.overlayMenuOpen} : styles.overlayMenu}>
                <div style={menuIsOpen ? {...styles.menuContent, ...styles.menuContentOpen} : styles.menuContent}>
                    <div style={styles.menuCloseButton}>
                            <CloseIcon style={{ fontSize: 24, color: colors.secondary_medium }} onClick={() => setMenuIsOpen(false)}/>
                    </div>
                    {menuIsOpen &&
                        <>
                            <div style={styles.portfolioSectionTitle}>PORTFOLIO BALANCE</div>
                            <div style={styles.portfolioValueField}>{`$${totalPortfolioValue}`}</div>


                                <div style={styles.portfolioItemField} >
                            <div style={styles.portfolioHeader}>
                                <div style={styles.portfolioHeaderValue}></div>
                                <span style={styles.portfolioHeaderValue}>Amount</span>
                                <span style={styles.portfolioHeaderValue}>Total/ 24h</span>
                            </div>
                            {portfolioData.map((coinInfo, index) => (
                                <div key={coinInfo.id}>
                                    <div style={styles.portfolioItem}>
                                        <img  style={styles.portfolioItemImage} src={coinInfo.iconUrl} alt={coinInfo.ticker}/>
                                        <div style={styles.portfolioItemDataField}>
                                            <div style={styles.portfolioItemTopRow}>
                                                <span style={styles.portfolioItemValue}>{coinInfo.price}</span>
                                                <span style={styles.portfolioItemValue}>{coinInfo.amount}</span>
                                                <span style={styles.portfolioItemValue}>{coinInfo.price * coinInfo.amount}</span>
                                            </div>
                                            <div style={styles.portfolioItemBottomRow}>
                                                <span style={{...styles.portfolioItemValue, ...styles.tickerText }}>{coinInfo.ticker.toUpperCase()}</span>
                                                <div style={styles.portfolioItemValue}></div>
                                                <span style={{...styles.portfolioItemValue, color: colors.red_medium}}>{`${coinInfo.usd24Change.toFixed(1)}%`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.portfolioItemDivider}/>
                                    {/*{index < portfolioItems.length - 1 && <div style={styles.portfolioItemDivider}/>}*/}
                                </div>
                            ))}
                                </div>


                             {/*HOMEPAGE*/}
                            <div style={styles.sectionHeader}>Homepage</div>
                            {/*<div style={styles.explanationSubtext}>{`${homeCoin?.id === nftInfo?.id || homeCoin?.id === coinInfo?.id ? 'Unset' : 'Set'} startup coin`}</div>*/}
                            {/*    <ToggleButton*/}
                            {/*        value="home"*/}
                            {/*        style={styles.togglePrefButton}*/}
                            {/*        onClick={handleHomePress}*/}
                            {/*    >*/}
                            {/*        {homeCoin?.id === nftInfo?.id || homeCoin?.id === coinInfo?.id ?*/}
                            {/*            <HomeRoundedIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }} />*/}
                            {/*            :*/}
                            {/*            <HomeOutlinedIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }} />*/}
                            {/*        }*/}
                            {/*    </ToggleButton>*/}


                            <div style={styles.sectionHeader} >Search Priority</div>
                            <div style={styles.explanationSubtext}>Show Coins/ Nfts first</div>
                            <ToggleButtonGroup
                                size="small"
                                color="primary"
                                value={searchPref}
                                exclusive
                                aria-label="SearchPref"
                            >
                                <ToggleButton
                                    value="coins"
                                    style={{ ...styles.togglePrefButton, ...(searchPref === 'coins' && styles.activePrefButton) }}
                                    onClick={() => handleSearchPref('coins')}
                                >
                                    <CurrencyBitcoinIcon style={styles.togglePrefButtonIcon}/>
                                </ToggleButton>
                                <ToggleButton
                                    value="nfts"
                                    style={{ ...styles.togglePrefButton, ...(searchPref === 'nfts' && styles.activePrefButton) }}
                                    onClick={() => handleSearchPref('nfts')}
                                >
                                    <WallpaperIcon style={styles.togglePrefButtonIcon} />
                                </ToggleButton>
                            </ToggleButtonGroup>


                            <div style={styles.sectionHeader}>Search Results</div>
                            <div style={styles.explanationSubtext}>{`Max number of Nfts from 11 results (${searchResultNftAmount})`}</div>
                            <Box sx={{ width: 180 }}>
                                    <Slider
                                        size="small"
                                        aria-label="Max Nfts out of 11 search results"
                                        value={searchResultNftAmount}
                                        valueLabelDisplay="auto"
                                        onChange={(event, newTokenNftRatio) => {
                                            if (Array.isArray(newTokenNftRatio)) {
                                                handleSearchResultNftAmount(newTokenNftRatio[0]);
                                            } else {
                                                handleSearchResultNftAmount(newTokenNftRatio);
                                            }
                                        }}
                                        step={1}
                                        marks={[{ value: 2, label:  <span style={styles.sliderMark}>2 Nfts</span> }, { value: 9, label:  <span style={styles.sliderMark}>9 Nfts</span> }]}
                                        min={2}
                                        max={9}
                                        style={{ color: colors.white_medium }}
                                    />
                            </Box>

                            <div style={styles.sectionHeader}>Contact Me!</div>
                            <div style={styles.explanationSubtext}>Any feature requests or ideas</div>
                                <ToggleButton
                                    value="question"
                                    style={styles.togglePrefButton}
                                    onClick={handleSupportClick}
                                >
                                    <QuestionAnswerIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }}/>
                                </ToggleButton>

                        </>
                    }
                </div>
            </div>

    );
};

export default OverlayMenu;
