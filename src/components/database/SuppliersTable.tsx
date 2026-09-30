import React from 'react';
import { SupplierItem } from '../../types';

interface SuppliersTableProps {
  suppliers: SupplierItem[];
}

export const SuppliersTable: React.FC<SuppliersTableProps> = ({ suppliers }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-800/90 text-slate-300 uppercase font-semibold text-[11px] border-b border-slate-700">
          <tr>
            <th className="py-2.5 px-4">Մատակարարի Կոդ (Column A)</th>
            <th className="py-2.5 px-4">Մատակարարի Անվանում (Column B)</th>
            <th className="py-2.5 px-4">Երկիր (Country)</th>
            <th className="py-2.5 px-4">Կոնտակտային Էլ․ հասցե</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-300">
          {suppliers.map(s => (
            <tr key={s.code} className="hover:bg-slate-900/60 transition-colors">
              <td className="py-2.5 px-4 font-mono font-bold text-amber-400">{s.code}</td>
              <td className="py-2.5 px-4 font-semibold text-white">{s.name}</td>
              <td className="py-2.5 px-4 text-slate-400">{s.country}</td>
              <td className="py-2.5 px-4 font-mono text-slate-400">{s.contact || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
