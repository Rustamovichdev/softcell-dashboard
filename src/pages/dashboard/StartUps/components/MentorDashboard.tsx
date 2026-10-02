import {
  ArrowLeft,
  Eye,
  LogOut,
} from "lucide-react";

import type { Startup } from "../types/startup";

import StartupStatusBadge from "./StartupStatusBadge";

interface Props {
  startups: Startup[];

  onSelect: (startup: Startup) => void;

  onLogout: () => void;

  onBack: () => void;
}

export default function MentorDashboard({
  startups,
  onSelect,
  onLogout,
  onBack,
}: Props) {
  const mentorStartups = startups.filter(
    (startup) =>
      startup.status === "submitted" ||
      startup.status === "revision" ||
      startup.status === "approved",
  );

  const submittedCount = startups.filter(
    (startup) =>
      startup.status === "submitted",
  ).length;

  const approvedCount = startups.filter(
    (startup) =>
      startup.status === "approved",
  ).length;

  const revisionCount = startups.filter(
    (startup) =>
      startup.status === "revision",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Startuplarga qaytish
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Mentor Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              O'quvchilar yuborgan startup loyihalarini
              tekshiring.
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={17} />
            Chiqish
          </button>
        </div>

        {/* STATISTIKA */}

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Tekshirilishi kerak
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {submittedCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Qayta ishlash
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {revisionCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Tasdiqlangan
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {approvedCount}
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
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
                    HOLATI
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold text-gray-600">
                    AMAL
                  </th>
                </tr>
              </thead>

              <tbody>
                {mentorStartups.map((startup) => (
                  <tr
                    key={startup.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                          {startup.studentName}
                        </span>

                        <span className="text-sm text-gray-500">
                          {startup.studentPhone}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        {startup.group}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-gray-900">
                        {startup.startupName}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm text-gray-600">
                        {startup.topic}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <StartupStatusBadge
                        status={startup.status}
                      />
                    </td>

                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onSelect(startup)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        Ko'rib chiqish
                      </button>
                    </td>
                  </tr>
                ))}

                {mentorStartups.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      Hozircha tekshiriladigan startup
                      yo'q.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}