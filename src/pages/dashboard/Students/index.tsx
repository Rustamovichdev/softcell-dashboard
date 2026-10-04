import { useEffect, useState, type FC } from "react";
import Pagination from "./components/Pagination";
import StudentsTable from "./components/StudentsTable";
import StudentsToolbar from "./components/StudentsToolbar";
import NewStudent from "./NewStudent";
import { MOCK_STUDENTS } from "./data";
import type { Student, StudentFormValues } from "./types";

const STUDENTS_STORAGE_KEY = "softcell_students";
const PAGE_SIZE_STORAGE_KEY = "softcell_students_page_size";

const Students: FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STUDENTS_STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return MOCK_STUDENTS;
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Tanlangan qator sonini localStorage dan o'qiydi (agar saqlanmagan bo'lsa default 10)
  const [pageSize, setPageSize] = useState<number>(() => {
    const savedSize = localStorage.getItem(PAGE_SIZE_STORAGE_KEY);
    if (savedSize) {
      const parsed = Number(savedSize);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return 10;
  });

  const [isNewPage, setIsNewPage] = useState(
    window.location.pathname === "/students/new",
  );

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Browser back / forward
  useEffect(() => {
    const handlePopState = () => {
      setIsNewPage(window.location.pathname === "/students/new");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openNewStudentPage = () => {
    window.history.pushState({}, "", "/students/new");
    setIsNewPage(true);
    window.scrollTo(0, 0);
  };

  const backToStudents = () => {
    window.history.pushState({}, "", "/students");
    setIsNewPage(false);
    window.scrollTo(0, 0);
  };

  const handleAddStudent = (values: StudentFormValues) => {
    setStudents((prev) => {
      const nextId =
        prev.length > 0
          ? Math.max(...prev.map((student) => student.id)) + 1
          : 1;

      const newStudent: Student = {
        id: nextId,
        ...values,
      };

      const updated = [newStudent, ...prev];

      localStorage.setItem(
        STUDENTS_STORAGE_KEY,
        JSON.stringify(updated),
      );

      return updated;
    });

    setPage(1);
    backToStudents();
  };

  if (isNewPage) {
    return (
      <NewStudent
        onBack={backToStudents}
        onSave={handleAddStudent}
      />
    );
  }

  const query = debouncedSearch.trim().toLowerCase();

  const filtered = students.filter(
    ({ ism, familya, raqam, gmail }) =>
      !query ||
      [ism, familya, raqam, gmail].some((value) =>
        value.toLowerCase().includes(query),
      ),
  );

  // Tanlangan pageSize (5, 10, 15, 20) bo'yicha sahifalar soni
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize),
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;

  const visibleStudents = filtered.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Qator soni tanlanganda darhol localStorage ga saqlab qo'yadi
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(newSize));
    setPage(1);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold sm:text-xl">
        Students
      </h1>

      <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
        Jami: {filtered.length} ta student
      </p>

      <StudentsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        onAdd={openNewStudentPage}
      />

      <StudentsTable
        students={visibleStudents}
        startIndex={startIndex}
      />

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        totalItems={filtered.length}
      />
    </section>
  );
};

export default Students;
