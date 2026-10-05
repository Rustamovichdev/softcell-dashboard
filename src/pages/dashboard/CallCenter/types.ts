export type CallStatus =
  | "new"          // Yangi qo'ng'iroq
  | "answered"     // Javob berildi
  | "missed"       // Javob berilmadi
  | "callback"     // Keyinroq qo'ng'iroq
  | "cancelled";   // Bekor qilindi

export interface CallCardItem {
  id: string;
  clientName: string;
  phone: string;
  operator: string;
  status: CallStatus;
  time: string;
  duration?: string;   // masalan "02:45"
  note?: string;       // operator yozgan izoh
}

export interface KanbanColumnDef {
  id: CallStatus;
  title: string;
  color: string;       // Ustun chizig'i va badge rangi
  badgeBg: string;
}
