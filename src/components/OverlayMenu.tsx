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
    getHomeCoinStorage,
    getSearchPrefStorage,
    getSearchResultNftAmountStorage, setHomeCoinStorage,
    setSearchPrefStorage,
    setSearchResultNftAmountStorage
} from "../utils/storage";
import {IDetailedNftInfo} from "../models/INftInfo";
import {IDetailedCoinInfo} from "../models/ICoinInfo";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

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
            height: '100%',
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
    };

    const handleSupportClick = () => {
        chrome.tabs.create({ url: "https://twitter.com/Marty_cFly", active: false })
    }

    const [searchPref, setSearchPref] = React.useState<string>('coins');
    const [searchResultNftAmount, setSearchResultNftAmount] = React.useState<number>(3);
    const [homeCoin, setHomeCoin] = useState<{id: string, nft: boolean}>({ id: "", nft: false });


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
        const [searchPrefStorage, searchResultNftAmountStorage, currentHomeCoin] = await Promise.all([
            getSearchPrefStorage(),
            getSearchResultNftAmountStorage(),
            getHomeCoinStorage()
        ]);
        if (searchPrefStorage) {
            setSearchPref(searchPrefStorage);
        }
        if (searchResultNftAmountStorage) {
            setSearchResultNftAmount(searchResultNftAmountStorage);
        }
        if (currentHomeCoin) {
            setHomeCoin(currentHomeCoin);
        }
    }

    useEffect(() => {
        checkStorage()
    }, []);

    const handleHomePress = async () => {
        if (homeCoin?.id === coinInfo?.id || homeCoin?.id === nftInfo?.id) {
            setHomeCoinStorage({id: '', nft: false})
            setHomeCoin({id: '', nft: false})
        } else if (coinInfo) {
            setHomeCoinStorage({id: coinInfo.id, nft: false})
            setHomeCoin({id: coinInfo.id, nft: false})
        }
        else if (nftInfo) {
            setHomeCoinStorage({id: nftInfo.id, nft: true})
            setHomeCoin({id: nftInfo.id, nft: true})
        }
    }

    return (
        <>
            <div style={menuIsOpen ? {...styles.overlayMenu, ...styles.overlayMenuOpen} : styles.overlayMenu}>
                <div style={menuIsOpen ? {...styles.menuContent, ...styles.menuContentOpen} : styles.menuContent}>
                    <div style={styles.menuCloseButton}>
                            <CloseIcon style={{ fontSize: 24, color: colors.secondary_medium }} onClick={() => setMenuIsOpen(false)}/>
                    </div>
                    {menuIsOpen &&
                        <>
                            <div style={styles.sectionHeader}>Homepage</div>
                            <div style={styles.explanationSubtext}>{`${homeCoin?.id === nftInfo?.id || homeCoin?.id === coinInfo?.id ? 'Unset' : 'Set'} current startup coin`}</div>
                                <ToggleButton
                                    value="home"
                                    style={styles.togglePrefButton}
                                    onClick={handleHomePress}
                                >
                                    {homeCoin?.id === nftInfo?.id || homeCoin?.id === coinInfo?.id ?
                                        <HomeRoundedIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }} />
                                        :
                                        <HomeOutlinedIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }} />
                                    }
                                </ToggleButton>


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
                                        marks={[{ value: 2, label:  <span style={styles.sliderMark}>3 Nfts</span> }, { value: 9, label:  <span style={styles.sliderMark}>9 Nfts</span> }]}
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
        </>
    );
};

export default OverlayMenu;
