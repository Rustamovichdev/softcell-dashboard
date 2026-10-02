import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_PAYMENTS } from "./data";
import type { Payment, PaymentFormValues } from "./types";

type PaymentsState = {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  addPayment: (values: PaymentFormValues) => void;
  updatePayment: (id: number, values: Partial<PaymentFormValues>) => void;
  deletePayment: (id: number) => void;
};

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set) => ({
      payments: MOCK_PAYMENTS,
      setPayments: (payments) => set({ payments }),
      addPayment: (values) =>
        set((state) => {
          const nextId = state.payments.length
            ? Math.max(...state.payments.map(({ id }) => id)) + 1
            : 1;
          // Sana va vaqt foydalanuvchi kiritmaydi — tizim to'ldiradi
          const now = new Date().toISOString();
          return {
            payments: [
              {
                id: nextId,
                ...values,
                dueDate: now,
                paidAt: values.status === "completed" ? now : "",
                createdAt: now,
              },
              ...state.payments,
            ],
          };
        }),
      updatePayment: (id, values) =>
        set((state) => ({
          payments: state.payments.map((p) => (p.id === id ? { ...p, ...values } : p)),
        })),
      deletePayment: (id) =>
        set((state) => ({
          payments: state.payments.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "payments-storage",
      // Bu mock ma'lumot - lokal storage'dagi eski/nosoql versiyalar har doim
      // yangi MOCK_PAYMENTS bilan almashtiriladi (chalg'itilgan JSON ham).
      version: 4,
      migrate: () => ({ payments: MOCK_PAYMENTS }),
    },
  ),
);