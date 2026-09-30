import React from 'react';
import { ShieldCheck, Database } from 'lucide-react';

export const ArchitecturePrinciplesTab: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg">
        <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>NETWORK DECOUPLING: Zero Cross-Dependency</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Global/Less Than 5 Days calculation reads strictly from updated local sheets, isolating network latency to individual importers.
        </p>
      </div>

      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg">
        <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
          <Database className="w-4 h-4" />
          <span>MEMORY SAFETY (RAM): Bounded Ingestion</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Uses safe upper-bound allocation (Max 10,000 rows) preventing Excel 1,048,576 row memory overflow bugs and crashes.
        </p>
      </div>
    </div>
  );
};
