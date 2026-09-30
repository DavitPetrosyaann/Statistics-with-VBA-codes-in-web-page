import React from 'react';
import { OrderStatus } from '../../types';
import { formatCurrency } from '../../utils';

interface StatusClassificationGridProps {
  statusTotals: Record<OrderStatus, { count: number; totalQty: number; totalAmount: number; percentage: number }>;
}

export const StatusClassificationGrid: React.FC<StatusClassificationGridProps> = ({
  statusTotals,
}) => {
  const items = [
    { status: 'Պահեստ', label: 'Պահեստ (Հասել է)', desc: 'Ավարտված / Հասել է վերջնակետին', color: 'emerald' },
    { status: 'Մաքսային Տերմինալ', label: 'Մաքսային Տերմինալ', desc: 'Մաքսային ձևակերպման փուլ', color: 'amber' },
    { status: 'Փոթի Նավահանգիստ', label: 'Փոթի Նավահանգիստ', desc: 'Բեռնաթափված նավամատույցում', color: 'indigo' },
    { status: 'Ճանապարհին', label: 'Ճանապարհին (Transit)', desc: 'Տարանցիկ ծովային/ցամաքային ուղի', color: 'sky' },
    { status: 'Բեռնման փուլ', label: 'Բեռնման Փուլ', desc: 'Բեռնում ծագման երկրում', color: 'purple' },
    { status: 'Պատվիրված', label: 'Պատվիրված', desc: 'Պայմանագիր կնքված / Արտադրություն', color: 'slate' },
  ] as const;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase text-rose-400 tracking-wider">
            BU Column · Պարտադիր Կարգավիճակ
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Պատվերների Դասակարգում ըստ Կարգավիճակների
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">Սյունակ 73 (BU)</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mt-4">
        {items.map(item => {
          const data = statusTotals[item.status as OrderStatus] || { count: 0, totalAmount: 0, percentage: 0 };
          return (
            <div key={item.status} className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[100px]">{item.label}</span>
                  <span className="text-[10px] font-bold text-cyan-400">{data.percentage.toFixed(0)}%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono-numbers mt-1.5">{data.count} <span className="text-xs font-normal text-slate-400">բեռ</span></div>
                <div className="text-[11px] text-slate-400 font-mono-numbers">{formatCurrency(data.totalAmount)}</div>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-500 truncate">
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
