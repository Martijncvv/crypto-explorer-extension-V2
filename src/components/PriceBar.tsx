import React, { CSSProperties } from 'react';
import colors from '../static/colors';
import constants from "../static/constants";
import {amountFormatter} from "../utils/amountFormatter";

interface PriceBarProps {
    allTimeLow: number;
    allTimeHigh: number;
    price: number;
}

const PriceBar: React.FC<PriceBarProps> = ({ allTimeLow, allTimeHigh, price }) => {
    const percentage = ((price - allTimeLow) / (allTimeHigh - allTimeLow)) * 100;
    const gradientWidth = Math.ceil(306 * (percentage / 100));

    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: '306px',
            height: '40px',
            backgroundColor: colors.primary_dark,
            position: 'relative',
            borderRadius: constants.border_radius,
            overflow: 'hidden',
        },
        gradient: {
            width: `${gradientWidth}px`,
            height: '40px',
            position: 'absolute',
            borderRadius: constants.border_radius,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to right, ${colors.primary_dark}, rgba(220, 220, 256, 0.30)`,
        },
        allTimeLow: {
            position: 'absolute',
            left: constants.default_padding,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: constants.font_small,
            color: colors.red_medium,
            // fontFamily: 'Open Sans',
            fontWeight: constants.font_weight_large,
        },
        price: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: constants.font_large,
            color: colors.white_medium,
            // fontFamily: 'Open Sans',
            fontWeight: constants.font_weight_large,
        },
        allTimeHigh: {
            position: 'absolute',
            right: constants.default_padding,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: constants.font_small,
            color: colors.green_medium,
            // fontFamily: 'Open Sans',
            fontWeight: constants.font_weight_large,
        },
    };


    return (
        <div style={styles.container}>
            <div style={styles.gradient}></div>
            <span style={styles.allTimeLow}>${amountFormatter(allTimeLow)}</span>
            <span style={styles.price}>${amountFormatter(price)}</span>
            <span style={styles.allTimeHigh}>${amountFormatter(allTimeHigh)}</span>
        </div>
    );
};

export default PriceBar;