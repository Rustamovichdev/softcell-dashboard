import type { FC } from "react";
import type { Payment, PaymentStatus } from "../types";

type PaymentsTableProps = {
  students: StudentSummary[];
  /** Sahifa raqamini qator raqamiga qo'shish uchun (davomiylik uchun) */
  startIndex: number;
  onViewSchedule: () => void;
};

/** Bir o'quvchining barcha oylik to'lovlari jamlanmasi */
export type StudentSummary = {
  studentId: number;
  studentName: string;
  lessonName: string;
  groupName: string;
  currency: "UZS" | "USD";
  monthlyAmount: number;
  totalMonths: number;
  paidCount: number;
  currentMonth: number;
  totalDue: number;
  totalPaid: number;
  nextDueDate: string | null;
  endDate: string;
  status: PaymentStatus;
};

const formatMoney = (amount: number, currency: "UZS" | "USD") =>
  new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const statusStyles: Record<PaymentStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<PaymentStatus, string> = {
  completed: "To'langan",
  pending: "Kutilmoqda",
  failed: "Muvaffaqiyatsiz",
  refunded: "Qaytarildi",
};

/** To'lovlarni o'quvchilar bo'yicha jamlaydi (ismi faqat bir marta chiqadi) */
export const groupByStudent = (payments: Payment[]): StudentSummary[] => {
  const map = new Map<number, Payment[]>();
  payments
    // Noto'g'ri (keshdan qolgan) qatorlarni chiqib tashlaymiz
    .filter((p) => p && p.studentId != null && p.lessonName && p.currency)
    .forEach((payment) => {
      const list = map.get(payment.studentId) ?? [];
      list.push(payment);
      map.set(payment.studentId, list);
    });

  return Array.from(map.entries()).map(([studentId, list]) => {
    const months = [...list].sort((a, b) => a.month - b.month);
    const first = months[0];
    const paid = months.filter((m) => m.status === "completed");
    const nextPending = months.find((m) => m.status !== "completed");
    const hasFailed = months.some((m) => m.status === "failed");

    return {
      studentId,
      studentName: first.studentName,
      lessonName: first.lessonName,
      groupName: first.groupName,
      currency: first.currency,
      monthlyAmount: first.amount,
      totalMonths: months.length,
      paidCount: paid.length,
      currentMonth: Math.min(months.length, (nextPending?.month ?? months.length + 1) - 1 || 1),
      totalDue: months.reduce((sum, m) => sum + m.dueAmount, 0),
      totalPaid: months.reduce((sum, m) => sum + m.paidAmount, 0),
      nextDueDate: nextPending?.dueDate ?? null,
      endDate: months[months.length - 1].dueDate,
      status: hasFailed ? "failed" : nextPending ? "pending" : "completed",
    };
  });
};

const PaymentsTable: FC<PaymentsTableProps> = ({ students, startIndex, onViewSchedule }) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[1100px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Talaba</th>
            <th className="px-4 py-3 font-medium">Kurs / Guruh</th>
            <th className="px-4 py-3 font-medium">Oylar</th>
            <th className="px-4 py-3 font-medium">Oylik to'lov</th>
            <th className="px-4 py-3 font-medium">Jami to'lov</th>
            <th className="px-4 py-3 font-medium">To'langan</th>
            <th className="px-4 py-3 font-medium">Qoldiq</th>
            <th className="px-4 py-3 font-medium">Keyingi to'lov</th>
            <th className="px-4 py-3 font-medium">Kurs tugaydi</th>
            <th className="px-4 py-3 font-medium">Holat</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.length === 0 ? (
            <tr>
              <td colSpan={11} className="px-4 py-10 text-center text-gray-400">
                To'lov topilmadi
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr
                key={student.studentId}
                onClick={onViewSchedule}
                className="cursor-pointer transition hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-400">{startIndex + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{student.studentName}</td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{student.lessonName}</div>
                  <div className="mt-0.5 text-xs text-gray-400">{student.groupName} guruhi</div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {student.currentMonth}-oy / {student.totalMonths} oy
                  <div className="mt-0.5 text-xs text-gray-400">
                    {student.paidCount} ta to'langan
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatMoney(student.monthlyAmount, student.currency)}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {formatMoney(student.totalDue, student.currency)}
                </td>
                <td className="px-4 py-3 font-medium text-emerald-700">
                  {formatMoney(student.totalPaid, student.currency)}
                </td>
                <td className="px-4 py-3">
                  {student.totalDue - student.totalPaid > 0 ? (
                    <span className="font-medium text-amber-700">
                      {formatMoney(student.totalDue - student.totalPaid, student.currency)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {student.nextDueDate ? formatDate(student.nextDueDate) : "To'liq to'langan"}
                </td>
                <td className="px-4 py-3 text-gray-600">{formatDate(student.endDate)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[student.status]}`}
                  >
                    {statusLabels[student.status]}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
