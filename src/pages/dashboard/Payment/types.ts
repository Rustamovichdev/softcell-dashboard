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
  currency: PaymentCurrency;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  /** To'langan sana (bo'lmasa bo'sh) */
  paidAt: string;
  /** To'lov saqlangan sana va vaqti */
  createdAt: string;
  /** To'lanishi kerak summa */
  dueAmount: number;
  /** To'langan summa */
  paidAmount: number;
  /** Qaysi oy uchun to'lov (1-12) */
  month: number;
  /** Kurs umumiy davomiyligi (masalan 6 oy) */
  totalMonths: number;
  /** To'lov muddati — oylik jadval uchun tizim tomonidan hisoblanadi */
  dueDate: string;
};

/** Forma maydonlari (id, sanalar va tizim maydonlari kiritilmaydi) */
export type PaymentFormValues = Omit<Payment, "id" | "createdAt" | "paidAt" | "dueDate">;