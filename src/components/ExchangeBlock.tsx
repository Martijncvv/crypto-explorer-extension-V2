import React, { CSSProperties, useState } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const ExpandMoreIcon = require( "../static/images/icons/expand-more-icon.png")
const ExpandLessIcon = require( "../static/images/icons/expand-less-icon.png")

interface Exchange {
    image: string;
    exchangeName: string;
    tradingVolume: string;
    websiteLink: string;
}

interface ExchangeBlockProps {
    exchanges: Exchange[];
}

const ExchangeBlock: React.FC<ExchangeBlockProps> = ({ exchanges }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const styles: { [key: string]: CSSProperties } = {
        exchangeWrapper: {
            boxSizing: "border-box",
            width: 306,
            height: 40,
            background: colors.primary_dark,
            display: "flex",
            alignItems: "center",
            padding: constants.default_padding,
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
        },
        exchangeName: {
            width: 100,
            color: colors.white_medium,
            fontSize: constants.font_medium,
            fontWeight: constants.font_weight_medium,
            paddingLeft: constants.default_padding,
        },
        tradingVolume: {
            paddingLeft: 6,
            width: 50,
            height: constants.font_small,
            textAlign: "right",
            color: colors.white_medium,
            fontSize: constants.font_small,
            fontWeight: constants.font_weight_medium,
            verticalAlign: 'bottom',
        },
        staticText: {
            paddingLeft: 6,
            width: 34,
            height: constants.font_small,
            color: colors.accent_medium,
            fontSize: constants.font_small,
            fontWeight: constants.font_weight_medium,
            verticalAlign: 'bottom',
        },
        arrowIcon: {
            paddingLeft: 26,
            cursor: "pointer",
        },
    };

    return (
        <div>
            {exchanges.map((exchange, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.exchangeWrapper,
                        ...index === 0 && styles.firstExchange,
                        ...index === exchanges.length - 1 && styles.lastExchange,
                        display: isExpanded || index === 0 ? "flex" : "none",
                    }}
                >
                    <img
                        src={exchange.image}
                        alt={exchange.exchangeName}
                        style={styles.image}
                        onClick={() => window.open(exchange.websiteLink, "_blank")}
                    />
                    <span style={styles.exchangeName}  onClick={() => window.open(exchange.websiteLink, "_blank")}>{exchange.exchangeName}</span>
                    <span style={styles.tradingVolume}> {exchange.tradingVolume} </span>
                    <span style={styles.staticText}>/ 24h</span>
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

{/*{index === 0 && (*/}
{/*    isExpanded ? (*/}
{/*        <ExpandLessIcon onClick={toggleExpanded} />*/}
{/*    ) : (*/}
{/*        <ExpandMoreIcon onClick={toggleExpanded} />*/}
{/*    )*/}
{/*)}*/}