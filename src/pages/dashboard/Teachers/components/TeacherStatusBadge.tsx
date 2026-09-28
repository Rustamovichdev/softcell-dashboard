import type { TeacherStatus } from "../types/teachers";

interface Props {
  status: TeacherStatus;
}

const statusConfig = {
  active: {
    label: "Faol",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },

  inactive: {
    label: "Nofaol",
    className:
      "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200",
  },

  pending: {
    label: "Kutilmoqda",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },
};

export default function TeacherStatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {config.label}
    </span>
  );
}