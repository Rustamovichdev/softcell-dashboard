import { formatMoney } from "../data";
import type { Stat } from "../types";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{stat.label}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {stat.money ? formatMoney(stat.value) : stat.value}
      </p>

      {stat.hint && <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>}
    </div>
  );
}
