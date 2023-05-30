import React, {useState} from 'react';
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

    const styles: { [key: string]: any } = {
        expandableField: {
            boxSizing: "border-box",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 306,
            minHeight: 37,
            padding: constants.default_padding,
            backgroundColor: colors.primary_dark,
            borderRadius: constants.border_radius,
        },
        textFieldContainer: {
            overflowY: expanded ? 'scroll' : 'hidden',
            maxHeight: expanded ? 220 : 38,
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
            textOverflow: 'ellipsis',
            lineHeight: '1.4'
        },
        expandBtn: {
            marginTop: 2,
            paddingLeft: 0,
            fontSize: constants.font_small,
            color: colors.secondary_light,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
        },
    };

    const formattedDescription = (text) => {
        const linkRegex = /<a\b[^>]*>(.*?)<\/a>/g;
        return text.replace(linkRegex, '$1');
    };

    return (
        <div style={styles.expandableField}>
            <div   style={styles.textFieldContainer}>
                <div style={styles.textField}>{text?.length > 10 ? formattedDescription(text) : 'No description available'}</div>
            </div>
            {text?.length > 10 &&
            <div
                style={styles.expandBtn}
                       onClick={handleClick}>
                {expanded ? 'Collapse' : 'Expand'}
            </div>}
        </div>
    );
};

export default ExpandableTextField;