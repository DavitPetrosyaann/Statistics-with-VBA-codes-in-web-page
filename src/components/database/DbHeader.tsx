import React from 'react';
import { Plus } from 'lucide-react';

interface DbHeaderProps {
  activeSubTab: string;
  onOpenAddModal: () => void;
}

export const DbHeader: React.FC<DbHeaderProps> = ({ activeSubTab, onOpenAddModal }) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Database Reference Sheets · DB Lookups
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
              AutoLookup Functions
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Ապրանքների և Մատակարարների Բազաներ
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-xl">
            Այստեղից VBA մակրոսը ավտոմատ լրացնում է ապրանքի անվանումը (D), չափման միավորը (F), և մատակարարի անվանումը (H):
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Ավելացնել {activeSubTab === 'Suppliers' ? 'Մատակարար' : `Ապրանք (${activeSubTab})`}</span>
        </button>
      </div>
    </div>
  );
};
