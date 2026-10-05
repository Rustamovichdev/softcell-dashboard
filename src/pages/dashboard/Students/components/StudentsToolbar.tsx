import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type StudentsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onExport: () => void;
};

const StudentsToolbar: FC<StudentsToolbarProps> = ({
  search,
  onSearchChange,
  onAdd,
  onExport,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Qidiruv inputi */}
      <div className="relative flex-1 max-w-md">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Icon name="search" className="h-4 w-4" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Qidirish (ism, familya, raqam)..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-900"
        />
      </div>

      {/* O'ng tomon tugmalari */}
      <div className="flex items-center gap-2">
        {/* Excel / CSV yuklab olish tugmasi */}
        <button
          type="button"
          onClick={onExport}
          className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 active:scale-95"
          title="Talabalar ro'yxatini Excel/CSV formatida yuklab olish"
        >
          <span>📥</span>
          <span>Eksport (CSV)</span>
        </button>

        {/* Yangi student qo'shish */}
        <button
          type="button"
          onClick={onAdd}
          className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 active:scale-95"
        >
          <span>+</span>
          <span>Yangi student</span>
        </button>
      </div>
    </div>
  );
};

export default StudentsToolbar;
