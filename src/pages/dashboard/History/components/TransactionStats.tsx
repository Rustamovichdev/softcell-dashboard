import React from 'react';
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';

export interface TransactionStatsData {
  totalIncome: number;
  projectIncome: number;
  groupIncome: number;
  count: number;
}

interface TransactionStatsProps {
  stats: TransactionStatsData;
}

export const TransactionStats: React.FC<TransactionStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Tushum</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            {stats.totalIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
          </h3>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sotilgan Proektlar</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            {stats.projectIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
          </h3>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Briefcase className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guruhlar Tushumi</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            {stats.groupIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
          </h3>
        </div>
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};