import { useState, type FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./components/Pagination";
import LessonsToolbar from "./components/LessonsToolbar";
import LessonsTable from "./components/LessonsTable";
import { PAGE_SIZE } from "./data";
import { useLessonsStore } from "./store";

const Lessons: FC = () => {
  const navigate = useNavigate();
  const lessons = useLessonsStore((state) => state.lessons);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold sm:text-xl">Lessons</h1>
      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
        Jami: {filtered.length} ta dars, {totalGroups} ta guruh
      </p>

      <LessonsToolbar search={search} onSearchChange={handleSearchChange} onAdd={() => navigate("/lessons/new")} />

      <LessonsTable
        lessons={visibleLessons}
        startIndex={startIndex}
        onViewLesson={(lessonId) => navigate(`/lessons/${lessonId}`)}
      />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default Lessons;