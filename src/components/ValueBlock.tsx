import React, {CSSProperties} from 'react';
import colors from "../static/colors";

interface ValueBlockProps {
    title: string;
    mainValue: string;
    secondaryValue: string;
}

const ValueBlock: React.FC<ValueBlockProps> = ({ title, mainValue, secondaryValue }) => {

    const styles: { [key: string]: CSSProperties } = {
        rectangle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 144,
            height: 48,
            backgroundColor: colors.primary_dark,
            borderRadius: 12,
        },
        title: {
            fontSize: 12,
            fontWeight: '500',
            color: colors.secondary_medium,
            margin: '4px 0 0',
        },
        values: {
            display: 'flex',
            alignItems: 'flex-end',
            height: 24,
        },
        mainValue: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.white_medium,
        },
        secondaryValue: {
            fontSize: 12,
            fontWeight: '500',
            color: colors.accent_medium,
            marginLeft: 4,
        },
    };

    return (
        <div style={styles.rectangle}>
            <div style={styles.title}>{title}</div>
            <div style={styles.values}>
                <span style={styles.mainValue}>{mainValue}</span>
                <span style={styles.secondaryValue}>{secondaryValue}</span>
            </div>
        </div>
    );
};

export default ValueBlock;