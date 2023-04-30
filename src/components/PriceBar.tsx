import React, { CSSProperties } from 'react';

interface PriceBarProps {
    allTimeLow: number;
    allTimeHigh: number;
    price: number;
}

const PriceBar: React.FC<PriceBarProps> = ({ allTimeLow, allTimeHigh, price }) => {
    const percentage = ((price - allTimeLow) / (allTimeHigh - allTimeLow)) * 100;
   const gradientWidth = Math.ceil(306 * (percentage / 100));

    const styles: { [key: string]: CSSProperties } = {
        container: {
            width: '306px',
            height: '40px',
            backgroundColor: '#2F396D',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
        },
        gradient: {
            width: `${gradientWidth}px`,
            height: '40px',
            position: 'absolute',
            borderRadius: '12px',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, #2F396D,  rgba(220, 220, 256, 0.30)',
        },
        allTimeLow: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            color: '#FD8E8E',
            fontFamily: 'Open Sans',
            fontWeight: '600',
        },
        price: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '22px',
            color: 'white',
            fontFamily: 'Open Sans',
            fontWeight: '600',
        },
        allTimeHigh: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            color: '#88EE58',
            fontFamily: 'Open Sans',
            fontWeight: '600',
        },
    };


    return (
        <div style={styles.container}>
            <div style={styles.gradient}></div>
            <span style={styles.allTimeLow}>${allTimeLow.toFixed(2)}</span>
            <span style={styles.price}>${price.toFixed(2)}</span>
            <span style={styles.allTimeHigh}>${allTimeHigh.toFixed(2)}</span>
        </div>
    );
};

export default PriceBar;