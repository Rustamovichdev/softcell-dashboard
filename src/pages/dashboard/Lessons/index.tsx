import { useState, type FC, useMemo } from "react";
import Pagination from "./components/Pagination";
import LessonModal from "./components/LessonModal";
import GroupModal from "./components/GroupModal";
import ConfirmModal from "./components/ConfirmModal";
import LessonsToolbar from "./components/LessonsToolbar";
import LessonsTable from "./components/LessonsTable";
import { MOCK_LESSONS, PAGE_SIZE } from "./data";
import type { Lesson, Group, LessonFormValues, GroupFormValues } from "./types";

const Lessons: FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Lesson["status"] | "all">("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [isLessonModalOpen, setLessonModalOpen] = useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingGroup, setEditingGroup] = useState<{ lessonId: number; group: Group } | null>(null);
  const [deletingLesson, setDeletingLesson] = useState<Lesson | null>(null);
  const [deletingGroup, setDeletingGroup] = useState<{ lessonId: number; group: Group } | null>(null);

  const query = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      lessons.filter(({ name, code, description, status }) => {
        if (statusFilter !== "all" && status !== statusFilter) return false;
        if (!query) return true;
        return [name, code, description].some((value) => value?.toLowerCase().includes(query));
      }),
    [lessons, query, statusFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleLessons = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const totalGroups = useMemo(
    () => lessons.reduce((sum, lesson) => sum + (lesson.groups?.length ?? 0), 0),
    [lessons],
  );

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? null;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: Lesson["status"] | "all") => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleAddLesson = (values: LessonFormValues) => {
    if (editingLesson) {
      setLessons((prev) =>
        prev.map((l) => (l.id === editingLesson.id ? { ...l, ...values } : l)),
      );
      setEditingLesson(null);
    } else {
      setLessons((prev) => {
        const nextId = prev.length ? Math.max(...prev.map(({ id }) => id)) + 1 : 1;
        return [{ id: nextId, ...values, groups: [] }, ...prev];
      });
      setPage(1);
    }
    setLessonModalOpen(false);
  };

  const handleAddGroup = (lessonId: number, values: GroupFormValues) => {
    setLessons((prev) =>
      prev.map((lesson) => {
        if (lesson.id !== lessonId) return lesson;
        const groups = lesson.groups ?? [];
        if (editingGroup) {
          return {
            ...lesson,
            groups: groups.map((g) => (g.id === editingGroup.group.id ? { ...g, ...values } : g)),
          };
        }
        const nextId = groups.length ? Math.max(...groups.map(({ id }) => id)) + 1 : 1;
        return {
          ...lesson,
          groups: [{ id: nextId, ...values }, ...groups],
        };
      }),
    );
    setExpanded((prev) => new Set(prev).add(lessonId));
    setGroupModalOpen(false);
    setActiveLessonId(null);
    setEditingGroup(null);
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    setDeletingLesson(null);
  };

  const handleDeleteGroup = () => {
    if (!deletingGroup) return;
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === deletingGroup.lessonId
          ? { ...lesson, groups: lesson.groups?.filter((g) => g.id !== deletingGroup.group.id) ?? [] }
          : lesson,
      ),
    );
    setDeletingGroup(null);
  };

  const toggleExpand = (lessonId: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold sm:text-xl">Lessons</h1>
      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
        Jami: {filtered.length} ta dars, {totalGroups} ta guruh
      </p>

      <LessonsToolbar
        search={search}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
        onAdd={() => { setEditingLesson(null); setLessonModalOpen(true); }}
      />

      <LessonsTable
        lessons={visibleLessons}
        startIndex={startIndex}
        expanded={expanded}
        onToggle={toggleExpand}
        onAddGroup={(lessonId) => { setActiveLessonId(lessonId); setEditingGroup(null); setGroupModalOpen(true); }}
        onEditLesson={(lesson) => { setEditingLesson(lesson); setLessonModalOpen(true); }}
        onDeleteLesson={(lesson) => setDeletingLesson(lesson)}
        onEditGroup={(lessonId, group) => { setActiveLessonId(lessonId); setEditingGroup({ lessonId, group }); setGroupModalOpen(true); }}
        onDeleteGroup={(lessonId, group) => setDeletingGroup({ lessonId, group })}
      />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      {isLessonModalOpen && editingLesson && (
        <LessonModal
          lesson={{
            name: editingLesson.name,
            code: editingLesson.code,
            description: editingLesson.description,
            status: editingLesson.status,
          }}
          onClose={() => { setLessonModalOpen(false); setEditingLesson(null); }}
          onSubmit={handleAddLesson}
        />
      )}
      {isLessonModalOpen && !editingLesson && (
        <LessonModal onClose={() => setLessonModalOpen(false)} onSubmit={handleAddLesson} />
      )}

      {isGroupModalOpen && activeLesson && (
        <GroupModal
          lessonName={activeLesson.name}
          group={editingGroup?.group ? {
            name: editingGroup.group.name,
            code: editingGroup.group.code,
            studentCount: editingGroup.group.studentCount,
            schedule: editingGroup.group.schedule,
            teacher: editingGroup.group.teacher,
            room: editingGroup.group.room,
          } : undefined}
          onClose={() => { setGroupModalOpen(false); setActiveLessonId(null); setEditingGroup(null); }}
          onSubmit={(values) => handleAddGroup(activeLesson.id, values)}
        />
      )}

      {deletingLesson && (
        <ConfirmModal
          title="Darsni o'chirish"
          description={`"${deletingLesson.name}" darsini o'chirmoqchi bo'lsangiz, uning bamma guruhlar ham o'chadi. Davom etishishni xohlaysiz?`}
          danger
          onClose={() => setDeletingLesson(null)}
          onConfirm={() => handleDeleteLesson(deletingLesson)}
        />
      )}

      {deletingGroup && (
        <ConfirmModal
          title="Guruhni o'chirish"
          description={`"${deletingGroup.group.name}" guruhini o'chirmoqchi bo'lsangiz, ro'yxatdan chiqariladi. Davom etishni xohlaysiz?`}
          danger
          onClose={() => setDeletingGroup(null)}
          onConfirm={() => handleDeleteGroup()}
        />
      )}
    </section>
  );
};

export default Lessons;