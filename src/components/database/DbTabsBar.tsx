import React from 'react';
import { Search } from 'lucide-react';

interface DbTabsBarProps {
  activeSubTab: string;
  setActiveSubTab: (tab: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const DbTabsBar: React.FC<DbTabsBarProps> = ({
  activeSubTab,
  setActiveSubTab,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
        {(['Chicken', 'Pork', 'Beef', 'Suppliers'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveSubTab(tab);
              setSearchTerm('');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
              activeSubTab === tab ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'Suppliers' ? 'Suppliers' : `${tab} db`}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Փնտրել կոդ կամ անվանում..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-white text-xs pl-9 pr-4 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-56"
        />
      </div>
    </div>
  );
};
