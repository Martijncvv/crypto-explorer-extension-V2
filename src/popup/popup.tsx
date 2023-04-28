import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';

const styles: { [key: string]: CSSProperties } = {
	container: {
		backgroundColor: 'lightblue',
		padding: '20px',
		textAlign: 'center',
		borderRadius: '5px',
	},
	title: {
		color: 'darkblue',
		fontSize: '32px',
		fontWeight: 'bold',
		margin: 0,
	},
};


const App: React.FC = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.title}>TESTESTTTT</h1>
		</div>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);



