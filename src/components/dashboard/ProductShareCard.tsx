import React, { useState } from 'react';
import { ProductShareStat } from '../../types';
import { formatCurrency, formatNumber } from '../../utils';

interface ProductShareCardProps {
  productStats: ProductShareStat[];
  selectedItemCode: string;
  setSelectedItemCode: (code: string) => void;
}

export const ProductShareCard: React.FC<ProductShareCardProps> = ({
  productStats,
  selectedItemCode,
  setSelectedItemCode,
}) => {
  const [shareMetric, setShareMetric] = useState<'amount' | 'qty'>('amount');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">
              Ապրանքների Բաշխվածություն
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Տոկոսային Հարաբերություն
            </h3>
          </div>

          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setShareMetric('amount')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                shareMetric === 'amount' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Գումար ($)
            </button>
            <button
              onClick={() => setShareMetric('qty')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                shareMetric === 'qty' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Քանակ (կգ)
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2 max-h-[350px] overflow-y-auto pr-1">
          {productStats.map(prod => {
            const pct = shareMetric === 'amount' ? prod.percentageAmount : prod.percentageQty;
            const valueLabel = shareMetric === 'amount' 
              ? formatCurrency(prod.totalAmount) 
              : `${formatNumber(prod.totalQty, 0)} ${prod.uom}`;

            return (
              <div 
                key={prod.itemCode}
                onClick={() => setSelectedItemCode(prod.itemCode)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  selectedItemCode === prod.itemCode
                    ? 'bg-slate-800/90 border-cyan-500/60 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{prod.itemCode}</span>
                    <span className="text-slate-200 font-medium truncate max-w-[150px]">{prod.itemName}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono-numbers">
                    <span className="text-slate-400">{valueLabel}</span>
                    <span className="font-bold text-white">{pct.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${Math.max(2, pct)}%` }}
                    className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
        <span>Ընդամենը՝ <strong>{productStats.length}</strong> տեսականի</span>
        <span className="font-mono font-semibold text-cyan-400">100% Պորտֆել</span>
      </div>
    </div>
  );
};
