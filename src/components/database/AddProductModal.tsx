import React, { useState } from 'react';
import { DbItem, ProductCategory } from '../../types';

interface AddProductModalProps {
  show: boolean;
  onClose: () => void;
  category: ProductCategory;
  onAdd: (item: DbItem) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  show,
  onClose,
  category,
  onAdd,
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [uom, setUom] = useState('կգ');
  const [price, setPrice] = useState(3.0);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;
    onAdd({
      code: code.toUpperCase().trim(),
      name: name.trim(),
      uom,
      category,
      standardPrice: Number(price) || 0,
    });
    setCode('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-sm w-full p-4 shadow-2xl text-xs">
        <h3 className="text-sm font-bold text-white mb-2">Ավելացնել Ապրանք ({category} db)</h3>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-slate-400 mb-1">Ապրանքի Կոդ</label>
            <input type="text" required placeholder="Կոդ" value={code} onChange={e => setCode(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-mono" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Անվանում</label>
            <input type="text" required placeholder="Անվանում" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Չ/Մ</label>
              <input type="text" value={uom} onChange={e => setUom(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Գին ($)</label>
              <input type="number" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-slate-800 text-slate-300 rounded">Չեղարկել</button>
            <button type="submit" className="px-4 py-1 bg-amber-600 text-white rounded font-bold">Պահպանել</button>
          </div>
        </form>
      </div>
    </div>
  );
};
