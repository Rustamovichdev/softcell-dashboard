import type { StartupStatus } from "../types/startup";

interface Props {
  status: StartupStatus;
}

export default function StartupStatusBadge({ status }: Props) {
  const statusConfig: Record<
    StartupStatus,
    {
      label: string;
      className: string;
    }
  > = {
    draft: {
      label: "G‘oya",
      className: "bg-gray-100 text-gray-700",
    },

    preparing: {
      label: "Tayyorlanmoqda",
      className: "bg-yellow-100 text-yellow-700",
    },

    submitted: {
      label: "Topshirilgan",
      className: "bg-blue-100 text-blue-700",
    },

    revision: {
      label: "Qayta ishlash",
      className: "bg-orange-100 text-orange-700",
    },

    approved: {
      label: "Tasdiqlangan",
      className: "bg-green-100 text-green-700",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}