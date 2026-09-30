import { LogisticsRow } from '../../types';

export function computeItemStats(itemRows: LogisticsRow[]) {
  const qty = itemRows.reduce((a, b) => a + (b.orderedQty || 0), 0);
  const amount = itemRows.reduce((a, b) => a + (b.totalAmount || 0), 0);
  const prices = itemRows.map(r => r.unitPrice).filter(p => p > 0);
  const avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  const variance = prices.length > 1 ? prices.reduce((a, p) => a + Math.pow(p - avg, 2), 0) / (prices.length - 1) : 0;
  const whCount = itemRows.filter(r => r.status === 'Պահեստ').length;
  
  return {
    count: itemRows.length,
    totalQty: qty,
    totalAmount: amount,
    avgPrice: avg,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    variance,
    stdDev: Math.sqrt(variance),
    warehouseCount: whCount,
    completionRate: itemRows.length ? (whCount / itemRows.length) * 100 : 0,
  };
}
