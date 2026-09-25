import { useParams, useNavigate } from "react-router-dom";
import { type FC, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import type { Lesson } from "./types";
import { useLessonsStore } from "./store";

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

const LessonDetailPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lessons = useLessonsStore((state) => state.lessons);
  const [lesson, setLesson] = useState<Lesson | undefined>();

  useEffect(() => {
    if (lessonId) {
      const found = lessons.find((l) => l.id === Number(lessonId));
      setLesson(found);
    }
  }, [lessonId, lessons]);

  const onBack = () => {
    navigate("/lessons");
  };

  const onAddGroup = () => {
    if (lessonId) {
      navigate(`/lessons/${lessonId}/add-group`);
    }
  };

  if (!lesson) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Dars topilmadi</p>
        </div>
      </section>
    );
  }

  const status = lesson.status ?? "upcoming";
  const groups = lesson.groups ?? [];
  const totalStudents = groups.reduce((sum, g) => sum + g.studentCount, 0);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="h-11">
            <Icon name="chevron-down" className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-lg font-semibold sm:text-xl">{lesson.name}</h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">Kod: {lesson.code}</p>
          </div>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
          {statusLabels[status as keyof typeof statusLabels]}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Tavsif</p>
          <p className="mt-1 text-sm text-gray-900">{lesson.description || "Tavsif yo'q"}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Guruhlar soni</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{groups.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs text-gray-500">Jami o'quvchilar</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalStudents}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Guruhlar</h2>
        <Button onClick={onAddGroup} className="h-11">
          <Icon name="check" className="h-4 w-4 mr-2" />
          Guruhga qo'shish
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Guruh nomi</th>
              <th className="px-4 py-3 font-medium">Kod</th>
              <th className="px-4 py-3 font-medium">O'quvchilar</th>
              <th className="px-4 py-3 font-medium">Dars jadvali</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groups.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  Guruhlar hali qo'shilmagan
                </td>
              </tr>
            ) : (
              groups.map((group, index) => (
                <tr key={group.id} className="transition hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{group.name}</td>
                  <td className="px-4 py-3 text-gray-600">{group.code}</td>
                  <td className="px-4 py-3 text-gray-600">{group.studentCount}</td>
                  <td className="px-4 py-3 text-gray-600">{group.schedule}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LessonDetailPage;