import React from 'react';
import { MonthlyPriceStat } from '../../types';
import { formatCurrency } from '../../utils';

interface MonthlyVarianceCardProps {
  monthlyStats: MonthlyPriceStat[];
  selectedItemCode: string;
}

export const MonthlyVarianceCard: React.FC<MonthlyVarianceCardProps> = ({
  monthlyStats,
  selectedItemCode,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">
              Գնային Տատանումներ
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Ամսեկան Միջին Գներ և Variance (σ²)
            </h3>
          </div>
          <span className="text-xs font-bold text-cyan-400 font-mono">
            {selectedItemCode}
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {monthlyStats.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              Տվյալներ չեն գտնվել ընտրված ֆիլտրի համար:
            </div>
          ) : (
            monthlyStats.map(m => (
              <div 
                key={m.monthKey}
                className="bg-slate-950/60 border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono w-16">{m.monthLabel}</span>
                    <span className="text-slate-400">Միջին:</span>
                    <span className="font-bold text-cyan-300 font-mono-numbers">
                      {formatCurrency(m.meanPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono-numbers text-slate-400">
                    <span>Variance: <strong className="text-purple-300">{m.variance.toFixed(4)}</strong></span>
                    <span>σ: <strong className="text-purple-300">±{m.stdDev.toFixed(3)}</strong></span>
                    <span>Պատվեր: <strong className="text-slate-200">{m.ordersCount}</strong></span>
                  </div>
                </div>

                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span>Min {formatCurrency(m.minPrice)}</span>
                  <div className="flex-1 h-1 bg-slate-800 rounded-full relative">
                    <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-purple-500 rounded-full" />
                  </div>
                  <span>Max {formatCurrency(m.maxPrice)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
        <span>Variance = Σ(x - μ)² / (n-1)</span>
        <span className="text-slate-400 font-mono">XLSM Calculations Engine</span>
      </div>
    </div>
  );
};
