import { Eye, Trash2 } from "lucide-react";

import type { Startup } from "../types/startup";

import StartupEmptyState from "./StartupEmptyState";
import StartupStatusBadge from "./StartupStatusBadge";

interface Props {
  startups: Startup[];
  onSelect: (startup: Startup) => void;
  onDelete: (id: string) => void;
}

export default function StartupList({
  startups,
  onSelect,
  onDelete,
}: Props) {
  if (startups.length === 0) {
    return <StartupEmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                O'QUVCHI
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                STARTUP
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                MAVZU
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                MAQSAD
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                TOPSHIRISH SANASI
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                HOLATI
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-gray-600">
                AMAL
              </th>
            </tr>
          </thead>

          <tbody>
            {startups.map((startup) => (
              <tr
                key={startup.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >
                {/* O'QUVCHI */}

                <td className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onSelect(startup)}
                      className="font-semibold text-gray-900 hover:text-gray-600"
                    >
                      {startup.studentName}
                    </button>

                    <span className="text-sm text-gray-500">
                      {startup.studentPhone}
                    </span>

                    <span className="text-xs text-gray-400">
                      {startup.group}
                    </span>
                  </div>
                </td>

                {/* STARTUP */}

                <td className="px-5 py-5">
                  <p className="font-semibold text-gray-900">
                    {startup.startupName}
                  </p>
                </td>

                {/* MAVZU */}

                <td className="px-5 py-5">
                  <p className="max-w-[200px] text-sm text-gray-600">
                    {startup.topic}
                  </p>
                </td>

                {/* MAQSAD */}

                <td className="max-w-[280px] px-5 py-5">
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {startup.goal}
                  </p>
                </td>

                {/* SANA */}

                <td className="px-5 py-5">
                  <p className="whitespace-nowrap text-sm text-gray-600">
                    {new Date(
                      startup.submissionDate,
                    ).toLocaleDateString("uz-UZ")}
                  </p>
                </td>

                {/* HOLAT */}

                <td className="px-5 py-5">
                  <StartupStatusBadge
                    status={startup.status}
                  />
                </td>

                {/* AMAL */}

                <td className="px-5 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onSelect(startup)}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Eye size={16} />
                      Ko'rish
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(startup.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      O'chirish
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}