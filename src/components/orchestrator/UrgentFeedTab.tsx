import React from 'react';
import { LogisticsRow } from '../../types';
import { formatNumber } from '../../utils';

interface UrgentFeedTabProps {
  urgentDeliveries: LogisticsRow[];
}

export const UrgentFeedTab: React.FC<UrgentFeedTabProps> = ({ urgentDeliveries }) => {
  return (
    <div className="mt-4 space-y-3">
      <div className="text-xs text-slate-400 flex items-center justify-between">
        <span>Առաքումներ, որոնք հասնում են 5 օրվա ընթացքում (≤ 5 Days Arrival)</span>
        <span className="font-mono text-emerald-400 font-bold">{urgentDeliveries.length} բեռ հայտնաբերված</span>
      </div>

      {urgentDeliveries.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-xs">
          Առաջիկա 5 օրում ժամանող բեռներ չկան:
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {urgentDeliveries.map(r => (
            <div key={r.id} className="p-3 bg-slate-950/80 border border-emerald-900/50 rounded-lg text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-400">{r.containerNo || `№ #${r.id}`}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {r.status}
                </span>
              </div>
              <div className="font-semibold text-white mt-1">
                {r.itemCode} — {r.itemName}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>ETA: <strong className="text-white font-mono">{r.potiPlannedEta || r.plannedCustomsEntryDate}</strong></span>
                <span>Քանակ: <strong className="text-white font-mono">{formatNumber(r.orderedQty, 0)} {r.uom}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
