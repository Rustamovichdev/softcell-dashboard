import { useState, type FC, useMemo } from "react";
import Pagination from "./components/Pagination";
import LessonModal from "./components/LessonModal";
import GroupModal from "./components/GroupModal";
import LessonsToolbar from "./components/LessonsToolbar";
import LessonsTable from "./components/LessonsTable";
import { MOCK_LESSONS, PAGE_SIZE } from "./data";
import type { Lesson, LessonFormValues, GroupFormValues } from "./types";

const Lessons: FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [isLessonModalOpen, setLessonModalOpen] = useState(false);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const query = search.trim().toLowerCase();
  const filtered = useMemo(
    () => lessons.filter(({ name, code, description }) =>
      !query || [name, code, description].some((value) => value?.toLowerCase().includes(query)),
    ),
    [lessons, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleLessons = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const totalGroups = useMemo(
    () => lessons.reduce((sum, lesson) => sum + (lesson.groups?.length ?? 0), 0),
    [lessons],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleAddLesson = (values: LessonFormValues) => {
    setLessons((prev) => {
      const nextId = prev.length ? Math.max(...prev.map(({ id }) => id)) + 1 : 1;
      return [{ id: nextId, ...values, groups: [] }, ...prev];
    });
    setPage(1);
    setLessonModalOpen(false);
  };

  const handleAddGroup = (lessonId: number, values: GroupFormValues) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              groups: [
                ...(lesson.groups ?? []),
                { id: Date.now(), ...values },
              ],
            }
          : lesson,
      ),
    );
    setExpanded((prev) => new Set(prev).add(lessonId));
    setGroupModalOpen(false);
    setActiveLessonId(null);
  };

  const toggleExpand = (lessonId: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold sm:text-xl">Lessons</h1>
      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
        Jami: {filtered.length} ta dars, {totalGroups} ta guruh
      </p>

      <LessonsToolbar search={search} onSearchChange={handleSearchChange} onAdd={() => setLessonModalOpen(true)} />

      <LessonsTable
        lessons={visibleLessons}
        startIndex={startIndex}
        expanded={expanded}
        onToggle={toggleExpand}
        onAddGroup={(lessonId) => { setActiveLessonId(lessonId); setGroupModalOpen(true); }}
      />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      {isLessonModalOpen && <LessonModal onClose={() => setLessonModalOpen(false)} onSubmit={handleAddLesson} />}
      {isGroupModalOpen && activeLesson && (
        <GroupModal
          lessonName={activeLesson.name}
          onClose={() => { setGroupModalOpen(false); setActiveLessonId(null); }}
          onSubmit={(values) => handleAddGroup(activeLesson.id, values)}
        />
      )}
    </section>
  );
};

export default Lessons;