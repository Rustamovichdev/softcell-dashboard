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

export type LeadStatus = "yangi" | "aloqada" | "qabul_qilindi" | "bekor_qilindi";

export interface RecentLead {
  id: string;
  name: string;
  phone: string;
  direction: string;
  createdAt: string;
  status: LeadStatus;
}
