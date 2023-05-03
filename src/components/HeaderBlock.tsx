import React, { CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

const menuIcon = require( "../static/images/icons/menu-icon.png")
const searchIcon = require( "../static/images/icons/search-icon.png")
interface HeaderBlockProps {
    mainLogo: string;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ mainLogo }) => {
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

    return (
        <div style={styles.headerBlock}>
            <div style={styles.rectangle}>
                <img style={styles.centeredImage} src={menuIcon} alt="Centered" />
            </div>
            <div style={styles.searchbar}>
                <img style={styles.searchbarImage} src={searchIcon} alt="Search" />
                <input style={styles.searchInput} type="text" placeholder="Search" />
            </div>
            <img style={styles.mainLogo} src={mainLogo} alt="Main Logo" />
        </div>
    );
};

export default HeaderBlock;