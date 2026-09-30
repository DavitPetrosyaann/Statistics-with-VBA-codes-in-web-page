export function formatNumber(val: number | undefined | null, decimals = 2): string {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(val: number | undefined | null, currency = 'USD'): string {
  if (val === undefined || val === null || isNaN(val)) return '$0.00';
  const prefix = currency === 'EUR' ? '€' : '$';
  return `${prefix}${formatNumber(val, 2)}`;
}

export function formatPct(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '0%';
  return `${Math.round(val * 100)}%`;
}
