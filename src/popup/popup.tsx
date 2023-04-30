import React, { CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../App.css';
import PriceBar from '../components/PriceBar';
const styles: { [key: string]: CSSProperties } = {
	container: {
		padding: '12px',
	},

};


const App: React.FC = () => {
	return (
		<div style={styles.container}>
		<PriceBar allTimeLow={0.22} allTimeHigh={1.78} price={1.60} />

		</div>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<App />);
