import React, { useState, useMemo } from 'react';
import { LogisticsRow, DbItem, SupplierItem, ColumnDefinition } from '../../types';
import { buildNewLogisticsRow } from './createRowFactory';
import { ListToolbar } from './ListToolbar';
import { SpreadsheetTable } from './SpreadsheetTable';
import { ColumnInfoModal } from './ColumnInfoModal';
import { SaveValidationModal } from './SaveValidationModal';
import { AddOrderModal } from './AddOrderModal';
import { Check } from 'lucide-react';

interface ListSheetGridProps {
  rows: LogisticsRow[];
  dbItems: DbItem[];
  suppliers: SupplierItem[];
  onAddRow: (newRow: LogisticsRow) => void;
  onUpdateRow: (updatedRow: LogisticsRow) => void;
  onDeleteRow: (id: number) => void;
}

export const ListSheetGrid: React.FC<ListSheetGridProps> = ({
  rows,
  dbItems,
  suppliers,
  onAddRow,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedColumn, setSelectedColumn] = useState<ColumnDefinition | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveValidationMsg, setSaveValidationMsg] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const [newRowDraft, setNewRowDraft] = useState<Partial<LogisticsRow>>({
    orderDate: '2026-09-29',
    itemCode: 'CHK-01',
    qty: 26000,
    orderedQty: 26000,
    unitPrice: 2.85,
    currency: 'USD',
    supplierCode: 'SUP-101',
    status: 'Ճանապարհին',
  });

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      const matchSearch = !searchTerm || r.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || r.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
      const matchCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [rows, searchTerm, statusFilter, categoryFilter]);

  const handleSaveWorkbook = () => {
    const invalid = rows.find(r => !r.status || r.status.trim() === '');
    if (invalid) {
      setSaveValidationMsg(`Cannot save! Column BU is missing at row #${invalid.id}`);
      return;
    }
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    onAddRow(buildNewLogisticsRow(nextId, newRowDraft, dbItems, suppliers));
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4 pb-12">
      <ListToolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} totalRows={rows.length} onOpenAddModal={() => setShowAddModal(true)} onSaveWorkbook={handleSaveWorkbook} />
      {saveSuccessNotice && (
        <div className="p-2.5 bg-emerald-950/80 border border-emerald-600 rounded-lg text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Ֆայլը վավերացվեց: Column BU լրացված է:</span>
        </div>
      )}
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <SpreadsheetTable rows={filteredRows} onHeaderClick={setSelectedColumn} />
      </div>
      <ColumnInfoModal column={selectedColumn} onClose={() => setSelectedColumn(null)} />
      <SaveValidationModal message={saveValidationMsg} onClose={() => setSaveValidationMsg(null)} />
      <AddOrderModal show={showAddModal} onClose={() => setShowAddModal(false)} newRowDraft={newRowDraft} setNewRowDraft={setNewRowDraft} dbItems={dbItems} suppliers={suppliers} onSubmit={handleAddSubmit} />
    </div>
  );
};
