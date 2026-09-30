import React from 'react';
import { Search, Plus, Save } from 'lucide-react';

interface ListToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  totalRows: number;
  onOpenAddModal: () => void;
  onSaveWorkbook: () => void;
}

export const ListToolbar: React.FC<ListToolbarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  totalRows,
  onOpenAddModal,
  onSaveWorkbook,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Փնտրել ապրանք, կոդ, կոնտեյներ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 w-56 sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Կարգավիճակ՝</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="ALL">Բոլորը ({totalRows})</option>
            <option value="Պահեստ">Պահեստ (Հասել է)</option>
            <option value="Ճանապարհին">Ճանապարհին</option>
            <option value="Փոթի Նավահանգիստ">Փոթի Նավահանգիստ</option>
            <option value="Մաքսային Տերմինալ">Մաքսային Տերմինալ</option>
            <option value="Բեռնման փուլ">Բեռնման փուլ</option>
            <option value="Պատվիրված">Պատվիրված</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Կատեգորիա՝</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs px-2.5 py-1.5 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="ALL">Բոլորը</option>
            <option value="Chicken">Chicken (Հավ)</option>
            <option value="Pork">Pork (Խոզ)</option>
            <option value="Beef">Beef (Տավար)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ավելացնել Տող</span>
        </button>

        <button
          onClick={onSaveWorkbook}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Պահպանել</span>
        </button>
      </div>
    </div>
  );
};
