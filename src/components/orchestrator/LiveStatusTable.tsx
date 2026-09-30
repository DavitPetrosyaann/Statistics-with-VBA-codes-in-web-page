import React from 'react';
import { MasterSyncLog } from '../../types';
import { FileSpreadsheet } from 'lucide-react';

interface LiveStatusTableProps {
  syncLogs: MasterSyncLog[];
}

export const LiveStatusTable: React.FC<LiveStatusTableProps> = ({ syncLogs }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-400">Blueprint Section 4 & 5</span>
            <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">Range A12:E20</span>
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            Live Execution & Status Monitor Log
          </h3>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Conditional Formatting: RGB(198, 239, 206) for OK</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1E293B] text-white font-bold text-xs uppercase border-b border-slate-700">
            <tr>
              <th className="py-2.5 px-4">Sheet Name</th>
              <th className="py-2.5 px-4">Source File Status</th>
              <th className="py-2.5 px-4">Last Updated</th>
              <th className="py-2.5 px-4 text-right">Rows Count</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-950">
            {syncLogs.map((log) => {
              const isOk = log.status === 'OK';
              return (
                <tr key={log.sheetName} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-sky-400" />
                    <span>{log.sheetName}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-300 font-mono text-[11px]">{log.sourceFileStatus}</td>
                  <td className="py-2.5 px-4 text-slate-400 font-mono">{log.lastUpdated}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-white">{log.rowsCount}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span
                      style={{
                        backgroundColor: isOk ? 'rgb(198, 239, 206)' : 'rgb(255, 199, 206)',
                        color: isOk ? 'rgb(0, 97, 0)' : 'rgb(156, 0, 6)',
                      }}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-black uppercase"
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
