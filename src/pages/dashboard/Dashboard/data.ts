import type { ChartPoint, Period, Stat } from "./types";

export const stats: Stat[] = [
  { key: "leads",      label: "Leads",          value: 128,      hint: "Bugun +12" },
  { key: "students",   label: "Students",       value: 342,      hint: "Aktiv o'quvchilar" },
  { key: "revenue",    label: "Tushum",         value: 48600000, money: true, hint: "Bu oy" },
  { key: "marketing",  label: "Marketing money", value: 6200000, money: true, hint: "Sarflangan budjet" },
  { key: "directions", label: "Yo'nalishlar",   value: 8,        hint: "Ochiq yo'nalishlar" },
  { key: "startups",   label: "StartUplar",     value: 15,       hint: "Jami loyihalar" },
  { key: "results",    label: "Natijalar",      value: 96,       hint: "Yakunlangan natijalar" },
];

export const chartData: Record<Period, ChartPoint[]> = {
  day: [
    { label: "00", value: 2 }, { label: "04", value: 4 }, { label: "08", value: 9 },
    { label: "12", value: 12 }, { label: "16", value: 8 }, { label: "20", value: 14 },
  ],
  week: [
    { label: "Du", value: 14 }, { label: "Se", value: 18 }, { label: "Ch", value: 12 },
    { label: "Pa", value: 22 }, { label: "Ju", value: 26 }, { label: "Sh", value: 20 },
    { label: "Ya", value: 30 },
  ],
  month: [
    { label: "1-h", value: 60 }, { label: "2-h", value: 82 }, { label: "3-h", value: 74 },
    { label: "4-h", value: 110 },
  ],
  year: [
    { label: "Yan", value: 210 }, { label: "Fev", value: 260 }, { label: "Mar", value: 240 },
    { label: "Apr", value: 310 }, { label: "May", value: 290 }, { label: "Iyn", value: 350 },
    { label: "Iyl", value: 330 }, { label: "Avg", value: 380 }, { label: "Sen", value: 420 },
  ],
};

// 48600000 -> "48.6 mln" qilib qisqartiradi
export function formatMoney(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} mln`;
  if (n >= 1_000) return `${Math.round(n / 1000)} ming`;
  return `${n}`;
}
