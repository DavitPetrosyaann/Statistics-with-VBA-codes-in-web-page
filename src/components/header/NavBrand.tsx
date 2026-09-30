import React from 'react';

export const NavBrand: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-base">
        M
      </div>
      <div>
        <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
          MASTER ORCHESTRATOR
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
            XLSM PIPELINE
          </span>
        </span>
      </div>
    </div>
  );
};
