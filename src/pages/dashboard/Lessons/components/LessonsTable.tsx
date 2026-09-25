import type { FC } from "react";
import type { Lesson, Group } from "../types";

type LessonsTableProps = {
  lessons: Lesson[];
  startIndex: number;
  onViewLesson: (lessonId: number) => void;
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

const LessonsTable: FC<LessonsTableProps> = ({ lessons, startIndex, onViewLesson }) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Dars nomi</th>
            <th className="px-4 py-3 font-medium">Kod</th>
            <th className="px-4 py-3 font-medium">Holat</th>
            <th className="px-4 py-3 font-medium">Guruhlar soni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {lessons.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                Dars topilmadi
              </td>
            </tr>
          ) : (
            lessons.map((lesson, index) => {
              const groups = lesson.groups ?? [];
              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  startIndex={startIndex}
                  groups={groups}
                  onViewLesson={onViewLesson}
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
  onViewLesson: (lessonId: number) => void;
}> = ({ lesson, index, startIndex, groups, onViewLesson }) => {
  const status = lesson.status ?? "upcoming";

  return (
    <tr className="transition hover:bg-gray-50 cursor-pointer" onClick={() => onViewLesson(lesson.id)}>
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
    </tr>
  );
};

export default LessonsTable;