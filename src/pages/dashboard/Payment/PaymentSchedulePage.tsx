import { type FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import type { Payment, PaymentStatus } from "./types";
import { usePaymentsStore } from "./store";

type StudentRow = {
  studentId: number;
  studentName: string;
  lessonName: string;
  groupName: string;
  currency: "UZS" | "USD";
  monthlyAmount: number;
  totalMonths: number;
  paidCount: number;
  currentMonth: number;
  monthlyPaid: number;
  monthlyDue: number;
  nextDueDate: string | null;
  endDate: string;
  months: Payment[];
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

const monthDotStyles: Record<PaymentStatus, string> = {
  completed: "bg-emerald-500",
  pending: "bg-amber-400",
  failed: "bg-red-500",
  refunded: "bg-gray-300",
};

const PaymentSchedulePage: FC = () => {
  const navigate = useNavigate();
  const payments = usePaymentsStore((state) => state.payments) ?? [];
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const rows = useMemo<StudentRow[]>(() => {
    const byStudent = new Map<number, Payment[]>();
    payments
      // Noto'g'ri (keshdan qolgan) qatorlarni chiqib tashlaymiz
      .filter((p) => p && p.studentId != null && p.lessonName && p.currency)
      .forEach((payment) => {
        const list = byStudent.get(payment.studentId) ?? [];
        list.push(payment);
        byStudent.set(payment.studentId, list);
      });

    return Array.from(byStudent.entries()).map(([studentId, list]) => {
      const months = [...list].sort((a, b) => a.month - b.month);
      const first = months[0];
      const total = months.length;
      const paidCount = months.filter((m) => m.status === "completed").length;
      const currentMonth = Math.min(
        total,
        Math.max(1, months.findIndex((m) => m.status !== "completed") + 1 || total),
      );
      const nextPending = months.find((m) => m.status !== "completed");

      return {
        studentId,
        studentName: first.studentName,
        lessonName: first.lessonName,
        groupName: first.groupName,
        currency: first.currency,
        monthlyAmount: first.amount,
        totalMonths: total,
        paidCount,
        currentMonth,
        monthlyPaid: months.reduce((sum, m) => sum + m.paidAmount, 0),
        monthlyDue: total * first.amount,
        nextDueDate: nextPending?.dueDate ?? null,
        endDate: months[months.length - 1].dueDate,
        months,
      };
    });
  }, [payments]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [row.studentName, row.lessonName, row.groupName].some((v) =>
        v?.toLowerCase().includes(query),
      ),
    );
  }, [rows, search]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold sm:text-xl">Oylik to'lov jadvali</h1>
          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            Har bir o'quvchi uchun oylar, to'lov muddati va kurs tugash sanasi
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => navigate("/payment")} className="h-11">
          To'lovlar ro'yxatiga
        </Button>
      </div>

      <div className="mt-4">
        <input
          type="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="O'quvchi, kurs yoki guruh bo'yicha qidirish..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white sm:max-w-md"
        />
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">To'lov jadvali topilmadi</p>
        ) : (
          filtered.map((row) => {
            const isOpen = expandedId === row.studentId;
            const percent = Math.round((row.paidCount / row.totalMonths) * 100);

            return (
              <div key={row.studentId} className="rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : row.studentId)}
                  className="flex w-full flex-col gap-3 p-4 text-left transition hover:bg-gray-50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{row.studentName}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {row.lessonName} / {row.groupName} guruhi
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
                        {row.currentMonth}-oy / {row.totalMonths} oy
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700">
                        {row.paidCount} ta to'langan
                      </span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-700">
                        Keyingi to'lov: {formatDate(row.nextDueDate ?? "")}
                      </span>
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 font-medium text-blue-700">
                        Kurs tugaydi: {formatDate(row.endDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs text-gray-500">{percent}%</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 p-4">
                    <div className="mb-3 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Oylik to'lov</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {formatMoney(row.monthlyAmount, row.currency)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Jami to'langan</p>
                        <p className="mt-1 text-sm font-semibold text-emerald-700">
                          {formatMoney(row.monthlyPaid, row.currency)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Qolgan</p>
                        <p className="mt-1 text-sm font-semibold text-amber-700">
                          {formatMoney(row.monthlyDue - row.monthlyPaid, row.currency)}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                          <tr>
                            <th className="px-3 py-2 font-medium">Oy</th>
                            <th className="px-3 py-2 font-medium">To'lov muddati</th>
                            <th className="px-3 py-2 font-medium">Summa</th>
                            <th className="px-3 py-2 font-medium">To'langan</th>
                            <th className="px-3 py-2 font-medium">To'langan sana</th>
                            <th className="px-3 py-2 font-medium">Holat</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {row.months.map((month) => (
                            <tr key={month.id} className="transition hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-900">{month.month}-oy</td>
                              <td className="px-3 py-2 text-gray-600">{formatDate(month.dueDate)}</td>
                              <td className="px-3 py-2 text-gray-600">
                                {formatMoney(month.dueAmount, month.currency)}
                              </td>
                              <td className="px-3 py-2 text-gray-600">
                                {formatMoney(month.paidAmount, month.currency)}
                              </td>
                              <td className="px-3 py-2 text-gray-600">{formatDate(month.paidAt)}</td>
                              <td className="px-3 py-2">
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                                  <span
                                    className={`h-2 w-2 rounded-full ${monthDotStyles[month.status]}`}
                                  />
                                  {month.status === "completed"
                                    ? "To'langan"
                                    : month.status === "pending"
                                      ? "Kutilmoqda"
                                      : month.status === "failed"
                                        ? "Muvaffaqiyatsiz"
                                        : "Qaytarildi"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default PaymentSchedulePage;
