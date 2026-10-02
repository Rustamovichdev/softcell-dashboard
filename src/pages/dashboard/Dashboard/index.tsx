import { ChartCard } from "./components/ChartCard";
import { StatsGrid } from "./components/StatsGrid";
import { MarketingExpenses } from "./components/MarketingExpenses";

export default function Dashboard() {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-6 dark:bg-gray-950">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
        <p className="text-sm text-slate-500 dark:text-gray-400">Umumiy ko'rsatkichlar va statistika</p>
      </header>

      {/* 7 ta asosiy kartochka */}
      <StatsGrid />

      {/* Asosiy grafik va Marketing sarflari bloki */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Katta grafik (2 ustunni egallaydi) */}
        <div className="lg:col-span-2">
          <ChartCard />
        </div>

        {/* Marketing sarflari bloki (1 ustunni egallaydi) */}
        <div className="lg:col-span-1">
          <MarketingExpenses />
        </div>
      </div>
    </div>
  );
}
