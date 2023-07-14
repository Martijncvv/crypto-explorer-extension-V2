export function amountFormatter(
  amount: number | null | undefined,
  precision = 3,
): string {
  if (amount === null || amount === undefined || amount === 0) {
    return "";
  }

  // Quadrillion (Q) - 10^15
  if (amount >= 1e15) {
    if (amount === 1e15) {
      return `1 Q`;
    }
    return `${(amount / 1e15).toPrecision(precision)} Q`;
  }
  // Trillion (T) - 10^12
  if (amount >= 1e12) {
    if (amount === 1e12) {
      return `1 T`;
    }
    return `${(amount / 1e12).toPrecision(precision)} T`;
  }
  // Billion (B) - 10^9
  if (amount >= 1e9) {
    if (amount === 1e9) {
      return `1 B`;
    }
    return `${(amount / 1e9).toPrecision(precision)} B`;
  }
  // Million (M) - 10^6
  if (amount > 1e6) {
    if (amount === 1e6) {
      return `1 M`;
    }
    return `${(amount / 1e6).toPrecision(precision)} M`;
  }
  // Thousand (K) - 10^3
  if (amount > 1e3) {
    if (amount === 1e3) {
      return `1 K`;
    }
    return `${(amount / 1e3).toPrecision(precision)} K`;
  }
  // 1 till 1000
  if (amount > 1) {
    return `${Number(amount.toFixed(2))}`;
  }

  // Tiny numbers less than 1
  // Milli (m) - 10^-3
  if (amount >= 1e-3) {
    return `${Number(amount.toFixed(4))}`;
  }

  // Micro (µ) - 10^-6
  if (amount >= 1e-6) {
    return `${(amount / 1e-6).toPrecision(precision)} µ`;
  }

  // Nano (n) - 10^-9
  if (amount >= 1e-9) {
    return `${(amount / 1e-9).toPrecision(precision)} n`;
  }

  // Pico (p) - 10^-12
  if (amount >= 1e-12) {
    return `${(amount / 1e-12).toPrecision(precision)} p`;
  }

  // Femto (f) - 10^-15
  if (amount >= 1e-15) {
    return `${(amount / 1e-15).toPrecision(precision)} f`;
  }

  // Other smaller numbers
  if (amount < 1e-15) {
    return `${amount.toExponential(3)}`;
  }

  // Default case
  return `${amount.toPrecision(precision)}`;
}

export function numberFormatter(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "";
  }
  if (amount >= 1e15) {
    return `${(amount / 1e15).toFixed(1)} Q`;
  }
  if (amount >= 1e9) {
    return `${(amount / 1e9).toFixed(1)} B`;
  }

  // Million (M) - 10^6
  if (amount >= 1e6) {
    return `${(amount / 1e6).toFixed(0)} M`;
  }
  // Thousand (K) - 10^3
  if (amount >= 1e3) {
    return `${(amount / 1e3).toFixed(0)} K`;
  }
  // Default case
  return `${amount.toFixed(0)}`;
}
export function percentageFormatter(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || amount === 0) {
    return "";
  }
  if (amount >= 100) {
    return `+${Math.round(amount).toString()}`;
  }
  if (amount >= 10) {
    return `+${amount.toFixed(1)}`;
  }
  if (amount > 0) {
    return `+${amount.toFixed(2)}`;
  }
  return amount.toFixed(2);
}
