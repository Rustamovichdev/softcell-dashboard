import { useState } from "react";
import { chartData } from "../data";
import type { ChartPoint, Period } from "../types";

const periods: { key: Period; label: string }[] = [
  { key: "day", label: "Kun" },
  { key: "week", label: "Hafta" },
  { key: "month", label: "Oy" },
  { key: "year", label: "Yil" },
];

// Grafikni kengroq va balandroq qilish uchun o'lchamlar
const W = 1000;
const H = 320;
const PAD_X = 60;
const PAD_Y = 40;

export function ChartCard() {
  const [period, setPeriod] = useState<Period>("week");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const points: ChartPoint[] = chartData[period] || [];
  const max = Math.max(...points.map((p) => p.value), 10);
  const stepX = (W - PAD_X * 2) / Math.max(points.length - 1, 1);

  const coords = points.map((p, i) => ({
    x: PAD_X + i * stepX,
    y: H - PAD_Y - (p.value / max) * (H - PAD_Y * 2),
    ...p,
  }));

  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `${coords[0]?.x ?? PAD_X},${H - PAD_Y} ${line} ${
    coords[coords.length - 1]?.x ?? W - PAD_X
  },${H - PAD_Y}`;

  const activePoint = activeIndex !== null ? coords[activeIndex] : null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Sarlavha va filtr tugmalari */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Statistika grafigi
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
            {activePoint ? (
              <span>
                Tanlangan:{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {activePoint.label}
                </span>{" "}
                —{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {activePoint.value} ta
                </span>
              </span>
            ) : (
              "Ko'rsatkichlarni ko'rish uchun grafik ustiga olib boring"
            )}
          </p>
        </div>

        <div className="flex gap-1.5 rounded-lg bg-slate-100 p-1.5 dark:bg-gray-800">
          {periods.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                setPeriod(p.key);
                setActiveIndex(null);
              }}
              className={
                "rounded-md px-4 py-1.5 text-xs font-medium transition sm:text-sm " +
                (period === p.key
                  ? "bg-white text-slate-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200")
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Katta va interaktiv grafik */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-80 w-full select-none sm:h-96"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="chartGradientBig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Fon chiziqlari (to'r) */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = PAD_Y + t * (H - PAD_Y * 2);
            return (
              <line
                key={t}
                x1={PAD_X}
                x2={W - PAD_X}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="5 5"
                className="dark:stroke-gray-800"
              />
            );
          })}

          {/* Gradiyentli soya va asosiy chiziq */}
          <polygon points={area} fill="url(#chartGradientBig)" />
          <polyline
            points={line}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tanlangan nuqtadagi vertikal chiziq */}
          {activePoint && (
            <line
              x1={activePoint.x}
              x2={activePoint.x}
              y1={PAD_Y}
              y2={H - PAD_Y}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Nuqtalar va pastki matnlar */}
          {coords.map((c, i) => {
            const isActive = activeIndex === i;
            return (
              <g key={c.label}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isActive ? "8" : "5"}
                  fill={isActive ? "#1d4ed8" : "#3b82f6"}
                  stroke="#ffffff"
                  strokeWidth={isActive ? "3" : "2"}
                  className="transition-all duration-150"
                />

                <text
                  x={c.x}
                  y={H - 12}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={isActive ? "700" : "500"}
                  className={
                    isActive
                      ? "fill-blue-600 dark:fill-blue-400"
                      : "fill-slate-500 dark:fill-gray-400"
                  }
                >
                  {c.label}
                </text>
              </g>
            );
          })}

          {/* Ushlash uchun keng sezgir zonalar */}
          {coords.map((c, i) => {
            const colWidth = stepX || 80;
            return (
              <rect
                key={`trigger-${c.label}`}
                x={c.x - colWidth / 2}
                y={PAD_Y}
                width={colWidth}
                height={H - PAD_Y * 2}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActiveIndex(i)}
                onTouchStart={() => setActiveIndex(i)}
              />
            );
          })}

          {/* Hover bo'lganda chiquvchi yirikroq Tooltip */}
          {activePoint && (
            <g
              transform={`translate(${activePoint.x}, ${Math.max(
                activePoint.y - 42,
                18
              )})`}
              className="pointer-events-none transition-all duration-100"
            >
              <rect
                x="-40"
                y="-22"
                width="80"
                height="30"
                rx="8"
                fill="#0f172a"
                className="dark:fill-white"
              />
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#ffffff"
                className="dark:fill-slate-900"
              >
                {activePoint.value} ta
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
