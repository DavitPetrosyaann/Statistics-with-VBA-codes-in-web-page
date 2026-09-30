import React from 'react';
import { Calendar, BarChart2 } from 'lucide-react';

interface DashboardBannerProps {
  selectedYear: string;
  setSelectedYear: (yr: string) => void;
  onRunMasterSync: () => void;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({
  selectedYear,
  setSelectedYear,
  onRunMasterSync,
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Գործադիր Ղեկավարման Պանել · Executive Intelligence
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">Սինքրոնիզացված տվյալներ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Մատակարարման Շղթայի և Լոգիստիկայի Վիճակագրություն
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl">
            Ապրանքների տոկոսային բաշխվածություն, BU կարգավիճակներ, ամսեկան միջին գների և variance-ի հաշվարկ:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg p-1 text-xs">
            <span className="px-2 text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Տարի՝
            </span>
            {(['ALL', '2026', '2025'] as const).map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedYear === yr
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {yr === 'ALL' ? 'Բոլորը' : yr}
              </button>
            ))}
          </div>

          <button
            onClick={onRunMasterSync}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg shadow-md border border-cyan-400/30 transition-transform active:scale-95 cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5 text-cyan-200" />
            <span>ԹԱՐՄԱՑՆԵԼ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
