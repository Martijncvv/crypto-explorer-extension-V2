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
            backgroundColor: colors.primary_dark,
            borderRadius: constants.border_radius,
            display: "flex",
            alignItems: "center",
            padding: constants.default_padding,
        },
        image: {
            width: 22,
            height: 22,
        },
        exchangeName: {
            width: 110,
            color: colors.white_medium,
            fontSize: constants.font_medium,
            fontWeight: constants.font_weight_medium,
            paddingLeft: constants.default_padding,
        },
        tradingVolume: {
            width: 50,
            textAlign: "right",
            color: colors.white_medium,
            fontSize: constants.font_micro,
            fontWeight: constants.font_weight_medium,
            paddingLeft: 6,
        },
        staticText: {
            width: 30,
            color: colors.accent_medium,
            fontSize: constants.font_micro,
            fontWeight: constants.font_weight_medium,
            paddingLeft: 6,
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
                        display: isExpanded || index === 0 ? "flex" : "none",
                    }}
                >
                    <img
                        src={exchange.image}
                        alt={exchange.exchangeName}
                        style={styles.image}
                    />
                    <span style={styles.exchangeName}>{exchange.exchangeName}</span>
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