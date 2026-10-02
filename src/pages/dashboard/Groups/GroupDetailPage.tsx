import { useMemo, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  getGroupStatus,
  getGroupTeacherName,
  scheduleTypeLabels,
  statusLabels,
} from "./data";
import { useGroupsStore } from "./store";
import type { GroupStatus } from "./types";

const statusStyles: Record<GroupStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  upcoming: "bg-amber-100 text-amber-700",
  completed: "bg-gray-100 text-gray-600",
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 0 }).format(amount) + " so'm";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const GroupDetailPage: FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const groups = useGroupsStore((state) => state.groups);
  const group = groups.find((item) => item.id === Number(groupId));

  const students = useMemo(() => group?.students ?? [], [group]);

  if (!group) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-400">Guruh topilmadi</p>
        </div>
      </section>
    );
  }

  const status = getGroupStatus(group);
  const teacherName = getGroupTeacherName(group);
  const doneLessons = group.lessons.filter((lesson) => lesson.status === "done").length;

  const info = [
    { label: "Group name", value: group.name },
    { label: "Direction", value: group.direction },
    { label: "Teacher", value: teacherName || "Biriktirilmagan" },
    { label: "Students", value: `${group.students.length} ta student` },
    { label: "Start date", value: formatDate(group.startDate) },
    { label: "End date", value: formatDate(group.endDate) },
    { label: "Payment", value: formatMoney(group.payment) },
    { label: "Status", value: statusLabels[status] },
    { label: "Time", value: `${group.time} (${scheduleTypeLabels[group.scheduleType]})` },
    { label: "Telegram/Jira link", value: group.link || "-" },
    { label: "Number of lessons", value: `${group.lessonCount} ta dars` },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold sm:text-xl">{group.name}</h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {group.direction} &mdash; {doneLessons}/{group.lessonCount} dars bajarilgan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
          <Button variant="outline" onClick={() => navigate("/groups")} className="h-11">
            Orqaga
          </Button>
          <Button onClick={() => navigate(`/groups/${group.id}/edit`)} className="h-11">
            Tahrirlash
          </Button>
        </div>
      </div>

      {/* Group Information */}
      <h2 className="text-base font-semibold">Group Information</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {info.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-sm break-all text-gray-900">
              {item.label === "Telegram/Jira link" && group.link ? (
                <a
                  href={group.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Students */}
      <h2 className="mt-6 text-base font-semibold">Students</h2>
      {students.length === 0 ? (
        <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-400">
          Guruhga student qo&apos;shilmagan
        </p>
      ) : (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((studentName, index) => (
            <li
              key={`${studentName}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                {index + 1}
              </span>
              <span className="text-sm text-gray-900">{studentName}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Lessons (faqat shu guruh ichida) */}
      <h2 className="mt-6 text-base font-semibold">Lessons</h2>
      {group.lessons.length === 0 ? (
        <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-400">
          Darslar hali qo&apos;shilmagan
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Lesson</th>
                <th className="px-4 py-3 font-medium">Sana</th>
                <th className="px-4 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {group.lessons.map((lesson) => (
                <tr key={lesson.id} className="transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{lesson.number}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lesson.title}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(lesson.date)}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {lesson.status === "done"
                      ? "O'tkazildi"
                      : lesson.status === "cancelled"
                        ? "Bekor qilindi"
                        : "Rejalashtirilgan"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default GroupDetailPage;
