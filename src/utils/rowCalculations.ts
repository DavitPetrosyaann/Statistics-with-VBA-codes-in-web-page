import { LogisticsRow, DbItem, SupplierItem } from '../types';
import { addDaysToDateStr } from './dateUtils';

export function recalculateRow(
  row: LogisticsRow, 
  dbItems: DbItem[], 
  suppliers: SupplierItem[]
): LogisticsRow {
  const updated = { ...row };

  // 1. Auto-lookup item details (C -> D, F)
  if (updated.itemCode) {
    const item = dbItems.find(i => i.code.toLowerCase() === updated.itemCode.trim().toLowerCase());
    if (item) {
      updated.itemName = item.name;
      updated.uom = item.uom;
      updated.category = item.category;
    }
  }

  // 2. Auto-lookup supplier details (G -> H)
  if (updated.supplierCode) {
    const sup = suppliers.find(s => s.code.toLowerCase() === updated.supplierCode.trim().toLowerCase());
    if (sup) {
      updated.supplierName = sup.name;
    }
  }

  // 3. Prepayment and Final payment percentages (V -> Y)
  let v = updated.prepaymentPct;
  if (v > 1) v = v / 100;
  updated.prepaymentPct = v;
  updated.finalPaymentPct = Math.max(0, 1 - v);

  // 4. Total Amount (N = K * L)
  const k = Number(updated.orderedQty) || 0;
  const l = Number(updated.unitPrice) || 0;
  updated.totalAmount = Math.round(k * l * 100) / 100;

  // 5. Prepayment Amount (AB = K * L * V)
  updated.prepaymentAmount = Math.round(k * l * v * 100) / 100;

  // 6. Invoiced Amount (BG = BF * L)
  const bf = Number(updated.invoicedQty) || 0;
  updated.invoicedAmount = Math.round(bf * l * 100) / 100;

  // 7. Final Payment Amount (BI = (BF * L) - (K * L * V) - BH)
  const bh = Number(updated.retentionAmount) || 0;
  if (bf > 0 && l > 0) {
    const invoicedTotal = bf * l;
    const advancePaid = k * l * v;
    updated.finalPaymentAmount = Math.round((invoicedTotal - advancePaid - bh) * 100) / 100;
  }

  // 8. Synchronize Customs Release Date (BQ = BP)
  if (updated.customsReleaseDate && !updated.customsPaymentDate) {
    updated.customsPaymentDate = updated.customsReleaseDate;
  }

  // 9. Calculate Planned Dates from AT (BJ = AT - 20, BM = AT + 4)
  if (updated.potiPlannedEta) {
    if (!updated.plannedFinalPaymentDate) {
      updated.plannedFinalPaymentDate = addDaysToDateStr(updated.potiPlannedEta, -20);
    }
    if (!updated.plannedCustomsEntryDate) {
      updated.plannedCustomsEntryDate = addDaysToDateStr(updated.potiPlannedEta, 4);
    }
  }

  return updated;
}
