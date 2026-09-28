import type { FC } from "react";
import type { Payment } from "../types";

type PaymentsTableProps = {
  payments: Payment[];
  startIndex: number;
  onViewPayment: (paymentId: number) => void;
};

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
} as const;

const statusLabels = {
  pending: "Kutilmoqda",
  completed: "Bajarildi",
  failed: "Muvaffaqiyatsiz",
  refunded: "Qaytarildi",
} as const;

const methodLabels = {
  cash: "Naqd",
  card: "Karta",
  transfer: "O'tkazma",
  click: "Click",
  payme: "Payme",
} as const;

const formatCurrency = (amount: number, currency: "UZS" | "USD") => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PaymentsTable: FC<PaymentsTableProps> = ({ payments, startIndex, onViewPayment }) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Talaba</th>
            <th className="px-4 py-3 font-medium">Kurs / Guruh</th>
            <th className="px-4 py-3 font-medium">Summa</th>
            <th className="px-4 py-3 font-medium">To'langan</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Usul</th>
            <th className="px-4 py-3 font-medium">Sana</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                To'lov topilmadi
              </td>
            </tr>
          ) : (
            payments.map((payment, index) => (
              <PaymentRow
                key={payment.id}
                payment={payment}
                index={index}
                startIndex={startIndex}
                onViewPayment={onViewPayment}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const PaymentRow: FC<{
  payment: Payment;
  index: number;
  startIndex: number;
  onViewPayment: (paymentId: number) => void;
}> = ({ payment, index, startIndex, onViewPayment }) => {
  const status = payment.status;
  const remaining = payment.dueAmount - payment.paidAmount;

  return (
    <tr className="transition hover:bg-gray-50 cursor-pointer" onClick={() => onViewPayment(payment.id)}>
      <td className="px-4 py-3 text-gray-400">{startIndex + index + 1}</td>
      <td className="px-4 py-3 font-medium text-gray-900">{payment.studentName}</td>
      <td className="px-4 py-3">
        <div className="text-gray-900">{payment.lessonName}</div>
        <div className="mt-0.5 text-xs text-gray-400">{payment.groupName} guruhi</div>
      </td>
      <td className="px-4 py-3 text-gray-900 font-medium">
        {formatCurrency(payment.amount, payment.currency)}
      </td>
      <td className="px-4 py-3">
        <div className="text-gray-900">{formatCurrency(payment.paidAmount, payment.currency)}</div>
        {remaining > 0 && (
          <div className="mt-0.5 text-xs text-amber-600">
            Qoldiq: {formatCurrency(remaining, payment.currency)}
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-600">{methodLabels[payment.method]}</td>
      <td className="px-4 py-3 text-gray-600">{formatDate(payment.paidAt || payment.createdAt)}</td>
    </tr>
  );
};

export default PaymentsTable;