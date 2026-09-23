import type { FC } from "react";
import type { Lesson, Group } from "../types";
import Icon from "../../../../components/ui/Icon";

type LessonsTableProps = {
  lessons: Lesson[];
  startIndex: number;
  expanded: Set<number>;
  onToggle: (lessonId: number) => void;
  onAddGroup: (lessonId: number) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lesson: Lesson) => void;
  onEditGroup: (lessonId: number, group: Group) => void;
  onDeleteGroup: (lessonId: number, group: Group) => void;
};

const statusStyles = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-gray-100 text-gray-600",
  upcoming: "bg-amber-100 text-amber-700",
} as const;

const statusLabels = {
  active: "Faol",
  completed: "Yakunlandi",
  upcoming: "Keladi",
} as const;

const LessonsTable: FC<LessonsTableProps> = ({
  lessons,
  startIndex,
  expanded,
  onToggle,
  onAddGroup,
  onEditLesson,
  onDeleteLesson,
  onEditGroup,
  onDeleteGroup,
}) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="w-10 px-4 py-3 font-medium"></th>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Dars nomi</th>
            <th className="px-4 py-3 font-medium">Kod</th>
            <th className="px-4 py-3 font-medium">Holat</th>
            <th className="px-4 py-3 font-medium">Guruhlar soni</th>
            <th className="px-4 py-3 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {lessons.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                Dars topilmadi
              </td>
            </tr>
          ) : (
            lessons.map((lesson, index) => {
              const groups = lesson.groups ?? [];
              const isExpanded = expanded.has(lesson.id);
              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  startIndex={startIndex}
                  groups={groups}
                  isExpanded={isExpanded}
                  onToggle={onToggle}
                  onAddGroup={onAddGroup}
                  onEditLesson={onEditLesson}
                  onDeleteLesson={onDeleteLesson}
                  onEditGroup={onEditGroup}
                  onDeleteGroup={onDeleteGroup}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const LessonRow: FC<{
  lesson: Lesson;
  index: number;
  startIndex: number;
  groups: Group[];
  isExpanded: boolean;
  onToggle: (lessonId: number) => void;
  onAddGroup: (lessonId: number) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lesson: Lesson) => void;
  onEditGroup: (lessonId: number, group: Group) => void;
  onDeleteGroup: (lessonId: number, group: Group) => void;
}> = ({ lesson, index, startIndex, groups, isExpanded, onToggle, onAddGroup, onEditLesson, onDeleteLesson, onEditGroup, onDeleteGroup }) => {
  const status = lesson.status ?? "upcoming";

  return (
    <>
      <tr className="transition hover:bg-gray-50">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={() => onToggle(lesson.id)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Guruhlarni yashirish" : "Guruhlarni ko'rsatish"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <Icon name="chevron-down" className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </td>
        <td className="px-4 py-3 text-gray-400">{startIndex + index + 1}</td>
        <td className="px-4 py-3 font-medium text-gray-900">
          <div>{lesson.name}</div>
          {lesson.description && <div className="mt-0.5 text-xs text-gray-400">{lesson.description}</div>}
        </td>
        <td className="px-4 py-3 text-gray-600">{lesson.code}</td>
        <td className="px-4 py-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
            {statusLabels[status as keyof typeof statusLabels]}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-600">{groups.length}</td>
        <td className="px-4 py-3">
          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={() => onEditLesson(lesson)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Tahrirlash"
            >
              <Icon name="settings" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDeleteLesson(lesson)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
              aria-label="O'chirish"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onAddGroup(lesson.id)}
              className="rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-gray-800"
            >
              Guruh qo'shish
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="bg-gray-50 p-0">
            <div className="overflow-x-auto rounded-lg border-t border-gray-200 bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Guruh nomi</th>
                    <th className="px-4 py-2 font-medium">Kod</th>
                    <th className="px-4 py-2 font-medium">O'qituvchi</th>
                    <th className="px-4 py-2 font-medium">Xona</th>
                    <th className="px-4 py-2 font-medium">O'quvchilar</th>
                    <th className="px-4 py-2 font-medium">Jadval</th>
                    <th className="px-4 py-2 font-medium text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {groups.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                        Guruhlar hali qo'shilmagan
                      </td>
                    </tr>
                  ) : (
                    groups.map((group, groupIndex) => (
                      <tr key={group.id} className="transition hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-400">{groupIndex + 1}</td>
                        <td className="px-4 py-2 font-medium text-gray-900">{group.name}</td>
                        <td className="px-4 py-2 text-gray-600">{group.code}</td>
                        <td className="px-4 py-2 text-gray-600">{group.teacher}</td>
                        <td className="px-4 py-2 text-gray-600">{group.room}</td>
                        <td className="px-4 py-2 text-gray-600">{group.studentCount}</td>
                        <td className="px-4 py-2 text-gray-600">{group.schedule}</td>
                        <td className="px-4 py-2">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => onEditGroup(lesson.id, group)}
                              className="flex h-6 w-6 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                              aria-label="Tahrirlash"
                            >
                              <Icon name="settings" className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteGroup(lesson.id, group)}
                              className="flex h-6 w-6 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                              aria-label="O'chirish"
                            >
                              <Icon name="close" className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default LessonsTable;