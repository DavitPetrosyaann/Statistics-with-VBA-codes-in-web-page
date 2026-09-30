import React, { useState } from 'react';
import { DbItem, SupplierItem, ProductCategory } from '../../types';
import { DbHeader } from './DbHeader';
import { DbTabsBar } from './DbTabsBar';
import { DbItemsTable } from './DbItemsTable';
import { SuppliersTable } from './SuppliersTable';
import { AddProductModal } from './AddProductModal';
import { AddSupplierModal } from './AddSupplierModal';

interface DatabaseSheetsViewProps {
  dbItems: DbItem[];
  suppliers: SupplierItem[];
  onAddDbItem: (item: DbItem) => void;
  onAddSupplier: (supplier: SupplierItem) => void;
}

export const DatabaseSheetsView: React.FC<DatabaseSheetsViewProps> = ({
  dbItems,
  suppliers,
  onAddDbItem,
  onAddSupplier,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'Chicken' | 'Pork' | 'Beef' | 'Suppliers'>('Chicken');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  const filteredItems = dbItems.filter(item => {
    return item.category === activeSubTab && (!searchTerm || item.code.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const filteredSuppliers = suppliers.filter(s => {
    return !searchTerm || s.code.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.country.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12">
      <DbHeader activeSubTab={activeSubTab} onOpenAddModal={() => activeSubTab === 'Suppliers' ? setShowAddSupplier(true) : setShowAddProduct(true)} />
      <DbTabsBar activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {activeSubTab === 'Suppliers' ? (
        <SuppliersTable suppliers={filteredSuppliers} />
      ) : (
        <DbItemsTable items={filteredItems} />
      )}

      <AddProductModal show={showAddProduct} onClose={() => setShowAddProduct(false)} category={activeSubTab as ProductCategory} onAdd={onAddDbItem} />
      <AddSupplierModal show={showAddSupplier} onClose={() => setShowAddSupplier(false)} onAdd={onAddSupplier} />
    </div>
  );
};
