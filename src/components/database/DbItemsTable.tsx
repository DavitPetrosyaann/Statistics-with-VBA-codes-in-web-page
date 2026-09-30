import React from 'react';
import { DbItem } from '../../types';
import { formatCurrency } from '../../utils';

interface DbItemsTableProps {
  items: DbItem[];
}

export const DbItemsTable: React.FC<DbItemsTableProps> = ({ items }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-800/90 text-slate-300 uppercase font-semibold text-[11px] border-b border-slate-700">
          <tr>
            <th className="py-2.5 px-4">Ապրանքի Կոդ (Column A)</th>
            <th className="py-2.5 px-4">Ապրանքի Անվանում (Column B)</th>
            <th className="py-2.5 px-4">Չ/Մ (Column C)</th>
            <th className="py-2.5 px-4">Կատեգորիա</th>
            <th className="py-2.5 px-4 text-right">Բազային Գին ($)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-300">
          {items.map(item => (
            <tr key={item.code} className="hover:bg-slate-900/60 transition-colors">
              <td className="py-2.5 px-4 font-mono font-bold text-cyan-400">{item.code}</td>
              <td className="py-2.5 px-4 font-semibold text-white">{item.name}</td>
              <td className="py-2.5 px-4 font-mono text-slate-300">{item.uom}</td>
              <td className="py-2.5 px-4">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                  {item.category}
                </span>
              </td>
              <td className="py-2.5 px-4 text-right font-mono text-amber-300 font-bold">
                {formatCurrency(item.standardPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
