import { LogisticsRow, ProductShareStat, OrderStatus } from '../types';

export function calculateProductDistribution(
  rows: LogisticsRow[],
  selectedYear?: string
) {
  let filtered = rows;
  if (selectedYear && selectedYear !== 'ALL') {
    filtered = filtered.filter(r => r.orderDate.startsWith(selectedYear));
  }

  const totalOverallQty = filtered.reduce((acc, r) => acc + (r.orderedQty || 0), 0);
  const totalOverallAmount = filtered.reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  const productMap: Record<string, {
    itemCode: string;
    itemName: string;
    category: any;
    uom: string;
    rows: LogisticsRow[];
  }> = {};

  filtered.forEach(r => {
    if (!productMap[r.itemCode]) {
      productMap[r.itemCode] = {
        itemCode: r.itemCode,
        itemName: r.itemName,
        category: r.category,
        uom: r.uom,
        rows: [],
      };
    }
    productMap[r.itemCode].rows.push(r);
  });

  const productStats: ProductShareStat[] = Object.values(productMap).map(group => {
    const qtySum = group.rows.reduce((acc, r) => acc + (r.orderedQty || 0), 0);
    const amountSum = group.rows.reduce((acc, r) => acc + (r.totalAmount || 0), 0);
    const prices = group.rows.map(r => r.unitPrice).filter(p => p > 0);
    const meanPrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    
    let variance = 0;
    if (prices.length > 1) {
      const sq = prices.reduce((acc, p) => acc + Math.pow(p - meanPrice, 2), 0);
      variance = sq / (prices.length - 1);
    }

    return {
      itemCode: group.itemCode,
      itemName: group.itemName,
      category: group.category,
      uom: group.uom,
      totalQty: qtySum,
      totalAmount: amountSum,
      percentageQty: totalOverallQty > 0 ? (qtySum / totalOverallQty) * 100 : 0,
      percentageAmount: totalOverallAmount > 0 ? (amountSum / totalOverallAmount) * 100 : 0,
      averagePrice: Math.round(meanPrice * 100) / 100,
      priceVariance: Math.round(variance * 10000) / 10000,
      priceStdDev: Math.round(Math.sqrt(variance) * 1000) / 1000,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      ordersCount: group.rows.length,
      warehouseCount: group.rows.filter(r => r.status === 'Պահեստ').length,
      inTransitCount: group.rows.filter(r => r.status === 'Ճանապարհին').length,
      customsCount: group.rows.filter(r => r.status === 'Մաքսային Տերմինալ').length,
      potiCount: group.rows.filter(r => r.status === 'Փոթի Նավահանգիստ').length,
      otherCount: group.rows.filter(r => !['Պահեստ', 'Ճանապարհին', 'Մաքսային Տերմինալ', 'Փոթի Նավահանգիստ'].includes(r.status)).length,
    };
  });

  productStats.sort((a, b) => b.totalAmount - a.totalAmount);

  const statuses: OrderStatus[] = [
    'Պահեստ', 'Ճանապարհին', 'Մաքսային Տերմինալ', 'Փոթի Նավահանգիստ', 'Բեռնման փուլ', 'Պատվիրված'
  ];

  const statusTotals: Record<OrderStatus, { count: number; totalQty: number; totalAmount: number; percentage: number }> = {} as any;
  statuses.forEach(st => {
    const stRows = filtered.filter(r => r.status === st);
    statusTotals[st] = {
      count: stRows.length,
      totalQty: stRows.reduce((acc, r) => acc + (r.orderedQty || 0), 0),
      totalAmount: stRows.reduce((acc, r) => acc + (r.totalAmount || 0), 0),
      percentage: filtered.length > 0 ? (stRows.length / filtered.length) * 100 : 0,
    };
  });

  return { productStats, totalOverallQty, totalOverallAmount, statusTotals };
}
