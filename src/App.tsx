import React, { useState } from 'react';
import { ActiveTab, HeaderNav } from './components/header/HeaderNav';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { MasterOrchestratorView } from './components/orchestrator/MasterOrchestratorView';
import { ListSheetGrid } from './components/list/ListSheetGrid';
import { DatabaseSheetsView } from './components/database/DatabaseSheetsView';
import { PotiArrivalsRadar } from './components/poti/PotiArrivalsRadar';
import { VbaCodeReviewModal } from './components/vba/VbaCodeReviewModal';
import { LogisticsRow, DbItem, SupplierItem } from './types';
import { INITIAL_LOGISTICS_ROWS, ALL_PRODUCTS, SUPPLIERS } from './data/mockData';
import { useLogisticsSync } from './hooks/useLogisticsSync';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [rows, setRows] = useState<LogisticsRow[]>(INITIAL_LOGISTICS_ROWS);
  const [dbItems, setDbItems] = useState<DbItem[]>(ALL_PRODUCTS);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(SUPPLIERS);

  const { syncLogs, isSyncing, lastSyncTime, syncConsoleLogs, handleRunMasterSync } = useLogisticsSync(rows);

  const handleAddRow = (row: LogisticsRow) => setRows(prev => [row, ...prev]);
  const handleUpdateRow = (row: LogisticsRow) => setRows(prev => prev.map(r => r.id === row.id ? row : r));
  const handleDeleteRow = (id: number) => setRows(prev => prev.filter(r => r.id !== id));
  const handleAddDbItem = (item: DbItem) => setDbItems(prev => [...prev, item]);
  const handleAddSupplier = (sup: SupplierItem) => setSuppliers(prev => [...prev, sup]);

  return (
    <div className="min-h-screen bg-[#0B111E] text-slate-100 flex flex-col font-sans">
      <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} onRunMasterSync={handleRunMasterSync} isSyncing={isSyncing} lastSyncTime={lastSyncTime} />
      
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 lg:px-8 py-5">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard rows={rows} dbItems={dbItems} onSelectRow={() => setActiveTab('list')} onRunMasterSync={handleRunMasterSync} />
        )}
        {activeTab === 'orchestrator' && (
          <MasterOrchestratorView syncLogs={syncLogs} rows={rows} onRunMasterSync={handleRunMasterSync} isSyncing={isSyncing} syncConsoleLogs={syncConsoleLogs} />
        )}
        {activeTab === 'list' && (
          <ListSheetGrid rows={rows} dbItems={dbItems} suppliers={suppliers} onAddRow={handleAddRow} onUpdateRow={handleUpdateRow} onDeleteRow={handleDeleteRow} />
        )}
        {activeTab === 'database' && (
          <DatabaseSheetsView dbItems={dbItems} suppliers={suppliers} onAddDbItem={handleAddDbItem} onAddSupplier={handleAddSupplier} />
        )}
        {activeTab === 'poti' && (
          <PotiArrivalsRadar rows={rows} onSelectRow={() => setActiveTab('list')} />
        )}
        {activeTab === 'vba' && (
          <VbaCodeReviewModal />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-[#070D18] py-3 text-center text-xs text-slate-500">
        <div className="max-w-[1700px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Master Logistics Orchestrator · Enterprise Supply Chain Architecture</span>
          <span className="font-mono text-[11px] text-slate-600">Worksheet A:BU (73 Columns) · Status Guard: BU Mandatory · Poti Radar AT:AN</span>
        </div>
      </footer>
    </div>
  );
}
