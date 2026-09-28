import React from 'react';
import { ArrowUpRight, CreditCard, Briefcase, GraduationCap, Wallet } from 'lucide-react';

export interface TransactionItem {
  id: string;
  sourceTitle: string;
  category: string;
  clientOrGroup: string;
  amount: number;
  date: string;
  time: string;
  method: string;
  status: string;
  description?: string;
}

interface TransactionTableProps {
  transactions: TransactionItem[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Project Sale':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Briefcase className="w-3 h-3" /> Proekt Sotildi
          </span>
        );
      case 'Group Fee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <GraduationCap className="w-3 h-3" /> Guruh To'lovi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Wallet className="w-3 h-3" /> {category}
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-2xl border border-slate-200 shadow-sm">
      {transactions.length === 0 ? (
        <div className="p-12 text-center">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Hech qanday tranzaksiya tarixi topilmadi</h3>
          <p className="text-sm text-slate-400 mt-1">Qidiruv yoki filtrlarni o'zgartirib ko'ring.</p>
        </div>
      ) : (
        <div className="min-w-[700px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-xs uppercase font-semibold">
                <th className="py-4 px-6">Manba / Qayerdan</th>
                <th className="py-4 px-6">Turkum</th>
                <th className="py-4 px-6">Mijoz / Guruh</th>
                <th className="py-4 px-6">To'lov Usuli</th>
                <th className="py-4 px-6">Sana & Vaqt</th>
                <th className="py-4 px-6 text-right">Summa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{item.sourceTitle}</div>
                        {item.description && (
                          <div className="text-xs text-slate-400 font-normal truncate max-w-xs">{item.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getCategoryBadge(item.category)}</td>
                  <td className="py-4 px-6 font-medium text-slate-600">{item.clientOrGroup}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                      {item.method}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                    <div>{item.date}</div>
                    <div className="text-slate-400">{item.time}</div>
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-emerald-600">
                    +{item.amount.toLocaleString()} so'm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};