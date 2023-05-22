import React, { CSSProperties } from 'react';
import colors from '../static/colors';
import constants from "../static/constants";
import {numberFormatter} from "../utils/amountFormatter";

interface SocialBlockProps {
    image: string;
    mainValue?: number;
    link?: string;
}

const SocialBlock: React.FC<SocialBlockProps> = ({ image, mainValue, link }) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 38,
            height: 51,
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.primary_dark,
            cursor: 'pointer',
        },
        image: {
            width: 22,
            height: 22,
            borderRadius: '50%',
            marginTop: 8,
        },
        mainValue: {
            fontSize: constants.font_micro,
            color: colors.white_medium,
            height: 9,
            width: 32,
            marginBottom: 6,
            padding: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    };

    function handleOpenTab() {
        chrome.tabs.create({ url: link, active: false })
    }

    return (
        <div style={styles.container} onClick={handleOpenTab}>
            <img src={image} alt="Social image" style={styles.image} />
            <span style={styles.mainValue}>{numberFormatter(mainValue)}</span>
        </div>
    );
};

export default SocialBlock;