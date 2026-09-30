import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface SaveValidationModalProps {
  message: string | null;
  onClose: () => void;
}

export const SaveValidationModal: React.FC<SaveValidationModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-rose-600 rounded-xl max-w-lg w-full p-6 shadow-2xl text-left">
        <div className="flex items-center gap-3 text-rose-500 mb-3">
          <AlertOctagon className="w-8 h-8 shrink-0" />
          <h3 className="text-lg font-bold text-white">Workbook BeforeSave Validation Alert</h3>
        </div>
        <p className="text-rose-200 text-sm bg-rose-950/50 p-3 rounded-lg border border-rose-800/60 font-mono">
          {message}
        </p>
        <p className="text-slate-400 text-xs mt-3">
          Ըստ XLSM կոդի կանոնի՝ ֆայլը չի կարող պահպանվել, քանի որ Column BU-ն (Կարգավիճակ) պարտադիր դաշտ է:
        </p>
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg"
          >
            Լավ, հասկացա (Փակել)
          </button>
        </div>
      </div>
    </div>
  );
};
