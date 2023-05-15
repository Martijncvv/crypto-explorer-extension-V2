export function amountFormatter(amount: number | null | undefined): string {
	if (amount === null || amount === undefined) {
		return '?';
	}
	// Quadrillion (Q) - 10^15
	if (amount >= 1e15) {
		return `${(amount / 1e15).toPrecision(3)} Q`;
	}
	// Trillion (T) - 10^12
	if (amount >= 1e12) {
		return `${(amount / 1e12).toPrecision(3)} T`;
	}
	// Billion (B) - 10^9
	if (amount >= 1e9) {
		return `${(amount / 1e9).toPrecision(3)} B`;
	}
	// Million (M) - 10^6
	if (amount > 1e6) {
		return `${(amount / 1e6).toPrecision(3)} M`;
	}
	// Thousand (K) - 10^3
	if (amount > 1e3) {
		return `${(amount / 1e3).toPrecision(3)} K`;
	}
	// Numbers close to zero
	if (amount < 1e-3) {
		return `${amount.toExponential(2)}`;
	}
	// Other small numbers
	if (amount < 1) {
		return `${amount.toPrecision(2)}`;
	}

	// Default case
	return `${amount.toPrecision(4)}`;
}