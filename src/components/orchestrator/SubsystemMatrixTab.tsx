import React from 'react';

export const SubsystemMatrixTab: React.FC = () => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-800/90 text-slate-300 uppercase font-semibold text-[11px]">
          <tr>
            <th className="py-2.5 px-3">Subsystem Sheet</th>
            <th className="py-2.5 px-3">Network Source Reference File</th>
            <th className="py-2.5 px-3">Row Boundary</th>
            <th className="py-2.5 px-3">Output Sheet</th>
            <th className="py-2.5 px-3">Target Columns</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 text-slate-300">
          <tr>
            <td className="py-2 px-3 font-bold text-white">Chicken</td>
            <td className="py-2 px-3 font-mono text-slate-400">Waiting list-final for David.xlsm</td>
            <td className="py-2 px-3 font-mono text-amber-400">10,000 max</td>
            <td className="py-2 px-3 text-sky-400 font-bold">Chicken</td>
            <td className="py-2 px-3 font-mono text-slate-400">A:N (14 Columns)</td>
          </tr>
          <tr>
            <td className="py-2 px-3 font-bold text-white">Pork</td>
            <td className="py-2 px-3 font-mono text-slate-400">Pork Waiting List.xlsm</td>
            <td className="py-2 px-3 font-mono text-amber-400">10,000 max</td>
            <td className="py-2 px-3 text-sky-400 font-bold">Pork</td>
            <td className="py-2 px-3 font-mono text-slate-400">A:N (14 Columns)</td>
          </tr>
          <tr>
            <td className="py-2 px-3 font-bold text-white">Beef</td>
            <td className="py-2 px-3 font-mono text-slate-400">Beef Waiting List.xlsm</td>
            <td className="py-2 px-3 font-mono text-amber-400">10,000 max</td>
            <td className="py-2 px-3 text-sky-400 font-bold">Beef</td>
            <td className="py-2 px-3 font-mono text-slate-400">A:N (14 Columns)</td>
          </tr>
          <tr className="bg-emerald-950/20">
            <td className="py-2 px-3 font-bold text-emerald-300">Less Than 5 Days</td>
            <td className="py-2 px-3 font-mono text-slate-400">Local Calculation Engine (Global)</td>
            <td className="py-2 px-3 font-mono text-emerald-400">Calculated</td>
            <td className="py-2 px-3 text-emerald-300 font-bold">Less Than 5 Days</td>
            <td className="py-2 px-3 font-mono text-emerald-400">Filtered Output</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
