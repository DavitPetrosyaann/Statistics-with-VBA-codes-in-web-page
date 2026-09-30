import React from 'react';
import { Play } from 'lucide-react';

interface OrchestratorBannerProps {
  onRunMasterSync: () => void;
  isSyncing: boolean;
}

export const OrchestratorBanner: React.FC<OrchestratorBannerProps> = ({
  onRunMasterSync,
  isSyncing,
}) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              System Architectural Blueprint · Tiered Pipeline
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/50 font-mono">
              Module_MasterOrchestrator
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            MASTER ORCHESTRATOR CONTROL CENTER
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl">
            Decoupled, multi-tiered data pipeline architecture designed to ingest, validate, aggregate, 
            and process logistics tracking files from multiple network shares without UI latency or RAM overhead.
          </p>
        </div>

        <button
          onClick={onRunMasterSync}
          disabled={isSyncing}
          style={{
            backgroundColor: isSyncing ? '#0369a1' : '#0284c7',
            borderColor: '#0369a1',
          }}
          className="px-6 py-2.5 rounded-lg border-2 text-white font-bold text-xs shadow-xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-75 cursor-pointer"
        >
          <Play className={`w-3.5 h-3.5 fill-white ${isSyncing ? 'animate-pulse' : ''}`} />
          <span>{isSyncing ? 'RUNNING MASTER SYNC...' : 'RUN MASTER SYNC'}</span>
        </button>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-sky-400 font-mono font-bold">1. Import_ChickenData()</span>
          <div className="text-slate-300 font-semibold text-[11px] truncate">Waiting list-final.xlsm</div>
        </div>
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-amber-400 font-mono font-bold">2. Import_PorkData()</span>
          <div className="text-slate-300 font-semibold text-[11px] truncate">Pork Waiting List.xlsm</div>
        </div>
        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
          <span className="text-[10px] text-rose-400 font-mono font-bold">3. Import_BeefData()</span>
          <div className="text-slate-300 font-semibold text-[11px] truncate">Beef Waiting List.xlsm</div>
        </div>
        <div className="p-2.5 bg-slate-900 border border-emerald-800/40 rounded-lg">
          <span className="text-[10px] text-emerald-400 font-mono font-bold">4. Build_GlobalData()</span>
          <div className="text-emerald-300 font-semibold text-[11px] truncate">Local Filter (≤ 5 Days)</div>
        </div>
      </div>
    </div>
  );
};
