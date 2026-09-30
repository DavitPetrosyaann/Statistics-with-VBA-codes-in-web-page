import React, { useMemo } from 'react';
import { Search, ChevronDown, PackageCheck, Layers } from 'lucide-react';
import { DbItem } from '../../types';

interface ProductSelectorBarProps {
  availableItems: DbItem[];
  selectedItemCode: string;
  setSelectedItemCode: (code: string) => void;
  selectedItemMeta?: DbItem;
}

const CATEGORIES: Record<string, { label: string; icon: string; badge: string }> = {
  Chicken: { label: 'Chicken db (Հավի Միս)', icon: '🐔', badge: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
  Pork: { label: 'Pork db (Խոզի Միս)', icon: '🥓', badge: 'bg-amber-950 text-amber-400 border-amber-800' },
  Beef: { label: 'Beef db (Տավարի Միս)', icon: '🥩', badge: 'bg-rose-950 text-rose-400 border-rose-800' },
};

export const ProductSelectorBar: React.FC<ProductSelectorBarProps> = ({
  availableItems,
  selectedItemCode,
  setSelectedItemCode,
  selectedItemMeta,
}) => {
  const groupedItems = useMemo(() => {
    const groups: Record<string, DbItem[]> = {};
    availableItems.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [availableItems]);

  const isAll = selectedItemCode === 'ALL';
  const catInfo = !isAll && selectedItemMeta?.category ? CATEGORIES[selectedItemMeta.category] : null;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-cyan-400 animate-pulse" /> Ընտրել Կոդը՝
          </span>
          <div className="relative">
            <select
              value={selectedItemCode}
              onChange={(e) => setSelectedItemCode(e.target.value)}
              className="appearance-none bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-500/80 hover:border-cyan-400 focus:border-cyan-300 text-white font-bold text-xs sm:text-sm px-4 py-2 pr-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 font-mono cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200"
            >
              <option value="ALL" className="bg-slate-950 text-cyan-300 font-bold py-1.5">
                ★ ԲՈԼՈՐ ԿՈԴԵՐԸ (ԸՆԴՀԱՆՈՒՐ ՎԻՃԱԿԱԳՐՈՒԹՅՈՒՆ — {availableItems.length} ԱՊՐԱՆՔ)
              </option>
              {Object.entries(groupedItems).map(([category, items]) => {
                const conf = CATEGORIES[category];
                const label = conf ? `${conf.icon} ${conf.label} [${items.length} ապրանք]` : `${category} db [${items.length}]`;
                return (
                  <optgroup key={category} label={label} className="bg-slate-900 text-cyan-400 font-bold uppercase text-[11px] tracking-wider py-1">
                    {items.map(item => (
                      <option key={item.code} value={item.code} className="bg-slate-950 text-slate-200 font-mono font-medium py-1">
                        {item.code} ── {item.name} ({item.uom})
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 text-cyan-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs shadow-inner">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <PackageCheck className="w-3.5 h-3.5 text-cyan-400" /> Անվանում՝
          </span>
          <span className="font-bold text-white max-w-[220px] truncate">{isAll ? 'Բոլոր Ապրանքները' : selectedItemMeta?.name}</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]">Չ/Մ: {selectedItemMeta?.uom || 'կգ'}</span>
          {isAll ? (
            <span className="px-2 py-0.5 rounded-md border font-semibold text-[11px] bg-cyan-950 text-cyan-300 border-cyan-800">
              ★ 3 Բազաներ
            </span>
          ) : catInfo && (
            <span className={`px-2 py-0.5 rounded-md border font-semibold text-[11px] ${catInfo.badge}`}>{catInfo.icon} {selectedItemMeta?.category} db</span>
          )}
          {!isAll && selectedItemMeta?.standardPrice ? <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/60 text-purple-300 font-mono text-[11px]">Բազային: ${selectedItemMeta.standardPrice.toFixed(2)}</span> : null}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        <span>Բազաներ: <strong className="text-emerald-400">8 Հավ</strong> · <strong className="text-amber-400">8 Խոզ</strong> · <strong className="text-rose-400">8 Տավար</strong></span>
      </div>
    </div>
  );
};
