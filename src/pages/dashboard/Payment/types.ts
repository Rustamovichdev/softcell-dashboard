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
};

export type PaymentFormValues = Omit<Payment, "id" | "createdAt" | "paidAt">;