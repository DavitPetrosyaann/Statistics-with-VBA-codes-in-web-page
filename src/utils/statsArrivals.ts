import { LogisticsRow, ArrivalHistogramBucket } from '../types';
import { REFERENCE_DATE, diffDays } from './dateUtils';

export function calculateArrivalHistogram(
  rows: LogisticsRow[],
  refDate = REFERENCE_DATE
): ArrivalHistogramBucket[] {
  const buckets = [
    { label: 'Պահեստ (Հասած)', min: -999, max: -999, containers: [] as string[], count: 0 },
    { label: '≤ 5 օր (Անհապաղ)', min: 0, max: 5, containers: [] as string[], count: 0 },
    { label: '6 - 10 օր', min: 6, max: 10, containers: [] as string[], count: 0 },
    { label: '11 - 15 օր', min: 11, max: 15, containers: [] as string[], count: 0 },
    { label: '16 - 20 օր (Փոթի)', min: 16, max: 20, containers: [] as string[], count: 0 },
    { label: '21 - 30 օր', min: 21, max: 30, containers: [] as string[], count: 0 },
    { label: '> 30 օր (Տարանցիկ)', min: 31, max: 9999, containers: [] as string[], count: 0 },
  ];

  rows.forEach(r => {
    const cName = r.containerNo || `Պատվեր #${r.id}`;
    if (r.status === 'Պահեստ') {
      buckets[0].count++;
      buckets[0].containers.push(cName);
      return;
    }

    const targetDate = r.potiPlannedEta || r.plannedCustomsEntryDate || r.warehouseEntryDate;
    if (!targetDate) {
      buckets[6].count++;
      buckets[6].containers.push(cName);
      return;
    }

    const days = diffDays(targetDate, refDate);
    if (days === null) {
      buckets[6].count++;
      buckets[6].containers.push(cName);
    } else if (days <= 5) {
      buckets[1].count++;
      buckets[1].containers.push(`${cName} (${days} օր)`);
    } else if (days <= 10) {
      buckets[2].count++;
      buckets[2].containers.push(`${cName} (${days} օր)`);
    } else if (days <= 15) {
      buckets[3].count++;
      buckets[3].containers.push(`${cName} (${days} օր)`);
    } else if (days <= 20) {
      buckets[4].count++;
      buckets[4].containers.push(`${cName} (${days} օր)`);
    } else if (days <= 30) {
      buckets[5].count++;
      buckets[5].containers.push(`${cName} (${days} օր)`);
    } else {
      buckets[6].count++;
      buckets[6].containers.push(`${cName} (${days} օր)`);
    }
  });

  const total = rows.length || 1;
  return buckets.map(b => ({
    rangeLabel: b.label,
    minDays: b.min,
    maxDays: b.max,
    count: b.count,
    percentage: Math.round((b.count / total) * 100),
    containers: b.containers,
  }));
}
