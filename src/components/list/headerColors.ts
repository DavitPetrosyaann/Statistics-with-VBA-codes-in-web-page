import { ColumnDefinition } from '../../types';

export const getHeaderBg = (groupColor: ColumnDefinition['groupColor']): string => {
  switch (groupColor) {
    case 'green':
      return 'bg-[#008A44] hover:bg-[#007038] text-white';
    case 'yellow':
      return 'bg-[#D4A017] hover:bg-[#B8860B] text-slate-950 font-bold';
    case 'cyan':
      return 'bg-[#0099CC] hover:bg-[#0080B0] text-white';
    case 'orange':
      return 'bg-[#E67E22] hover:bg-[#D35400] text-white';
    case 'crimson':
      return 'bg-[#B00020] hover:bg-[#8B0000] text-white font-black animate-pulse';
    default:
      return 'bg-slate-800 text-white';
  }
};
