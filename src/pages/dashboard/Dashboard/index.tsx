import { ChartCard } from "./components/ChartCard";
import { RecentLeads } from "./components/RecentLeads";
import { StatsGrid } from "./components/StatsGrid";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-slate-500">Umumiy ko'rsatkichlar va statistika</p>
      </header>

      <StatsGrid />

      <div className="mt-6">
        <ChartCard />
      </div>

      <div className="mt-6">
        <RecentLeads />
      </div>
    </div>
  );
}
