import { useState } from "react";
import { chartData } from "../data";
import type { ChartPoint, Period } from "../types";

const periods: { key: Period; label: string }[] = [
  { key: "day", label: "Kunlik" },
  { key: "week", label: "Haftalik" },
  { key: "month", label: "Oylik" },
  { key: "year", label: "Yillik" },
];

const W = 600, H = 220, PAD = 30;

export function ChartCard() {
  const [period, setPeriod] = useState<Period>("week");
  const points: ChartPoint[] = chartData[period];

  const max = Math.max(...points.map((p) => p.value), 10);
  const stepX = (W - PAD * 2) / Math.max(points.length - 1, 1);

  const coords = points.map((p, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - (p.value / max) * (H - PAD * 2),
    ...p,
  }));

  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `${PAD},${H - PAD} ${line} ${W - PAD},${H - PAD}`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-slate-900">Statistika grafigi</h2>
          <p className="text-xs text-slate-400">Ko'rsatkichlarning vaqt bo'yicha dinamikasi</p>
        </div>

        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={
                "rounded-md px-3 py-1 text-xs font-medium transition " +
                (period === p.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700")
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-64 w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + t * (H - PAD * 2)}
            y2={PAD + t * (H - PAD * 2)}
            stroke="#e2e8f0"
            strokeDasharray="3 3"
          />
        ))}

        <polygon points={area} fill="#3b82f6" opacity="0.12" />
        <polyline points={line} fill="none" stroke="#3b82f6" strokeWidth="3" />

        {coords.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="4" fill="#3b82f6" />
            <text x={c.x} y={c.y - 10} textAnchor="middle" fontSize="10" fill="#334155" fontWeight="600">
              {c.value}
            </text>
            <text x={c.x} y={H - 8} textAnchor="middle" fontSize="10" fill="#94a3b8">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
