import { marketingExpenses, formatMoney } from "../data";

export function MarketingExpenses() {
  const totalSpent = marketingExpenses.reduce((sum, item) => sum + item.spent, 0);
  const totalBudget = marketingExpenses.reduce((sum, item) => sum + item.budget, 0);
  const totalLeads = marketingExpenses.reduce((sum, item) => sum + item.leadsCount, 0);
  const spentPercent = Math.min(Math.round((totalSpent / totalBudget) * 100), 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Sarlavha va umumiy ko'rsatkich */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-gray-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Marketing sarflari va kanallar
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            Jami sarf: <span className="font-semibold text-slate-900 dark:text-white">{formatMoney(totalSpent)} so'm</span> (rejadan {spentPercent}%)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            {totalLeads} ta lid keldi
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-gray-800 dark:text-gray-300">
            Reja: {formatMoney(totalBudget)}
          </span>
        </div>
      </div>

      {/* Kanallar ro'yxati */}
      <div className="space-y-3.5">
        {marketingExpenses.map((m) => {
          const progress = Math.min(Math.round((m.spent / m.budget) * 100), 100);

          return (
            <div key={m.id} className="rounded-lg border border-slate-100 p-3 hover:bg-slate-50/50 transition dark:border-gray-800 dark:hover:bg-gray-800/40">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800 dark:text-gray-200">
                  {m.channel}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatMoney(m.spent)} / {formatMoney(m.budget)} so'm
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>

              {/* Qo'shimcha statistika: Lidlar soni va har bir lid narxi (CPL) */}
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
                <span>Lidlar: <b className="text-slate-800 dark:text-gray-200">{m.leadsCount} ta</b></span>
                <span>O'rtacha lid narxi: <b className="text-slate-800 dark:text-gray-200">{formatMoney(m.costPerLead)} so'm</b></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
