import React, { useState, CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

interface OverlayMenuProps {
    menuIsOpen: boolean;
    setMenuIsOpen: (menuIsOpen: any) => void;
}

// todo favo coin
// todo NFT vs TOKEN search result preference //
// todo support //
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
            position: 'relative',
            zIndex: 101,
            width: '70%',
            maxWidth: '400px',
            height: '100%',
            background: "radial-gradient(#5565b0, #344183)",
            padding: '12px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            borderTopRightRadius: constants.border_radius,
            borderBottomRightRadius: constants.border_radius,
            transition: 'transform 0.5s ease',
            transform: 'translateX(-100%)',

            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            color: colors.secondary_medium,
            fontSize: '14px',
        },
        sectionHeader: {
            fontWeight: 'bold',
            margin: '10px 0',
            fontSize: '16px',
            color: colors.white_medium,
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
        },
    };

    const handleSupportClick = async () => {
        chrome.tabs.create({ url: "https://twitter.com/Marty_cFly", active: false })
    }

    const [searchPref, setSearchPref] = React.useState<string>('tokens');
    const [tokenNftRatio, setTokenNftRatio] = React.useState<number>(1);




    return (
        <>
            <div style={menuIsOpen ? {...styles.overlayMenu, ...styles.overlayMenuOpen} : styles.overlayMenu}>
                <div style={menuIsOpen ? {...styles.menuContent, ...styles.menuContentOpen} : styles.menuContent}>
                    <div style={styles.menuCloseButton}>
                            <CloseIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.secondary_medium }} onClick={() => setMenuIsOpen(false)}/>
                    </div>
                    {menuIsOpen &&
                        <>
                            <div style={styles.sectionHeader}>Search result priority</div>
                            <ToggleButtonGroup
                                size="small"
                                color="primary"
                                value={searchPref}
                                exclusive
                                onChange={(event, newSearchPref) => {setSearchPref(newSearchPref)}}
                                aria-label="SearchPref"
                            >
                                <ToggleButton value="tokens"> <CurrencyBitcoinIcon style={{ fontSize: 24, color: colors.secondary_medium }}/> </ToggleButton>
                                <ToggleButton value="nfts"> <WallpaperIcon style={{ fontSize: 24, color: colors.secondary_medium }} /> </ToggleButton>
                            </ToggleButtonGroup>

                            <div style={styles.sectionHeader}>Search result Coin vs NFTs</div>
                            <Box sx={{ width: 200 }}>
                                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                    <CurrencyBitcoinIcon style={{ fontSize: 24, color: colors.secondary_medium }}/>
                                    <Slider
                                        size="small"
                                        aria-label="Coin vs NFT ratio"
                                        value={tokenNftRatio}
                                        valueLabelDisplay="auto"
                                        onChange={(event, newTokenNftRatio) => {
                                            if (Array.isArray(newTokenNftRatio)) {
                                                setTokenNftRatio(newTokenNftRatio[0]);
                                            } else {
                                                setTokenNftRatio(newTokenNftRatio);
                                            }
                                        }}
                                        step={1}
                                        marks
                                        min={3}
                                        max={10}
                                        style={{ color: colors.secondary_medium }}
                                    />
                                    <div style={{width: "100%"}}>/ 12 results</div>
                                </Stack>
                            </Box>
                            <QuestionAnswerIcon style={{ fontSize: 24, cursor: 'pointer', color: colors.secondary_medium, marginTop: '20px' }} onClick={() => handleSupportClick}/>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default OverlayMenu;
