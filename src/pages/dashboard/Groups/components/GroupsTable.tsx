import type { FC } from "react";
import type { Group, GroupStatus } from "../types";
import { getGroupStatus, getGroupTeacherName, scheduleTypeLabels, statusLabels } from "../data";

type GroupsTableProps = {
  groups: Group[];
  startIndex: number;
  onOpenGroup: (groupId: number) => void;
};

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

const GroupsTable: FC<GroupsTableProps> = ({ groups, startIndex, onOpenGroup }) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full min-w-[1000px] text-left text-sm">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="px-4 py-3 font-medium">#</th>
          <th className="px-4 py-3 font-medium">Group name</th>
          <th className="px-4 py-3 font-medium">Direction</th>
          <th className="px-4 py-3 font-medium">Started date</th>
          <th className="px-4 py-3 font-medium">Time</th>
          <th className="px-4 py-3 font-medium">Payment</th>
          <th className="px-4 py-3 font-medium">Lessons</th>
          <th className="px-4 py-3 font-medium">Students</th>
          <th className="px-4 py-3 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {groups.length === 0 ? (
          <tr>
            <td colSpan={9} className="px-4 py-10 text-center text-gray-400">
              Guruh topilmadi
            </td>
          </tr>
        ) : (
          groups.map((group, index) => {
            const status = getGroupStatus(group);
            return (
              <tr
                key={group.id}
                onClick={() => onOpenGroup(group.id)}
                className="cursor-pointer transition hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-400">{startIndex + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {group.name}
                  {group.teacherId ? (
                    <div className="mt-0.5 text-xs text-gray-400">{getGroupTeacherName(group)}</div>
                  ) : (
                    <div className="mt-0.5 text-xs text-amber-600">O&apos;qituvchi biriktirilmagan</div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{group.direction}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(group.startDate)}</td>
                <td className="px-4 py-3 text-gray-600">
                  {group.time}
                  <div className="mt-0.5 text-xs text-gray-400">
                    {scheduleTypeLabels[group.scheduleType]}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-900">{formatMoney(group.payment)}</td>
                <td className="px-4 py-3 text-gray-600">{group.lessonCount} ta dars</td>
                <td className="px-4 py-3 text-gray-600">{group.students.length} ta student</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
);

export default GroupsTable;
