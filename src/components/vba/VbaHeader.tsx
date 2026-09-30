import React from 'react';
import { Copy, Check, Download } from 'lucide-react';

interface VbaHeaderProps {
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export const VbaHeader: React.FC<VbaHeaderProps> = ({ onCopy, onDownload, copied }) => {
  return (
    <div className="bg-[#0F172A] border border-rose-900/40 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
              VBA Code Architecture & Optimization Analysis
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50">
              Author: Davit Petrosyan
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            XLSM Մակրոս Կոդերի Վերլուծություն և Օպտիմիզացիա
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-xl">
            Սկզբնական բանաձևերը (N, AB, BG, BI, BJ, BM, BQ), 73 սյունակների ծանուցումները պահպանված են 100%-ով:
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Պատճենված է' : 'Պատճենել'}</span>
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ներբեռնել .BAS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
