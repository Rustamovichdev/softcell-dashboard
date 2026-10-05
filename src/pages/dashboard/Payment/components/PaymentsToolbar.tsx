import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type PaymentsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  methodFilter: string;
  onMethodFilterChange: (value: string) => void;
};

const PaymentsToolbar: FC<PaymentsToolbarProps> = ({
  search,
  onSearchChange,
  onAdd,
  statusFilter,
  onStatusFilterChange,
  methodFilter,
  onMethodFilterChange,
}) => {
  const statusOptions = [
    { value: "", label: "Barcha statuslar" },
    { value: "pending", label: "Kutilmoqda" },
    { value: "completed", label: "Bajarildi" },
    { value: "failed", label: "Muvaffaqiyatsiz" },
    { value: "refunded", label: "Qaytarildi" },
  ];

  const methodOptions = [
    { value: "", label: "Barcha usullar" },
    { value: "cash", label: "Naqd" },
    { value: "card", label: "Karta" },
    { value: "transfer", label: "O'tkazma" },
    { value: "click", label: "Click" },
    { value: "payme", label: "Payme" },
  ];

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={({ target }) => onSearchChange(target.value)}
          placeholder="Talaba, kurs, guruh bo'yicha qidirish..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pr-3 pl-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={statusFilter}
          onChange={({ target }) => onStatusFilterChange(target.value)}
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white sm:w-40"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={methodFilter}
          onChange={({ target }) => onMethodFilterChange(target.value)}
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white sm:w-40"
        >
          {methodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onAdd}
          className="h-10 rounded-lg bg-emerald-600 px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-emerald-700"
        >
          Yangi to'lov
        </button>
      </div>
    </div>
  );
};

export default PaymentsToolbar;