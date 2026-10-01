import type { ChartPoint, Period, RecentLead, Stat } from "./types";

export const stats: Stat[] = [
  { key: "leads", label: "Leads soni", value: 128, hint: "Bugun +12" },
  { key: "students", label: "Students soni", value: 342, hint: "Aktiv o'quvchilar" },
  { key: "revenue", label: "Tushum", value: 48600000, money: true, hint: "Bu oy" },
  { key: "marketing", label: "Marketing money", value: 6200000, money: true, hint: "Sarflangan budjet" },
  { key: "directions", label: "Yo'nalishlar soni", value: 8, hint: "Ochiq yo'nalishlar" },
  { key: "startups", label: "StartUplar soni", value: 15, hint: "Jami loyihalar" },
  { key: "results", label: "Natijalar soni", value: 96, hint: "Yakunlangan natijalar" },
];

export const chartData: Record<Period, ChartPoint[]> = {
  day: [
    { label: "00:00", value: 2 },
    { label: "04:00", value: 4 },
    { label: "08:00", value: 9 },
    { label: "12:00", value: 12 },
    { label: "16:00", value: 8 },
    { label: "20:00", value: 14 },
  ],
  week: [
    { label: "Du", value: 14 },
    { label: "Se", value: 18 },
    { label: "Ch", value: 12 },
    { label: "Pa", value: 22 },
    { label: "Ju", value: 26 },
    { label: "Sh", value: 20 },
    { label: "Ya", value: 30 },
  ],
  month: [
    { label: "1-hafta", value: 60 },
    { label: "2-hafta", value: 82 },
    { label: "3-hafta", value: 74 },
    { label: "4-hafta", value: 110 },
  ],
  year: [
    { label: "Yan", value: 210 },
    { label: "Fev", value: 260 },
    { label: "Mar", value: 240 },
    { label: "Apr", value: 310 },
    { label: "May", value: 290 },
    { label: "Iyn", value: 350 },
    { label: "Iyl", value: 330 },
    { label: "Avg", value: 380 },
    { label: "Sen", value: 420 },
  ],
};

export const recentLeads: RecentLead[] = [
  {
    id: "1",
    name: "Azizbek Aliyev",
    phone: "+998 90 123 45 67",
    direction: "Frontend dasturlash",
    createdAt: "10 daqiqa oldin",
    status: "yangi",
  },
  {
    id: "2",
    name: "Madina Karimova",
    phone: "+998 93 987 65 43",
    direction: "UI/UX Dizayn",
    createdAt: "35 daqiqa oldin",
    status: "aloqada",
  },
  {
    id: "3",
    name: "Javohir Toshmatov",
    phone: "+998 97 555 12 34",
    direction: "Backend (Node.js / Go)",
    createdAt: "Bugun 14:10",
    status: "qabul_qilindi",
  },
  {
    id: "4",
    name: "Shahnoza Ergasheva",
    phone: "+998 91 321 88 99",
    direction: "SMM & Marketing",
    createdAt: "Bugun 11:45",
    status: "aloqada",
  },
  {
    id: "5",
    name: "Sardor Rustamov",
    phone: "+998 94 777 00 11",
    direction: "Mobil dasturlash (Flutter)",
    createdAt: "Kecha 18:20",
    status: "bekor_qilindi",
  },
];

export function formatMoney(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} mln so'm`;
  if (n >= 1_000) return `${Math.round(n / 1000)} ming so'm`;
  return `${n} so'm`;
}
