import { useParams, useNavigate } from "react-router-dom";
import { type FC, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import type { Payment } from "./types";
import { usePaymentsStore } from "./store";

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

const PaymentDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const payments = usePaymentsStore((state) => state.payments);
  const [payment, setPayment] = useState<Payment | undefined>();

  useEffect(() => {
    if (id) {
      const found = payments.find((p) => p.id === Number(id));
      setPayment(found);
    }
  }, [id, payments]);

  const onBack = () => {
    navigate("/payment");
  };

  const onEdit = () => {
    if (id) {
      navigate(`/payment/${id}/edit`);
    }
  };

  if (!payment) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">To'lov topilmadi</p>
        </div>
      </section>
    );
  }

  const status = payment.status;
  const remaining = payment.dueAmount - payment.paidAmount;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="h-11">
            <Icon name="chevron-down" className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-lg font-semibold sm:text-xl">To'lov tafsiloti</h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">ID: {payment.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
            {statusLabels[status]}
          </span>
          <Button variant="outline" onClick={onEdit} className="h-11">
            Tahrirlash
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Talaba</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{payment.studentName}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Kurs / Guruh</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {payment.lessonName} / {payment.groupName}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">To'lanishi kerak</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{formatCurrency(payment.dueAmount, payment.currency)}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">To'langan</p>
          <p className="mt-1 text-lg font-bold text-emerald-700">{formatCurrency(payment.paidAmount, payment.currency)}</p>
        </div>
        {remaining > 0 && (
          <div className="rounded-lg border border-gray-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-700">Qoldiq</p>
            <p className="mt-1 text-lg font-bold text-amber-700">{formatCurrency(remaining, payment.currency)}</p>
          </div>
        )}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">To'lov usuli</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{methodLabels[payment.method]}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Oy</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{payment.month}-oy / {payment.totalMonths} oy</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-6">
        <p className="text-xs text-gray-500">Tavsif</p>
        <p className="mt-1 text-sm text-gray-900">{payment.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Yaratilgan sana</p>
          <p className="mt-1 text-sm text-gray-900">{formatDate(payment.createdAt)}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">To'langan sana</p>
          <p className="mt-1 text-sm text-gray-900">{formatDate(payment.paidAt)}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
          <p className="text-xs text-blue-700">To'lov muddati</p>
          <p className="mt-1 text-sm text-blue-900">{formatDate(payment.dueDate)}</p>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetailPage;