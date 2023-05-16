import React, {CSSProperties, useState} from 'react';
import colors from "../static/colors";
import constants from "../static/constants";
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
            boxSizing: "border-box",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 306,
            minHeight: 67,
            padding: constants.default_padding,
            backgroundColor: colors.primary_dark,
            borderRadius: constants.border_radius,
        },
        textFieldContainer: {
            overflowY: expanded ? 'scroll' : 'hidden',
            maxHeight: expanded ? 220 : 32,
            scrollbarWidth: 'none'
        },

        textField: {
            fontSize: constants.font_small,
            width: 282,
            color: 'white',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 1000 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        expandBtn: {
            marginTop: 2,
            paddingLeft: 0,
            fontSize: constants.font_small,
            color: colors.secondary_medium,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
        },
    };

    return (
        <div style={styles.expandableField}>
            <div   style={styles.textFieldContainer}>
                <div style={styles.textField}>{text}</div>
            </div>
            <button style={styles.expandBtn} onClick={handleClick}>
                {expanded ? 'Collapse' : 'Expand'}
            </button>
        </div>
    );
};

export default ExpandableTextField;