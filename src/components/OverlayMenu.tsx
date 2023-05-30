import React, { CSSProperties, useEffect} from 'react';
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
    getSearchPrefStorage,
    getSearchResultNftAmountStorage,
    setSearchPrefStorage,
    setSearchResultNftAmountStorage
} from "../utils/storage";

interface OverlayMenuProps {
    menuIsOpen: boolean;
    setMenuIsOpen: (menuIsOpen: any) => void;
}

// todo favo coin
// todo # onchain txs

const OverlayMenu: React.FC<OverlayMenuProps> = ({menuIsOpen, setMenuIsOpen}) => {

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
        const [searchPrefStorage, searchResultNftAmountStorage] = await Promise.all([
            getSearchPrefStorage(),
            getSearchResultNftAmountStorage(),
        ]);
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

    return (
        <>
            <div style={menuIsOpen ? {...styles.overlayMenu, ...styles.overlayMenuOpen} : styles.overlayMenu}>
                <div style={menuIsOpen ? {...styles.menuContent, ...styles.menuContentOpen} : styles.menuContent}>
                    <div style={styles.menuCloseButton}>
                            <CloseIcon style={{ fontSize: 24, color: colors.secondary_medium }} onClick={() => setMenuIsOpen(false)}/>
                    </div>
                    {menuIsOpen &&
                        <>
                            <div style={styles.sectionHeader} >Search Priority</div>
                            <div style={styles.explanationSubtext}>Show Coins/ NFTs first</div>
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
                            <div style={styles.explanationSubtext}>{`Nr of NFTs of results (${searchResultNftAmount}/11)`}</div>
                            <Box sx={{ width: 180 }}>
                                    <Slider
                                        size="small"
                                        aria-label="Max NFTs out of 11 search results"
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
                                        marks={[{ value: 3, label:  <span style={styles.sliderMark}>3 NFTs</span> }, { value: 9, label:  <span style={styles.sliderMark}>9 NFTs</span> }]}
                                        min={3}
                                        max={9}
                                        style={{ color: colors.white_medium }}
                                    />
                            </Box>

                            <div style={styles.sectionHeader}>Contact Me!</div>
                            <div style={styles.explanationSubtext}>Any feature requests or ideas</div>
                            <QuestionAnswerIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.white_medium }} onClick={handleSupportClick}/>

                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default OverlayMenu;
