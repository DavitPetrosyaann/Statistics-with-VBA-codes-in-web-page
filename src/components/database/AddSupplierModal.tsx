import React, { useState } from 'react';
import { SupplierItem } from '../../types';

interface AddSupplierModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (supplier: SupplierItem) => void;
}

export const AddSupplierModal: React.FC<AddSupplierModalProps> = ({
  show,
  onClose,
  onAdd,
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Brazil');
  const [contact, setContact] = useState('');

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;
    onAdd({
      code: code.toUpperCase().trim(),
      name: name.trim(),
      country: country.trim(),
      contact: contact.trim(),
    });
    setCode('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-sm w-full p-4 shadow-2xl text-xs">
        <h3 className="text-sm font-bold text-white mb-2">Ավելացնել Մատակարար</h3>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-slate-400 mb-1">Մատակարարի Կոդ</label>
            <input type="text" required placeholder="SUP-109" value={code} onChange={e => setCode(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-mono" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Անվանում</label>
            <input type="text" required placeholder="Company Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Երկիր</label>
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Էլ. փոստ</label>
              <input type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white" />
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
