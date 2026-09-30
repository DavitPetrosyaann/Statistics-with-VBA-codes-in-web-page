import { LogisticsRow, MonthlyPriceStat } from '../types';

export function calculateMonthlyPriceStats(
  rows: LogisticsRow[], 
  selectedItemCode?: string,
  selectedYear?: string
): MonthlyPriceStat[] {
  let filtered = rows.filter(r => r.unitPrice > 0 && r.orderDate);
  if (selectedItemCode && selectedItemCode !== 'ALL') {
    filtered = filtered.filter(r => r.itemCode === selectedItemCode);
  }
  if (selectedYear && selectedYear !== 'ALL') {
    filtered = filtered.filter(r => r.orderDate.startsWith(selectedYear));
  }

  const groups: Record<string, LogisticsRow[]> = {};
  filtered.forEach(r => {
    const key = r.orderDate.substring(0, 7);
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  const sortedKeys = Object.keys(groups).sort();
  const monthNames = ['Հնվ', 'Փտր', 'Մրտ', 'Ապր', 'Մայ', 'Հուն', 'Հուլ', 'Օգս', 'Սեպ', 'Հոկ', 'Նոյ', 'Դեկ'];

  return sortedKeys.map(key => {
    const groupRows = groups[key];
    const prices = groupRows.map(r => r.unitPrice);
    const n = prices.length;
    const sum = prices.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    let variance = 0;
    if (n > 1) {
      const sumSq = prices.reduce((acc, p) => acc + Math.pow(p - mean, 2), 0);
      variance = sumSq / (n - 1);
    }
    const stdDev = Math.sqrt(variance);

    const [yStr, mStr] = key.split('-');
    const mNum = parseInt(mStr, 10);

    return {
      monthKey: key,
      monthLabel: `${monthNames[mNum - 1]} ${yStr}`,
      year: parseInt(yStr, 10),
      month: mNum,
      meanPrice: Math.round(mean * 100) / 100,
      variance: Math.round(variance * 10000) / 10000,
      stdDev: Math.round(stdDev * 1000) / 1000,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      totalQty: groupRows.reduce((acc, r) => acc + (r.orderedQty || 0), 0),
      totalAmount: groupRows.reduce((acc, r) => acc + (r.totalAmount || 0), 0),
      ordersCount: n,
    };
  });
}
