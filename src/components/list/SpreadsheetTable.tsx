import React from 'react';
import { LogisticsRow, ColumnDefinition } from '../../types';
import { COLUMN_DEFINITIONS } from '../../data/columnMetadata';
import { getHeaderBg } from './headerColors';
import { formatCurrency, formatNumber, formatPct } from '../../utils';

interface SpreadsheetTableProps {
  rows: LogisticsRow[];
  onHeaderClick: (col: ColumnDefinition) => void;
}

export const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({
  rows,
  onHeaderClick,
}) => {
  return (
    <div className="overflow-x-auto max-h-[620px] relative">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="sticky top-0 z-20 shadow-md">
          <tr className="text-[11px]">
            {COLUMN_DEFINITIONS.map(col => (
              <th
                key={col.letter}
                onClick={() => onHeaderClick(col)}
                className={`py-2 px-2.5 border-r border-b border-slate-900/40 select-none whitespace-nowrap cursor-pointer ${getHeaderBg(col.groupColor)}`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-mono text-[10px] opacity-80">{col.letter}</span>
                  <span className="truncate max-w-[130px]">{col.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
          {rows.map(r => (
            <tr key={r.id} className="hover:bg-slate-900/60 transition-colors">
              {COLUMN_DEFINITIONS.map(col => {
                const val = (r as any)[col.field];
                const isEmpty = val === undefined || val === null || val === '';
                const cellStyle = isEmpty ? { backgroundColor: 'rgb(255, 199, 206)', color: 'rgb(156, 0, 6)' } : {};

                let displayVal = val;
                if (col.isNumeric && typeof val === 'number') {
                  if (col.field === 'prepaymentPct' || col.field === 'finalPaymentPct') displayVal = formatPct(val);
                  else if (col.field === 'unitPrice' || col.field.toString().toLowerCase().includes('amount') || col.field.toString().toLowerCase().includes('cost')) displayVal = formatCurrency(val, r.currency);
                  else displayVal = formatNumber(val, 0);
                }

                return (
                  <td
                    key={col.letter}
                    style={cellStyle}
                    className={`py-1 px-2 border-r border-slate-900/30 whitespace-nowrap max-w-[170px] truncate ${
                      col.isNumeric ? 'text-right' : 'text-left'
                    } ${col.letter === 'BU' ? 'font-bold text-white bg-slate-900/80' : 'text-slate-300'}`}
                  >
                    {col.letter === 'BU' ? (
                      <span className="inline-flex px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-cyan-300">
                        {val || '[Դատարկ]'}
                      </span>
                    ) : (
                      displayVal || '—'
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
