import React from 'react';
import { ColumnDefinition } from '../../types';
import { X } from 'lucide-react';

interface ColumnInfoModalProps {
  column: ColumnDefinition | null;
  onClose: () => void;
}

export const ColumnInfoModal: React.FC<ColumnInfoModalProps> = ({ column, onClose }) => {
  if (!column) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 shadow-2xl text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs">
              {column.letter}
            </span>
            <h4 className="text-sm font-bold text-white">
              Column_{column.letter}_Notification
            </h4>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-xs font-semibold text-cyan-400">{column.title}</div>
          <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
            {column.description}
          </div>
          {column.formulaNote && (
            <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-800/40 font-mono">
              Բանաձև՝ {column.formulaNote}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg"
          >
            OK (Փակել)
          </button>
        </div>
      </div>
    </div>
  );
};
