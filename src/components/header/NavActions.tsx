import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';

interface NavActionsProps {
  onRunMasterSync: () => void;
  isSyncing: boolean;
  lastSyncTime: string;
}

export const NavActions: React.FC<NavActionsProps> = ({
  onRunMasterSync,
  isSyncing,
  lastSyncTime,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>Թարմացված է՝</span>
        <span className="font-mono text-slate-300 font-semibold">{lastSyncTime}</span>
      </div>

      <button
        onClick={onRunMasterSync}
        disabled={isSyncing}
        style={{
          backgroundColor: isSyncing ? '#0369a1' : '#0284c7',
          borderColor: '#0369a1',
        }}
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white rounded-md border shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
        <span>{isSyncing ? 'ՍԻՆՔՐՈՆԻԶԱՑՎՈՒՄ Է...' : 'RUN MASTER SYNC'}</span>
      </button>
    </div>
  );
};
