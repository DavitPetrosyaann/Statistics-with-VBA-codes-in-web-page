import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { LogisticsRow } from '../../types';
import { formatNumber } from '../../utils';

interface UrgentArrivalCardsProps {
  urgentDeliveries: LogisticsRow[];
  onSelectRow?: (id: number) => void;
}

export const UrgentArrivalCards: React.FC<UrgentArrivalCardsProps> = ({
  urgentDeliveries,
  onSelectRow,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold text-white">
            Անհապաղ Ժամանումներ (≤ 5 Օր) — Global Filter Feed
          </h3>
        </div>
        <span className="text-[11px] text-rose-400 font-mono">Build_GlobalData()</span>
      </div>

      {urgentDeliveries.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-xs">
          Առաջիկա 5 օրում ժամանող բեռներ չկան:
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {urgentDeliveries.map(r => (
            <div
              key={r.id}
              onClick={() => onSelectRow && onSelectRow(r.id)}
              className="bg-slate-950/80 border border-rose-900/40 hover:border-rose-500 rounded-xl p-3.5 transition-all cursor-pointer text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-rose-300">{r.containerNo || `Պատվեր #${r.id}`}</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">{r.status}</span>
              </div>
              <div className="mt-1 font-semibold text-white truncate">{r.itemCode} — {r.itemName}</div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Թիրախային ETA: <strong className="text-rose-400">{r.potiPlannedEta || r.plannedCustomsEntryDate}</strong></span>
                <span>{formatNumber(r.orderedQty, 0)} {r.uom}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
