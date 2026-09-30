import { LogisticsRow } from '../types';
import { REFERENCE_DATE, diffDays } from './dateUtils';

export function getPotiArrivals15to20Days(rows: LogisticsRow[], refDate = REFERENCE_DATE) {
  const matches: {
    id: number;
    containerNo: string;
    itemCode: string;
    itemName: string;
    arrivalDate: string;
    daysDiff: number;
  }[] = [];

  rows.forEach(r => {
    if (r.status === 'Պահեստ') return;
    if (r.potiPlannedEta) {
      const d = diffDays(r.potiPlannedEta, refDate);
      if (d !== null && d >= 15 && d <= 20) {
        matches.push({
          id: r.id,
          containerNo: r.containerNo || '[Կոնտեյների № չկա]',
          itemCode: r.itemCode,
          itemName: r.itemName,
          arrivalDate: r.potiPlannedEta,
          daysDiff: d,
        });
      }
    }
  });

  return matches.sort((a, b) => a.daysDiff - b.daysDiff);
}

export function getUrgentArrivalsLess5Days(rows: LogisticsRow[], refDate = REFERENCE_DATE): LogisticsRow[] {
  return rows.filter(r => {
    if (r.status === 'Պահեստ') return false;
    const targetDate = r.potiPlannedEta || r.plannedCustomsEntryDate || r.warehouseEntryDate;
    if (!targetDate) return false;
    const d = diffDays(targetDate, refDate);
    return d !== null && d >= 0 && d <= 5;
  });
}
