import { recentLeads } from "../data";
import type { LeadStatus } from "../types";

const statusBadges: Record<LeadStatus, { label: string; className: string }> = {
  yangi: {
    label: "Yangi",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  aloqada: {
    label: "Aloqada",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  qabul_qilindi: {
    label: "Qabul qilindi",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  bekor_qilindi: {
    label: "Bekor qilindi",
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export function RecentLeads() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">So'nggi arizalar</h2>
          <p className="text-xs text-slate-500">Yangi kelib tushgan murojaatlar ro'yxati</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400">
            <tr>
              <th className="pb-3 pr-4">Mijoz / Talaba</th>
              <th className="pb-3 px-4">Telefon</th>
              <th className="pb-3 px-4">Yo'nalish</th>
              <th className="pb-3 px-4">Vaqti</th>
              <th className="pb-3 pl-4 text-right">Holati</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentLeads.map((lead) => {
              const badge = statusBadges[lead.status];
              return (
                <tr key={lead.id} className="transition hover:bg-slate-50/70">
                  <td className="py-3.5 pr-4 font-medium text-slate-900">
                    {lead.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{lead.phone}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                      {lead.direction}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">{lead.createdAt}</td>
                  <td className="py-3.5 pl-4 text-right">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
