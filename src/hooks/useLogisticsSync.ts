import { useState } from 'react';
import { MasterSyncLog, LogisticsRow } from '../types';
import { INITIAL_SYNC_LOG } from '../data/mockData';

export function useLogisticsSync(rows: LogisticsRow[]) {
  const [syncLogs, setSyncLogs] = useState<MasterSyncLog[]>(INITIAL_SYNC_LOG);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('29/09/2026 14:51');
  const [syncConsoleLogs, setSyncConsoleLogs] = useState<string[]>([
    'System initialized. Master Orchestrator ready.',
    'Worksheet_Change handlers active across columns A:BU.',
    'CheckPotiArrivals scanner initialized for Column AT.',
  ]);

  const handleRunMasterSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);

    const now = new Date();
    const timeStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setSyncConsoleLogs(prev => [
      `[${timeStr}] Initializing Main_UpdateAllData()...`,
      `[${timeStr}] Application.ScreenUpdating = False; Calculation = xlCalculationManual`,
      ...prev.slice(0, 10),
    ]);

    setTimeout(() => {
      setSyncConsoleLogs(prev => [`[${timeStr}] Step 1: Import_ChickenData() complete. 45 rows verified`, ...prev]);
    }, 300);

    setTimeout(() => {
      setSyncConsoleLogs(prev => [`[${timeStr}] Step 2: Import_PorkData() complete. 120 rows verified`, ...prev]);
    }, 600);

    setTimeout(() => {
      setSyncConsoleLogs(prev => [`[${timeStr}] Step 3: Import_BeefData() complete. 85 rows verified`, ...prev]);
    }, 900);

    setTimeout(() => {
      setSyncConsoleLogs(prev => [
        `[${timeStr}] Step 4: Build_GlobalData() complete. Filtered active shipments (<= 5 Days)`,
        `[${timeStr}] Master Sync Complete. Recalculated Mean Prices and Variance.`,
        ...prev,
      ]);

      setSyncLogs([
        { sheetName: 'Chicken', sourceFileStatus: 'Waiting list-final for David.xlsm', lastUpdated: timeStr, rowsCount: 45, status: 'OK' },
        { sheetName: 'Pork', sourceFileStatus: 'Pork Waiting List.xlsm', lastUpdated: timeStr, rowsCount: 120, status: 'OK' },
        { sheetName: 'Beef', sourceFileStatus: 'Beef Waiting List.xlsm', lastUpdated: timeStr, rowsCount: 85, status: 'OK' },
        { sheetName: 'Less Than 5 Days', sourceFileStatus: 'Local Calculation Engine (Global)', lastUpdated: timeStr, rowsCount: 14, status: 'OK' },
      ]);

      setLastSyncTime(timeStr);
      setIsSyncing(false);
    }, 1200);
  };

  return {
    syncLogs,
    isSyncing,
    lastSyncTime,
    syncConsoleLogs,
    handleRunMasterSync,
  };
}
