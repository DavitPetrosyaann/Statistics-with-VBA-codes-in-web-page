import React from 'react';

interface PotiRadarHeaderProps {
  potiCount: number;
  urgentCount: number;
}

export const PotiRadarHeader: React.FC<PotiRadarHeaderProps> = ({ potiCount, urgentCount }) => {
  return (
    <div className="bg-[#0F172A] border border-indigo-900/50 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Port Poti Automated Ingestion Radar · CheckPotiArrivals Sub
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Փոթի Նավահանգստի Ժամանումների Ռադար (15-20 Օր)
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-xl">
            Ավտոմատ սքանավորում է Column AT-ն (Փոթի ETA) և առանձնացնում է 15-ից 20 օրվա միջակայքում ժամանող բեռնարկղերը:
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-indigo-950/80 border border-indigo-700/60 rounded-lg text-center">
            <span className="text-[10px] text-indigo-300 uppercase font-semibold">15-20 Օրվա Մեջ</span>
            <div className="text-xl font-bold text-white font-mono">{potiCount} բեռ</div>
          </div>
          <div className="px-3.5 py-2 bg-rose-950/80 border border-rose-700/60 rounded-lg text-center">
            <span className="text-[10px] text-rose-300 uppercase font-semibold">Շտապ (≤ 5 Օր)</span>
            <div className="text-xl font-bold text-rose-300 font-mono">{urgentCount} բեռ</div>
          </div>
        </div>
      </div>
    </div>
  );
};
