import React, {CSSProperties, useState} from 'react';
import colors from "../static/colors";

interface ExpandableTextFieldProps {
    text: string;
}

const ExpandableTextField: React.FC<ExpandableTextFieldProps> = ({ text }) => {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const styles: { [key: string]: CSSProperties } = {
        expandableField: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 306,
            minHeight: 67,
            padding: 12,
            backgroundColor: colors.primary_dark,
        },
        textFieldContainer: {
            overflowY: expanded ? 'scroll' : 'hidden',
            maxHeight: expanded ? 220 : 67,
        },
        textField: {
            fontSize: 12,
            color: 'white',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 5 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        expandBtn: {
            fontSize: 12,
            color: colors.secondary_medium,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginTop: 4,
            outline: 'none',
        },
    };

    return (
        <div style={styles.expandableField}>
            <div style={styles.textFieldContainer}>
                <div style={styles.textField}>{text}</div>
            </div>
            <button style={styles.expandBtn} onClick={handleClick}>
                Expand
            </button>
        </div>
    );
};

export default ExpandableTextField;