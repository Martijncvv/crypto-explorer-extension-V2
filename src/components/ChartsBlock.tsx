import React, { CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

interface ChartsBlockProps {
    pricedata: any[]; // Ideally, you should use a specific type for the data instead of 'any'
    volumedata: any[]; // Ideally, you should use a specific type for the data instead of 'any'
}

const ChartsBlock: React.FC<ChartsBlockProps> = ({ pricedata, volumedata }) => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: 330,
            height: 165,
            backgroundColor: 'white', // Or any other background color
        },
    };

    return (
        <div style={styles.container}>
            {/* Render your chart components here using the pricedata and volumedata */}
        </div>
    );
}

 export default ChartsBlock;