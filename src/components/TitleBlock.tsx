import React, { CSSProperties } from 'react';
import colors from "../static/colors";
import constants from "../static/constants";

interface TitleBlockProps {
    title: string;
}

const TitleBlock: React.FC<TitleBlockProps> = ({title}) => {
    console.log("TitleBlock")
    const styles: { [key: string]: CSSProperties } = {
        container: {
            height: constants.font_large,
            paddingBottom: constants.default_padding,
            textAlign: 'center',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: constants.font_large,
            fontWeight: constants.font_weight_large,
            color: colors.white_medium
        },
    };

    return (
        <div style={styles.container}>
            {title}
        </div>
    );
}

export default TitleBlock;