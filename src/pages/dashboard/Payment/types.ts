/* Payment sahifasi uchun type'lar */

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod = "cash" | "card" | "transfer" | "click" | "payme";
export type PaymentCurrency = "UZS" | "USD";

export type Payment = {
  id: number;
  studentId: number;
  studentName: string;
  lessonId: number;
  lessonName: string;
  groupId: number;
  groupName: string;
  amount: number;
  currency: PaymentCurrency;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  paidAt: string;
  createdAt: string;
  dueAmount: number;
  paidAmount: number;
  month: number;        // 1-12 (qaysi oy uchun to'lov)
  totalMonths: number;  // kurs umumiy davomiyligi (masalan 6 oy)
  dueDate: string;      // to'lov qilinishi kerak sana (ISO)
};

export type PaymentFormValues = Omit<Payment, "id" | "createdAt" | "paidAt" | "dueDate"> & {
  /** To'lov muddati (ISO sana) - bo'lmasa joriy oyga hisoblanadi */
  dueDate?: string;
};

/** O'quvchi uchun to'lov jadvali (har bir oy uchun) */
export type PaymentSchedule = {
  month: number;           // 1, 2, 3...
  dueDate: string;         // to'lov muddati
  dueAmount: number;       // to'lanishi kerak summa
  paidAmount: number;      // to'langan summa
  status: PaymentStatus;   // status
  paidAt?: string;         // to'langan sana
  method?: PaymentMethod;  // to'lov usuli
  paymentId?: number;      // payment record ID
};