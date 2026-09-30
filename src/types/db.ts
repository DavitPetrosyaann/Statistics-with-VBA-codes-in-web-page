import { ProductCategory } from './orderStatus';

export interface DbItem {
  code: string;
  name: string;
  uom: string;
  category: ProductCategory;
  standardPrice?: number;
}

export interface SupplierItem {
  code: string;
  name: string;
  country: string;
  contact?: string;
}
