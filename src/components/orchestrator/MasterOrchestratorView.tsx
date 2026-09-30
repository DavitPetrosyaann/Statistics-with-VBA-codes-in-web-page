import React, { useState } from 'react';
import { MasterSyncLog, LogisticsRow } from '../../types';
import { getUrgentArrivalsLess5Days } from '../../utils';
import { OrchestratorBanner } from './OrchestratorBanner';
import { LiveStatusTable } from './LiveStatusTable';
import { SubsystemMatrixTab } from './SubsystemMatrixTab';
import { UrgentFeedTab } from './UrgentFeedTab';
import { ArchitecturePrinciplesTab } from './ArchitecturePrinciplesTab';
import { ExecutionTerminal } from './ExecutionTerminal';

interface MasterOrchestratorViewProps {
  syncLogs: MasterSyncLog[];
  rows: LogisticsRow[];
  onRunMasterSync: () => void;
  isSyncing: boolean;
  syncConsoleLogs: string[];
}

export const MasterOrchestratorView: React.FC<MasterOrchestratorViewProps> = ({
  syncLogs,
  rows,
  onRunMasterSync,
  isSyncing,
  syncConsoleLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'urgent' | 'principles'>('matrix');
  const urgentDeliveries = getUrgentArrivalsLess5Days(rows);

  return (
    <div className="space-y-6 pb-12">
      <OrchestratorBanner onRunMasterSync={onRunMasterSync} isSyncing={isSyncing} />
      <LiveStatusTable syncLogs={syncLogs} />

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'matrix' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subsystem Ingestion Matrix
          </button>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'urgent' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Less Than 5 Days Feed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono">
              {urgentDeliveries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'principles' ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Architecture Principles
          </button>
        </div>

        {activeTab === 'matrix' && <SubsystemMatrixTab />}
        {activeTab === 'urgent' && <UrgentFeedTab urgentDeliveries={urgentDeliveries} />}
        {activeTab === 'principles' && <ArchitecturePrinciplesTab />}
      </div>

      <ExecutionTerminal logs={syncConsoleLogs} />
    </div>
  );
};
