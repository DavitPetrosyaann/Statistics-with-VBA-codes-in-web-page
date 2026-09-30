import React from 'react';
import { DbItem, SupplierItem, OrderStatus, LogisticsRow } from '../../types';
import { X, Plus } from 'lucide-react';

interface AddOrderModalProps {
  show: boolean;
  onClose: () => void;
  newRowDraft: Partial<LogisticsRow>;
  setNewRowDraft: React.Dispatch<React.SetStateAction<Partial<LogisticsRow>>>;
  dbItems: DbItem[];
  suppliers: SupplierItem[];
  onSubmit: (e: React.FormEvent) => void;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({
  show,
  onClose,
  newRowDraft,
  setNewRowDraft,
  dbItems,
  suppliers,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-4 shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-emerald-400" /> Նոր Պատվեր (List A:BU)
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={onSubmit} className="mt-3 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-300 mb-1">Ապրանք (C)</label>
              <select
                value={newRowDraft.itemCode}
                onChange={e => {
                  const it = dbItems.find(i => i.code === e.target.value);
                  setNewRowDraft(prev => ({ ...prev, itemCode: e.target.value, itemName: it?.name || '', uom: it?.uom || 'կգ', unitPrice: it?.standardPrice || prev.unitPrice }));
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
              >
                {dbItems.map(it => <option key={it.code} value={it.code}>{it.code} — {it.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Մատակարար (G)</label>
              <select
                value={newRowDraft.supplierCode}
                onChange={e => {
                  const sup = suppliers.find(s => s.code === e.target.value);
                  setNewRowDraft(prev => ({ ...prev, supplierCode: e.target.value, supplierName: sup?.name || '' }));
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
              >
                {suppliers.map(s => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Քանակ (K)</label>
              <input type="number" value={newRowDraft.orderedQty} onChange={e => setNewRowDraft(prev => ({ ...prev, orderedQty: Number(e.target.value), qty: Number(e.target.value) }))} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Գին (L)</label>
              <input type="number" step="0.01" value={newRowDraft.unitPrice} onChange={e => setNewRowDraft(prev => ({ ...prev, unitPrice: Number(e.target.value) }))} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-mono" />
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-800/40 p-2 rounded">
            <label className="block text-rose-400 font-bold mb-1">Column BU: Կարգավիճակ (ՊԱՐՏԱԴԻՐ) *</label>
            <select value={newRowDraft.status} onChange={e => setNewRowDraft(prev => ({ ...prev, status: e.target.value as OrderStatus }))} className="w-full bg-slate-900 border border-rose-500 rounded p-1.5 text-white font-bold">
              <option value="Ճանապարհին">Ճանապարհին</option>
              <option value="Պահեստ">Պահեստ (Delivered)</option>
              <option value="Փոթի Նավահանգիստ">Փոթի Նավահանգիստ</option>
              <option value="Մաքսային Տերմինալ">Մաքսային Տերմինալ</option>
              <option value="Բեռնման փուլ">Բեռնման փուլ</option>
              <option value="Պատվիրված">Պատվիրված</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-slate-800 text-slate-300 rounded">Չեղարկել</button>
            <button type="submit" className="px-4 py-1 bg-emerald-600 text-white font-bold rounded">Ավելացնել</button>
          </div>
        </form>
      </div>
    </div>
  );
};
