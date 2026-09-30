import React from 'react';
import { Terminal } from 'lucide-react';

interface ExecutionTerminalProps {
  logs: string[];
}

export const ExecutionTerminal: React.FC<ExecutionTerminalProps> = ({ logs }) => {
  return (
    <div className="bg-[#050B14] border border-slate-800 rounded-xl p-4 shadow-xl">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span>VBA EXECUTION ENGINE TERMINAL LOG</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Application.ScreenUpdating = False</span>
      </div>
      <div className="mt-3 font-mono text-xs text-slate-300 space-y-1 max-h-36 overflow-y-auto pr-2">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-sky-500 select-none">&gt;</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
