import React, { CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

interface TickerBlockProps {
    ticker: string;
}

const TickerBlock: React.FC<TickerBlockProps> = ({ticker}) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            height: 65,
            width: 200,

            position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',


            textAlign: 'center',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 64,
            color: '#0000001A',
        },
    };

    return (
        <div style={styles.container}>
            {ticker.toUpperCase()}
        </div>
    );
}

export default TickerBlock;