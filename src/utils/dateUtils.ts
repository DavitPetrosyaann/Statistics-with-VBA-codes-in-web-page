export const REFERENCE_DATE_STRING = '2026-09-29';
export const REFERENCE_DATE = new Date(REFERENCE_DATE_STRING);

export function addDaysToDateStr(dateStr: string, days: number): string {
  if (!dateStr || dateStr.trim() === '') return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function diffDays(targetDateStr: string, fromDate = REFERENCE_DATE): number | null {
  if (!targetDateStr || targetDateStr.trim() === '') return null;
  const target = new Date(targetDateStr);
  if (isNaN(target.getTime())) return null;
  const timeDiff = target.getTime() - fromDate.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
