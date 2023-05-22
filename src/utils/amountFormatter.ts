export function amountFormatter(amount: number | null | undefined, precision = 3): string {
	if (amount === null || amount === undefined || amount === 0) {
		return '';
	}


	// Quadrillion (Q) - 10^15
	if (amount >= 1e15) {
		return `${(amount / 1e15).toPrecision(precision)} Q`;
	}
	// Trillion (T) - 10^12
	if (amount >= 1e12) {
		return `${(amount / 1e12).toPrecision(precision)} T`;
	}
	// Billion (B) - 10^9
	if (amount >= 1e9) {
		return `${(amount / 1e9).toPrecision(precision)} B`;
	}
	// Million (M) - 10^6
	if (amount > 1e6) {
		return `${(amount / 1e6).toPrecision(precision)} M`;
	}
	// Thousand (K) - 10^3
	if (amount > 1e3) {
		return `${(amount / 1e3).toPrecision(precision)} K`;
	}
	// 1 till 1000
	if (amount > 1) {
		return `${amount.toFixed(2)}`;
	}
	// Numbers close to zero
	if (amount > 1e-4) {
		return `${amount.toFixed(5).replace(/\.?0+$/, "")}`;
	}
	// Other small numbers
	if (amount < 1) {
		return `${amount.toExponential(3)}`;
	}
	// Default case
	return `${amount.toPrecision(precision)}`;
}


export function numberFormatter(amount: number | null | undefined): string {
	if (amount === null || amount === undefined || amount === 0) {
		return '';
	}
// Million (M) - 10^6
	if (amount >= 1e6) {
		return `${(amount / 1e6).toFixed(1)} M`;
	}
	// // Hundred Thousand (0.1M) - 10^5
	// if (amount >= 1e5) {
	// 	return `${(amount / 1e6).toFixed(1)} M`;
	// }
	// Thousand (K) - 10^3
	if (amount >= 1e3) {
		return `${(amount / 1e3).toFixed(0)} K`;
	}
	// Default case
	return `${amount.toFixed(0)}`;
}