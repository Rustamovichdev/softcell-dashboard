export type Period = "day" | "week" | "month" | "year";

export interface Stat {
  key: string;
  label: string;
  value: number;
  money?: boolean;
  hint?: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

// Marketing xarajatlari turi
export interface MarketingExpense {
  id: string;
  channel: string;       // Masalan: "Instagram Target", "Telegram Ads"
  spent: number;         // Sarflangan pul (so'mda)
  budget: number;        // Ajratilgan budjet
  leadsCount: number;    // Shu kanaldan kelgan lidlar soni
  costPerLead: number;   // Bitta lid narxi (CPL)
  color: string;         // Chiziq rangi
}
