import React from 'react';
import { LogisticsRow } from '../../types';
import { getPotiArrivals15to20Days, getUrgentArrivalsLess5Days } from '../../utils';
import { PotiRadarHeader } from './PotiRadarHeader';
import { PotiShipmentCards } from './PotiShipmentCards';
import { UrgentArrivalCards } from './UrgentArrivalCards';

interface PotiArrivalsRadarProps {
  rows: LogisticsRow[];
  onSelectRow?: (id: number) => void;
}

export const PotiArrivalsRadar: React.FC<PotiArrivalsRadarProps> = ({ rows, onSelectRow }) => {
  const poti15to20 = getPotiArrivals15to20Days(rows);
  const urgentLess5 = getUrgentArrivalsLess5Days(rows);

  return (
    <div className="space-y-6 pb-12">
      <PotiRadarHeader potiCount={poti15to20.length} urgentCount={urgentLess5.length} />
      <PotiShipmentCards shipments={poti15to20} onSelectRow={onSelectRow} />
      <UrgentArrivalCards urgentDeliveries={urgentLess5} onSelectRow={onSelectRow} />
    </div>
  );
};
