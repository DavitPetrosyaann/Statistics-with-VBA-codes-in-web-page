import React, { useState } from 'react';
import { FileCode2, ShieldAlert } from 'lucide-react';
import { VbaHeader } from './VbaHeader';
import { VbaPrinciplesCards } from './VbaPrinciplesCards';
import { DASHBOARD_ENGINE_CODE } from './snippets/dashboardEngineCode';
import { WORKSHEET_CHANGE_CODE } from './snippets/worksheetChangeCode';
import { THIS_WORKBOOK_CODE } from './snippets/thisWorkbookCode';
import { ORCHESTRATOR_CODE } from './snippets/orchestratorCode';
import { POTI_RADAR_CODE } from './snippets/potiRadarCode';

type CodeTab = 'dashboard' | 'worksheet' | 'thisworkbook' | 'orchestrator' | 'poti';

const CODE_FILES: Record<CodeTab, { name: string; code: string; ext: string }> = {
  dashboard: { name: '03_Dashboard_Macro_Engine', code: DASHBOARD_ENGINE_CODE, ext: '.bas' },
  worksheet: { name: '01_Sheet_List_Events', code: WORKSHEET_CHANGE_CODE, ext: '.cls' },
  thisworkbook: { name: '02_ThisWorkbook_Events', code: THIS_WORKBOOK_CODE, ext: '.cls' },
  orchestrator: { name: '04_Master_Orchestrator', code: ORCHESTRATOR_CODE, ext: '.bas' },
  poti: { name: '05_Poti_Radar_Alerts', code: POTI_RADAR_CODE, ext: '.bas' },
};

export const VbaCodeReviewModal: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('dashboard');
  const [copied, setCopied] = useState(false);
  const current = CODE_FILES[activeCodeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([current.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.name}${current.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      <VbaHeader onCopy={handleCopy} onDownload={handleDownload} copied={copied} />
      <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Պանակ՝ <code className="font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">/vba_excel_modules/</code> (Read-Only) · Տվյալները վերցվում են <strong>բացառապես</strong> sheet-երից:</span>
        </div>
        <button onClick={handleCopy} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors">
          {copied ? 'Պատճենվա՛ծ է' : 'Copy VBA'}
        </button>
      </div>
      <VbaPrinciplesCards />
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {(Object.keys(CODE_FILES) as CodeTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveCodeTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeCodeTab === tab ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800/50'
            }`}
          >
            {CODE_FILES[tab].name}{CODE_FILES[tab].ext}
          </button>
        ))}
      </div>
      <div className="bg-[#050B14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold">{current.name}{current.ext}</span>
          </div>
          <span className="text-[11px] text-cyan-400">Strictly Reads From Worksheets</span>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[480px] leading-relaxed">
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  );
};
