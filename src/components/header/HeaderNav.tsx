import React from 'react';
import { NavBrand } from './NavBrand';
import { NavLinks, ActiveTab } from './NavLinks';
import { NavActions } from './NavActions';

export type { ActiveTab };

interface HeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onRunMasterSync: () => void;
  isSyncing: boolean;
  lastSyncTime: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onRunMasterSync,
  isSyncing,
  lastSyncTime,
}) => {
  return (
    <header className="border-b border-slate-800 bg-[#0F172A] sticky top-0 z-50 shadow-md">
      <div className="max-w-[1700px] mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between">
        <NavBrand />
        <NavLinks activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavActions 
          onRunMasterSync={onRunMasterSync} 
          isSyncing={isSyncing} 
          lastSyncTime={lastSyncTime} 
        />
      </div>
    </header>
  );
};
