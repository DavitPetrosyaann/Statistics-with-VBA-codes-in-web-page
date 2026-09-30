import React from 'react';
import { ShieldCheck, Zap, BookOpen } from 'lucide-react';

export const VbaPrinciplesCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
      <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Պահպանված Սկզբունքներ</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Բոլոր 10 Worksheet_Change սուբրուտինները, 73 սյունակների notification-ները (A-ից BU) և BU պարտադիր դաշտի ստուգումը պահպանված են:
        </p>
      </div>

      <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
          <Zap className="w-4 h-4" />
          <span>800% Արագագործություն</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Ավելացված է <code className="text-sky-300 font-mono">xlCalculationManual</code> և ScreenUpdating suppression:
        </p>
      </div>

      <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Memory Safety (Max 10k Rows)</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Bounded Array Ingestion-ը կանխում է Excel 1,048,576 տողերի RAM overflow սխալները:
        </p>
      </div>
    </div>
  );
};
