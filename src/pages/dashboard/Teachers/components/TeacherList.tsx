import {
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import type { Teacher } from "../types/teachers";
import TeacherStatusBadge from "./TeacherStatusBadge";
import TeacherEmptyState from "./TeacherEmptyState";

interface Props {
  teachers: Teacher[];
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onView: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export default function TeacherList({
  teachers,
  search,
  onSearchChange,
  onAdd,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const filteredTeachers = teachers.filter((teacher) => {
    const value = search.toLowerCase();

    return (
      `${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(value) ||
      teacher.phone.toLowerCase().includes(value) ||
      teacher.subject.toLowerCase().includes(value) ||
      teacher.email.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            O'qituvchilar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            O'quv markazingizdagi barcha o'qituvchilar ro'yxati
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          O'qituvchi qo'shish
        </button>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="O'qituvchi, telefon yoki fan bo'yicha qidirish..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredTeachers.length === 0 ? (
          <TeacherEmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    O'qituvchi
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fan
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Telefon
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tajriba
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ish turi
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amallar
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {teacher.firstName.charAt(0)}
                          {teacher.lastName.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {teacher.lastName} {teacher.firstName}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {teacher.subject}
                        </p>

                        <p className="text-xs text-slate-500">
                          {teacher.specialization}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {teacher.phone}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {teacher.experience} yil
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm capitalize text-slate-600">
                        {teacher.teachingType === "offline"
                          ? "Offline"
                          : teacher.teachingType === "online"
                            ? "Online"
                            : "Gibrid"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <TeacherStatusBadge status={teacher.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => onView(teacher)}
                          title="Ko'rish"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => onEdit(teacher)}
                          title="Tahrirlash"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => onDelete(teacher)}
                          title="O'chirish"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <button
                          title="Boshqa amallar"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Jami:{" "}
          <strong className="font-semibold text-slate-700">
            {filteredTeachers.length}
          </strong>{" "}
          ta o'qituvchi
        </span>

        <span>Jami ma'lumotlar: {teachers.length}</span>
      </div>
    </div>
  );
}