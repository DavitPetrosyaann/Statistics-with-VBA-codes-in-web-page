import React from 'react';
import { DollarSign, Warehouse, Truck, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber, formatPct } from '../../utils';

interface ExecutiveKpiCardsProps {
  totalAmount: number;
  totalQty: number;
  orderCount: number;
  warehouseCount: number;
  warehouseAmount: number;
  pipelineCount: number;
  pipelineAmount: number;
  pipelineQty: number;
  advanceSettled: number;
  finalSettled: number;
  avgPrepaymentPct: number;
}

export const ExecutiveKpiCards: React.FC<ExecutiveKpiCardsProps> = ({
  totalAmount,
  totalQty,
  orderCount,
  warehouseCount,
  warehouseAmount,
  pipelineCount,
  pipelineAmount,
  pipelineQty,
  advanceSettled,
  finalSettled,
  avgPrepaymentPct,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase">
          <span>Ընդհանուր Ծավալ և Գումար</span>
          <DollarSign className="w-4 h-4 text-blue-400" />
        </div>
        <div className="mt-2 text-2xl font-extrabold text-white font-mono-numbers">
          {formatCurrency(totalAmount)}
        </div>
        <div className="mt-1 text-xs text-slate-400">
          <span className="text-cyan-400 font-mono-numbers">{formatNumber(totalQty, 0)} կգ</span> · {orderCount} Պատվեր
        </div>
      </div>

      <div className="bg-slate-900 border border-emerald-900/50 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 uppercase">
          <span>Պահեստ (Հասել է)</span>
          <Warehouse className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-2 text-2xl font-extrabold text-emerald-400 font-mono-numbers">
          {warehouseCount} <span className="text-xs font-normal text-emerald-300">առաքում</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">
          <span className="text-emerald-300 font-mono-numbers">{formatPct(orderCount ? warehouseCount / orderCount : 0)} բաժին</span> · {formatCurrency(warehouseAmount)}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-400 uppercase">
          <span>Ընթացքի Մեջ (Pipeline)</span>
          <Truck className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-2 text-2xl font-extrabold text-white font-mono-numbers">
          {pipelineCount} <span className="text-xs font-normal text-slate-400">տարանցիկ</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">
          <span className="text-amber-400 font-mono-numbers">{formatCurrency(pipelineAmount)}</span> · {formatNumber(pipelineQty, 0)} կգ
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase">
          <span>Կանխավճար և Մնացորդ</span>
          <TrendingUp className="w-4 h-4 text-purple-400" />
        </div>
        <div className="mt-2 text-2xl font-extrabold text-white font-mono-numbers">
          {formatCurrency(advanceSettled)}
        </div>
        <div className="mt-1 text-xs text-slate-400">
          Միջին {formatPct(avgPrepaymentPct)} · Մնացորդ: {formatCurrency(finalSettled)}
        </div>
      </div>
    </div>
  );
};
