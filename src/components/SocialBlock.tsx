import React, { CSSProperties } from 'react';
import colors from '../static/colors';
import constants from "../static/constants";

interface SocialBlockProps {
    image: string;
    mainValue?: string | number;
    link?: string;
}

const SocialBlock: React.FC<SocialBlockProps> = ({ image, mainValue, link }) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 34,
            height: 49,
            marginRight: 10,
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
            marginTop: 6,
        },
        mainValue: {
            fontSize: constants.font_micro,
            color: colors.white_medium,
            height: constants.font_micro,
            marginBottom: 6,
            padding: 0,
        },
    };

    const openLinkInNewTab = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div style={styles.container} onClick={openLinkInNewTab}>
            <img src={image} alt="Social image" style={styles.image} />
            <span style={styles.mainValue}>{mainValue}</span>
        </div>
    );
};

export default SocialBlock;