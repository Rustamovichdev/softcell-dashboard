import type { StartupStatus } from "../types/startup";

interface Props {
  status: StartupStatus;
}

const statusData: Record<
  StartupStatus,
  {
    text: string;
    className: string;
  }
> = {
  idea: {
    text: "G'oya",
    className: "bg-gray-100 text-gray-700",
  },

  preparing: {
    text: "Tayyorlanmoqda",
    className: "bg-blue-100 text-blue-700",
  },

  submitted: {
    text: "Topshirilgan",
    className: "bg-purple-100 text-purple-700",
  },

  approved: {
    text: "Tasdiqlangan",
    className: "bg-green-100 text-green-700",
  },

  revision: {
    text: "Qayta ishlash",
    className: "bg-yellow-100 text-yellow-700",
  },
};

export default function StartupStatusBadge({ status }: Props) {
  const current = statusData[status];

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${current.className}`}
    >
      {current.text}
    </span>
  );
}