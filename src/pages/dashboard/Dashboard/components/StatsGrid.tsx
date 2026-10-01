import { stats } from "../data";
import { StatCard } from "./StatCard";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </div>
  );
}
