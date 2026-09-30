import React from 'react';
import { Ship } from 'lucide-react';

interface PotiShipment {
  id: number;
  containerNo: string;
  itemCode: string;
  itemName: string;
  arrivalDate: string;
  daysDiff: number;
}

interface PotiShipmentCardsProps {
  shipments: PotiShipment[];
  onSelectRow?: (id: number) => void;
}

export const PotiShipmentCards: React.FC<PotiShipmentCardsProps> = ({ shipments, onSelectRow }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Ship className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">
            Փոթի Ժամանող Բեռնարկղեր (15-ից 20 օր) — CheckPotiArrivals()
          </h3>
        </div>
        <span className="text-[11px] text-indigo-400 font-mono">DateDiff: 15..20</span>
      </div>

      {shipments.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-xs">
          Այս պահին Փոթի նավահանգիստ 15-20 օրվա ընթացքում ժամանող բեռնարկղեր չկան:
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {shipments.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectRow && onSelectRow(item.id)}
              className="bg-slate-950/80 border border-indigo-900/40 hover:border-indigo-500 rounded-xl p-3.5 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-300 text-xs">{item.containerNo}</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 text-[10px] font-mono font-bold border border-indigo-800">
                  Մնացել է {item.daysDiff} օր
                </span>
              </div>
              <div className="mt-1.5 text-xs font-semibold text-white truncate">
                {item.itemCode} — {item.itemName}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Փոթի ETA:</span>
                <span className="text-white font-bold">{item.arrivalDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
