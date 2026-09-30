import { ProductCategory } from './orderStatus';

export interface MonthlyPriceStat {
  monthKey: string;
  monthLabel: string;
  year: number;
  month: number;
  itemCode?: string;
  meanPrice: number;
  variance: number;
  stdDev: number;
  minPrice: number;
  maxPrice: number;
  totalQty: number;
  totalAmount: number;
  ordersCount: number;
}

export interface ProductShareStat {
  itemCode: string;
  itemName: string;
  category: ProductCategory;
  uom: string;
  totalQty: number;
  totalAmount: number;
  percentageQty: number;
  percentageAmount: number;
  averagePrice: number;
  priceVariance: number;
  priceStdDev: number;
  minPrice: number;
  maxPrice: number;
  ordersCount: number;
  warehouseCount: number;
  inTransitCount: number;
  customsCount: number;
  potiCount: number;
  otherCount: number;
}

export interface ArrivalHistogramBucket {
  rangeLabel: string;
  minDays: number;
  maxDays: number;
  count: number;
  percentage: number;
  containers: string[];
}

export interface MasterSyncLog {
  sheetName: string;
  sourceFileStatus: string;
  lastUpdated: string;
  rowsCount: number;
  status: 'OK' | 'ERROR';
}
