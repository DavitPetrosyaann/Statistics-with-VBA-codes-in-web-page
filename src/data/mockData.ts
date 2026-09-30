import { DbItem, SupplierItem, LogisticsRow, MasterSyncLog } from '../types';
import productsJson from './productDb.json';
import suppliersJson from './suppliers.json';
import mockRowsJson from './mockRows.json';
import syncLogJson from './syncLog.json';

export const ALL_PRODUCTS = productsJson as DbItem[];
export const CHICKEN_DB = ALL_PRODUCTS.filter(p => p.category === 'Chicken');
export const PORK_DB = ALL_PRODUCTS.filter(p => p.category === 'Pork');
export const BEEF_DB = ALL_PRODUCTS.filter(p => p.category === 'Beef');

export const SUPPLIERS = suppliersJson as SupplierItem[];
export const INITIAL_SYNC_LOG = syncLogJson as MasterSyncLog[];
export const INITIAL_LOGISTICS_ROWS = mockRowsJson as LogisticsRow[];
