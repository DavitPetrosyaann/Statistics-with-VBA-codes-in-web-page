import React from 'react';
import { formatCurrency, formatNumber } from '../../utils';

interface ProductDrilldownCardsProps {
  count: number;
  totalQty: number;
  totalAmount: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  variance: number;
  stdDev: number;
  warehouseCount: number;
  completionRate: number;
  uom: string;
}

export const ProductDrilldownCards: React.FC<ProductDrilldownCardsProps> = ({
  count,
  totalQty,
  totalAmount,
  avgPrice,
  minPrice,
  maxPrice,
  variance,
  stdDev,
  warehouseCount,
  completionRate,
  uom,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
        <span className="text-[11px] text-slate-400 uppercase font-medium">Պատվերների Քանակ</span>
        <div className="text-base font-bold text-white font-mono-numbers mt-0.5">
          {count} <span className="text-xs text-slate-400 font-normal">պատվեր</span>
        </div>
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
        <span className="text-[11px] text-slate-400 uppercase font-medium">Ընդհանուր Քանակ</span>
        <div className="text-base font-bold text-cyan-400 font-mono-numbers mt-0.5">
          {formatNumber(totalQty, 0)} <span className="text-xs text-slate-400 font-normal">{uom}</span>
        </div>
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
        <span className="text-[11px] text-slate-400 uppercase font-medium">Ընդհանուր Գումար</span>
        <div className="text-base font-bold text-white font-mono-numbers mt-0.5">
          {formatCurrency(totalAmount)}
        </div>
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
        <span className="text-[11px] text-amber-400 uppercase font-medium">Միջին Գին (Mean)</span>
        <div className="text-base font-bold text-amber-300 font-mono-numbers mt-0.5">
          {formatCurrency(avgPrice)}
        </div>
        <span className="text-[10px] text-slate-500">
          Min {formatCurrency(minPrice)} · Max {formatCurrency(maxPrice)}
        </span>
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
        <span className="text-[11px] text-purple-400 uppercase font-medium">Variance (σ²)</span>
        <div className="text-base font-bold text-purple-300 font-mono-numbers mt-0.5">
          {variance.toFixed(4)}
        </div>
        <span className="text-[10px] text-slate-500">
          StdDev: ±{stdDev.toFixed(3)}
        </span>
      </div>

      <div className="bg-slate-950/70 border border-emerald-900/50 rounded-lg p-2.5">
        <span className="text-[11px] text-emerald-400 uppercase font-medium">Պահեստ Հասած %</span>
        <div className="text-base font-bold text-emerald-400 font-mono-numbers mt-0.5">
          {Math.round(completionRate)}%
        </div>
        <span className="text-[10px] text-emerald-400/80">
          {warehouseCount} / {count} ավարտված
        </span>
      </div>
    </div>
  );
};
