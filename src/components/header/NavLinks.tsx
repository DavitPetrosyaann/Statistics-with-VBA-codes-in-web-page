import React from 'react';
import { BarChart3, Cpu, Table, Database, Anchor, FileCode2 } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'orchestrator' | 'list' | 'database' | 'poti' | 'vba';

interface NavLinksProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Վիճակագրություն (Dashboard)', icon: BarChart3, color: 'text-cyan-400' },
    { id: 'orchestrator', label: 'Master Orchestrator', icon: Cpu, color: 'text-blue-400' },
    { id: 'list', label: 'Հիմնական Ֆայլ (List A:BU)', icon: Table, color: 'text-emerald-400' },
    { id: 'database', label: 'Բազաներ (db)', icon: Database, color: 'text-amber-400' },
    { id: 'poti', label: 'Փոթի Ռադար (15-20 օր)', icon: Anchor, color: 'text-indigo-400' },
    { id: 'vba', label: 'VBA Կոդ', icon: FileCode2, color: 'text-rose-400' },
  ] as const;

  return (
    <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
      {tabs.map(({ id, label, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap text-xs font-semibold ${
            activeTab === id
              ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/60'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Icon className={`w-3.5 h-3.5 ${color}`} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};
