import { LogisticsRow } from './logisticsRow';

export interface ColumnDefinition {
  letter: string;
  title: string;
  field: keyof LogisticsRow;
  groupColor: 'green' | 'yellow' | 'cyan' | 'orange' | 'crimson';
  description: string;
  formulaNote?: string;
  isNumeric?: boolean;
  isDate?: boolean;
}
