import type { ChartPoint, MarketingExpense, Period, Stat } from "./types";

export const stats: Stat[] = [
  { key: "leads", label: "Leads", value: 128, hint: "Bugun +12" },
  { key: "students", label: "Students", value: 342, hint: "Aktiv o'quvchilar" },
  { key: "revenue", label: "Tushum", value: 48600000, money: true, hint: "Bu oy" },
  { key: "marketing", label: "Marketing money", value: 6200000, money: true, hint: "Sarflangan budjet" },
  { key: "directions", label: "Yo'nalishlar", value: 8, hint: "Ochiq yo'nalishlar" },
  { key: "startups", label: "StartUplar", value: 15, hint: "Jami loyihalar" },
  { key: "results", label: "Natijalar", value: 96, hint: "Yakunlangan natijalar" },
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

// Marketing kanallari bo'yicha sarflar ro'yxati
export const marketingExpenses: MarketingExpense[] = [
  {
    id: "1",
    channel: "Instagram / Facebook Target",
    spent: 2_800_000,
    budget: 3_500_000,
    leadsCount: 64,
    costPerLead: 43750,
    color: "#ec4899", // pushti/pink
  },
  {
    id: "2",
    channel: "Telegram Kanallar & Reklama",
    spent: 1_900_000,
    budget: 2_000_000,
    leadsCount: 42,
    costPerLead: 45200,
    color: "#0ea5e9", // ko'k/sky
  },
  {
    id: "3",
    channel: "Google Ads & YouTube",
    spent: 1_100_000,
    budget: 1_500_000,
    leadsCount: 18,
    costPerLead: 61100,
    color: "#f59e0b", // sariq/amber
  },
  {
    id: "4",
    channel: "Tadbirlar & Blogerlar",
    spent: 400_000,
    budget: 1_000_000,
    leadsCount: 4,
    costPerLead: 100000,
    color: "#8b5cf6", // binafsha/purple
  },
];

export function formatMoney(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} mln`;
  if (n >= 1_000) return `${Math.round(n / 1000)} ming`;
  return `${n}`;
}
