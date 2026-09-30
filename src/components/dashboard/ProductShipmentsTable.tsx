import React from 'react';
import { LogisticsRow } from '../../types';
import { formatCurrency, formatNumber } from '../../utils';

interface ProductShipmentsTableProps {
  rows: LogisticsRow[];
  selectedItemCode: string;
  onSelectRow?: (id: number) => void;
}

export const ProductShipmentsTable: React.FC<ProductShipmentsTableProps> = ({
  rows,
  selectedItemCode,
  onSelectRow,
}) => {
  if (rows.length === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-300">
          {selectedItemCode === 'ALL' ? 'Բոլոր Կոդերը' : selectedItemCode} — Առաքումների Ցուցակ ({rows.length} պատվեր)
        </span>
        <span className="text-[11px] text-slate-500">Սյունակ AN · AT · BU</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/90 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-700">
            <tr>
              <th className="py-2 px-3">Հ/Հ · Կոդ</th>
              <th className="py-2 px-3">Ամսաթիվ</th>
              <th className="py-2 px-3">Մատակարար</th>
              <th className="py-2 px-3 text-right">Քանակ</th>
              <th className="py-2 px-3 text-right">Գին</th>
              <th className="py-2 px-3 text-right">Գումար</th>
              <th className="py-2 px-3">Կոնտեյներ (AN)</th>
              <th className="py-2 px-3">Փոթի ETA (AT)</th>
              <th className="py-2 px-3">Կարգավիճակ (BU)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
            {rows.map(r => (
              <tr 
                key={r.id} 
                onClick={() => onSelectRow && onSelectRow(r.id)}
                className="hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <td className="py-1.5 px-3 font-medium text-slate-400">
                  #{r.id} <span className="text-cyan-400 font-bold ml-1">{r.itemCode}</span>
                </td>
                <td className="py-1.5 px-3 text-slate-300">{r.orderDate}</td>
                <td className="py-1.5 px-3 font-sans truncate max-w-[130px]">{r.supplierName}</td>
                <td className="py-1.5 px-3 text-right">{formatNumber(r.orderedQty, 0)} {r.uom}</td>
                <td className="py-1.5 px-3 text-right text-amber-300">{formatCurrency(r.unitPrice, r.currency)}</td>
                <td className="py-1.5 px-3 text-right font-bold text-white">{formatCurrency(r.totalAmount, r.currency)}</td>
                <td className="py-1.5 px-3 text-cyan-300">{r.containerNo || '—'}</td>
                <td className="py-1.5 px-3 text-slate-400">{r.potiPlannedEta || '—'}</td>
                <td className="py-1.5 px-3 font-sans">
                  <span className={`inline-flex px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                    r.status === 'Պահեստ' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : r.status === 'Ճանապարհին'
                      ? 'bg-sky-950 text-sky-300 border border-sky-800'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
