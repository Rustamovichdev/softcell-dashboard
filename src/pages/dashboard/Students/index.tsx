import { useState, type FC } from "react";
import Pagination from "./components/Pagination";
import StudentModal from "./components/StudentModal";
import StudentsTable from "./components/StudentsTable";
import StudentsToolbar from "./components/StudentsToolbar";
import { MOCK_STUDENTS, PAGE_SIZE } from "./data";
import type { Student, StudentFormValues } from "./types";

const Students: FC = () => {
  // TODO: backend ulanganda students API dan olinadi (hozircha mock ma'lumot)
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const query = search.trim().toLowerCase();
  const filtered = students.filter(
    ({ ism, familya, raqam, gmail }) =>
      !query || [ism, familya, raqam, gmail].some((value) => value.toLowerCase().includes(query)),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleStudents = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  // Qidiruv o'zgarganda 1-sahifaga qaytamiz
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleAddStudent = (values: StudentFormValues) => {
    // TODO: POST /students - hozircha faqat lokal state'ga qo'shiladi
    setStudents((prev) => {
      const nextId = prev.length ? Math.max(...prev.map(({ id }) => id)) + 1 : 1;
      return [{ id: nextId, ...values }, ...prev];
    });
    setPage(1);
    setModalOpen(false);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold sm:text-xl">Students</h1>
      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">Jami: {filtered.length} ta student</p>

      <StudentsToolbar search={search} onSearchChange={handleSearchChange} onAdd={() => setModalOpen(true)} />

      <StudentsTable students={visibleStudents} startIndex={startIndex} />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      {isModalOpen && <StudentModal onClose={() => setModalOpen(false)} onSubmit={handleAddStudent} />}
    </section>
  );
};

export default Students;