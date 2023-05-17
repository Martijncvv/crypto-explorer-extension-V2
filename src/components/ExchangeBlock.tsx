import React, { CSSProperties, useState, useEffect } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
import EXCHANGE_ICONS from "../static/exchangeIcons";
import {amountFormatter} from "../utils/amountFormatter";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const ExpandMoreIcon = require( "../static/images/icons/expand-more-icon.png")
const ExpandLessIcon = require( "../static/images/icons/expand-less-icon.png")

interface Exchange {
    id: string;
    image: string;
    exchangeName: string;
    tradingVolume: number;
    quote: string;
    exchangeURL: string;
}
// todo fix exchange logos, only display "/ 24h" on first exchange
// fix double exchange block bug
interface ExchangeBlockProps {
    exchanges: Exchange[];
}

const ExchangeBlock: React.FC<ExchangeBlockProps> = ({ exchanges }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setIsExpanded(false);
    }, [exchanges]);



    const styles: { [key: string]: CSSProperties } = {
        exchangeWrapper: {
            boxSizing: "border-box",
            width: 306,
            height: 40,
            background: colors.primary_dark,
            display: "flex",
            alignItems: "center",
            padding: constants.default_padding,
            cursor: "pointer",

        },
        firstExchange: {
            borderTopLeftRadius: constants.border_radius,
            borderTopRightRadius: constants.border_radius,
            borderBottomLeftRadius: !isExpanded && constants.border_radius,
            borderBottomRightRadius: !isExpanded && constants.border_radius,
        },
        lastExchange: {
            borderBottomLeftRadius: constants.border_radius,
            borderBottomRightRadius: constants.border_radius,
        },
        image: {
            width: 22,
            height: 22,
            borderRadius: constants.border_radius_small,
        },
        exchangeName: {
            width: 116,
            color: colors.white_medium,
            fontSize: constants.font_medium,
            fontWeight: constants.font_weight_medium,
            paddingLeft: constants.default_padding,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        tradingVolume: {
            paddingLeft: 6,
            width: 54,
            height: constants.font_small,
            textAlign: "right",
            color: colors.white_medium,
            fontSize: constants.font_small,
            fontWeight: constants.font_weight_medium,
            verticalAlign: 'bottom',
        },
        staticText: {
            paddingLeft: 6,
            paddingTop: 2,
            width: 34,
            display: 'flex',
            alignItems: 'flex-end',
            height: constants.font_small,
            color: colors.accent_medium,
            fontSize: constants.font_micro,
            fontWeight: constants.font_weight_medium,
            verticalAlign: 'bottom',
        },
        arrowIcon: {
            paddingLeft: 6,
            cursor: "pointer",
        },
    };

    return (
        <div key={Date.now()}>
            {exchanges.map((exchange, index) => (
                <div
                    key={exchange.id}
                    style={{
                        ...styles.exchangeWrapper,
                        ...index === 0 && styles.firstExchange,
                        ...index === exchanges.length - 1 && styles.lastExchange,
                        display: isExpanded || index === 0 ? "flex" : "none",
                    }}
                >
                    <img
                        src={EXCHANGE_ICONS[exchange.id]}
                        alt={exchange.exchangeName}
                        style={styles.image}
                        onClick={() => window.open(exchange.exchangeURL, "_blank")}
                    />

                        <span style={styles.exchangeName}  onClick={() => window.open(exchange.exchangeURL, "_blank")}>{exchange.exchangeName}</span>
                        <span style={styles.tradingVolume}>${amountFormatter(exchange.tradingVolume)} </span>

                        {!isExpanded ? <span style={styles.staticText}>/ 24h</span> :
                            <span style={styles.staticText}>{exchange.quote}</span>}

                    {index === 0 && (
                        isExpanded ? (
                            <img src={ExpandLessIcon} alt="expand-less-icon" style={styles.arrowIcon} onClick={toggleExpanded} />
                        ) : (
                            <img src={ExpandMoreIcon} alt="expand-more-icon" style={styles.arrowIcon} onClick={toggleExpanded} />

                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default ExchangeBlock;
