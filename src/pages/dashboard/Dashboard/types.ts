// Barcha turlar (types) shu faylda saqlanadi.

export type Period = "day" | "week" | "month" | "year";

export interface Stat {
  key: string;
  label: string;   // kartochka nomi
  value: number;   // qiymati
  money?: boolean; // true bo'lsa so'mda formatlanadi
  hint?: string;   // pastda kichik izoh
}

export interface ChartPoint {
  label: string;   // masalan "Dush"
  value: number;   // masalan 14
}
