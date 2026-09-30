import React, { useState, useMemo } from 'react';
import { LogisticsRow, DbItem } from '../../types';
import { calculateMonthlyPriceStats, calculateProductDistribution, calculateArrivalHistogram } from '../../utils';
import { computeItemStats } from './dashboardCalculations';
import { DashboardBanner } from './DashboardBanner';
import { ExecutiveKpiCards } from './ExecutiveKpiCards';
import { ProductSelectorBar } from './ProductSelectorBar';
import { ProductDrilldownCards } from './ProductDrilldownCards';
import { ProductShipmentsTable } from './ProductShipmentsTable';
import { ProductShareCard } from './ProductShareCard';
import { MonthlyVarianceCard } from './MonthlyVarianceCard';
import { ArrivalHistogramCard } from './ArrivalHistogramCard';
import { StatusClassificationGrid } from './StatusClassificationGrid';

interface ExecutiveDashboardProps {
  rows: LogisticsRow[];
  dbItems: DbItem[];
  onSelectRow?: (rowId: number) => void;
  onRunMasterSync: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  rows,
  dbItems,
  onSelectRow,
  onRunMasterSync,
}) => {
  const [selectedItemCode, setSelectedItemCode] = useState<string>('CHK-01');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const selectedItemMeta = useMemo<DbItem>(() => {
    if (selectedItemCode === 'ALL') {
      return { code: 'ALL', name: 'Բոլոր Կոդերը (Հավ, Խոզ, Տավար)', uom: 'խառը', category: 'Chicken', standardPrice: 0 };
    }
    return dbItems.find(i => i.code === selectedItemCode) || dbItems[0];
  }, [dbItems, selectedItemCode]);

  const { productStats, totalOverallQty, totalOverallAmount, statusTotals } = useMemo(() => calculateProductDistribution(rows, selectedYear), [rows, selectedYear]);
  const monthlyStats = useMemo(() => calculateMonthlyPriceStats(rows, selectedItemCode, selectedYear), [rows, selectedItemCode, selectedYear]);
  const arrivalHistogram = useMemo(() => calculateArrivalHistogram(rows), [rows]);

  const itemRows = useMemo(() => rows.filter(r => (selectedItemCode === 'ALL' || r.itemCode === selectedItemCode) && (selectedYear === 'ALL' || r.orderDate.startsWith(selectedYear))), [rows, selectedItemCode, selectedYear]);
  const itemStats = useMemo(() => computeItemStats(itemRows), [itemRows]);

  return (
    <div className="space-y-6 pb-12">
      <DashboardBanner selectedYear={selectedYear} setSelectedYear={setSelectedYear} onRunMasterSync={onRunMasterSync} />
      <ExecutiveKpiCards
        totalAmount={totalOverallAmount}
        totalQty={totalOverallQty}
        orderCount={rows.length}
        warehouseCount={statusTotals['Պահեստ']?.count || 0}
        warehouseAmount={statusTotals['Պահեստ']?.totalAmount || 0}
        pipelineCount={rows.filter(r => r.status !== 'Պահեստ').length}
        pipelineAmount={rows.filter(r => r.status !== 'Պահեստ').reduce((a, b) => a + b.totalAmount, 0)}
        pipelineQty={rows.filter(r => r.status !== 'Պահեստ').reduce((a, b) => a + b.orderedQty, 0)}
        advanceSettled={rows.reduce((a, b) => a + (b.prepaymentAmount || 0), 0)}
        finalSettled={rows.reduce((a, b) => a + (b.finalPaymentAmount || 0), 0)}
        avgPrepaymentPct={rows.length ? rows.reduce((a, b) => a + b.prepaymentPct, 0) / rows.length : 0}
      />
      <div className="bg-slate-900 border border-cyan-900/40 rounded-xl p-5 shadow-2xl">
        <ProductSelectorBar availableItems={dbItems} selectedItemCode={selectedItemCode} setSelectedItemCode={setSelectedItemCode} selectedItemMeta={selectedItemMeta} />
        <ProductDrilldownCards {...itemStats} uom={selectedItemMeta?.uom || 'կգ'} />
        <ProductShipmentsTable rows={itemRows} selectedItemCode={selectedItemCode} onSelectRow={onSelectRow} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5"><ProductShareCard productStats={productStats} selectedItemCode={selectedItemCode} setSelectedItemCode={setSelectedItemCode} /></div>
        <div className="lg:col-span-7"><MonthlyVarianceCard monthlyStats={monthlyStats} selectedItemCode={selectedItemCode} /></div>
      </div>
      <ArrivalHistogramCard arrivalHistogram={arrivalHistogram} />
      <StatusClassificationGrid statusTotals={statusTotals} />
    </div>
  );
};
