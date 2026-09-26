/**
 * Financial Formatting Utilities
 */

export function formatCurrency(amount, decimals = 0) {
  const num = Number(amount);
  if (isNaN(num)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercent(rate, decimals = 1) {
  const num = Number(rate);
  if (isNaN(num)) return '0.0%';
  return `${(num * 100).toFixed(decimals)}%`;
}

export function formatNumber(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function parseFormattedNumber(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  const cleaned = String(str).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
