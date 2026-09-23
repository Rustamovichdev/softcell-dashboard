import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";
import type { Lesson } from "../types";

type LessonsToolbarProps = {
  search: string;
  statusFilter: Lesson["status"] | "all";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: Lesson["status"] | "all") => void;
  onAdd: () => void;
};

const statusOptions: { value: Lesson["status"] | "all"; label: string }[] = [
  { value: "all", label: "Hammasi" },
  { value: "active", label: "Faol" },
  { value: "upcoming", label: "Keladi" },
  { value: "completed", label: "Yakunlandi" },
];

const LessonsToolbar: FC<LessonsToolbarProps> = ({ search, statusFilter, onSearchChange, onStatusFilterChange, onAdd }) => {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={({ target }) => onSearchChange(target.value)}
          placeholder="Dars nomi, kodi yoki tavsifi bo'yicha qidirish..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pr-3 pl-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
        />
      </div>
      <select
        value={statusFilter}
        onChange={({ target }) => onStatusFilterChange(target.value as Lesson["status"] | "all")}
        className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
      >
        {statusOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={onAdd}
        className="h-10 rounded-lg bg-gray-900 px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-gray-800"
      >
        Yangi dars qo'shish
      </button>
    </div>
  );
};

export default LessonsToolbar;