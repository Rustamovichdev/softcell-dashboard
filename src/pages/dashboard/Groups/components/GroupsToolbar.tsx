import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type GroupsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
};

const statusOptions = [
  { value: "", label: "Barcha holatlar" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

const GroupsToolbar: FC<GroupsToolbarProps> = ({
  search,
  onSearchChange,
  onAdd,
  statusFilter,
  onStatusFilterChange,
}) => (
  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="relative flex-1">
      <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={search}
        onChange={({ target }) => onSearchChange(target.value)}
        placeholder="Guruh nomi yoki yo'nalishi bo'yicha qidirish..."
        className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pr-3 pl-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
      />
    </div>

    <select
      value={statusFilter}
      onChange={({ target }) => onStatusFilterChange(target.value)}
      className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white sm:w-44"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <button
      type="button"
      onClick={onAdd}
      className="h-10 rounded-lg bg-gray-900 px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-gray-800"
    >
      + Add Group
    </button>
  </div>
);

export default GroupsToolbar;
