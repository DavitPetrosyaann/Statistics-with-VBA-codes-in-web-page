import React, { useState } from 'react';
import { ArrivalHistogramBucket } from '../../types';
import { Package } from 'lucide-react';

interface ArrivalHistogramCardProps {
  arrivalHistogram: ArrivalHistogramBucket[];
}

export const ArrivalHistogramCard: React.FC<ArrivalHistogramCardProps> = ({
  arrivalHistogram,
}) => {
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
            Գալու Ժամանակահատված · Lead Time
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Բեռների Ժամանման Հիստոգրամ (Օրեր)
          </h3>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Պահեստ (Հասած)</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 ml-2" />
          <span>Շտապ (≤ 5 օր)</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {arrivalHistogram.map(bucket => {
          const isWarehouse = bucket.rangeLabel.includes('Պահեստ');
          const isUrgent = bucket.rangeLabel.includes('≤ 5');
          const isSelected = activeBucket === bucket.rangeLabel;

          return (
            <div
              key={bucket.rangeLabel}
              onClick={() => setActiveBucket(isSelected ? null : bucket.rangeLabel)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-slate-800 border-cyan-400' 
                  : isWarehouse
                  ? 'bg-emerald-950/30 border-emerald-800/50'
                  : isUrgent
                  ? 'bg-rose-950/20 border-rose-800/50'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div>
                <div className="text-[11px] font-bold text-slate-200 truncate">{bucket.rangeLabel}</div>
                <div className="mt-1 text-xl font-bold font-mono-numbers text-white">{bucket.count} <span className="text-xs font-normal text-slate-400">բեռ</span></div>
              </div>
              <div className="mt-3 w-full h-10 bg-slate-800/50 rounded p-1 flex items-end">
                <div 
                  style={{ height: `${Math.max(15, bucket.percentage * 1.5)}%` }}
                  className={`w-full rounded ${isWarehouse ? 'bg-emerald-500' : isUrgent ? 'bg-rose-500' : 'bg-cyan-500'}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {activeBucket && (
        <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs">
          <div className="flex items-center justify-between mb-1.5 font-bold text-white">
            <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-cyan-400" /> {activeBucket} բեռներ՝</span>
            <button onClick={() => setActiveBucket(null)} className="text-slate-400 hover:text-white">Փակել</button>
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono">
            {arrivalHistogram.find(b => b.rangeLabel === activeBucket)?.containers.map((c, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-800 rounded text-[11px] text-slate-300">{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
