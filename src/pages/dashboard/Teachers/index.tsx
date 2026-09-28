import { useEffect, useState } from "react";

import TeacherDetail from "./components/TeacherDetail";
import TeacherForm from "./components/TeacherForm";
import TeacherList from "./components/TeacherList";
import { initialTeachers } from "./data/teachers";
import type { Teacher } from "./types/teachers";

type PageMode = "list" | "create" | "edit" | "detail";

const STORAGE_KEY = "softcell_teachers";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }

      return initialTeachers;
    } catch {
      return initialTeachers;
    }
  });

  const [mode, setMode] = useState<PageMode>("list");

  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(teachers),
    );
  }, [teachers]);

  const handleAdd = () => {
    setSelectedTeacher(null);
    setMode("create");
  };

  const handleView = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setMode("detail");
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setMode("edit");
  };

  const handleDelete = (teacher: Teacher) => {
    const confirmed = window.confirm(
      `${teacher.firstName} ${teacher.lastName} ismli o'qituvchini o'chirishni xohlaysizmi?`,
    );

    if (!confirmed) {
      return;
    }

    setTeachers((prev) =>
      prev.filter((item) => item.id !== teacher.id),
    );

    if (selectedTeacher?.id === teacher.id) {
      setSelectedTeacher(null);
      setMode("list");
    }
  };

  const handleSubmit = (teacher: Teacher) => {
    setTeachers((prev) => {
      const exists = prev.some(
        (item) => item.id === teacher.id,
      );

      if (exists) {
        return prev.map((item) =>
          item.id === teacher.id ? teacher : item,
        );
      }

      return [teacher, ...prev];
    });

    setSelectedTeacher(teacher);
    setMode("detail");
  };

  const handleBackToList = () => {
    setSelectedTeacher(null);
    setMode("list");
  };

  if (mode === "create") {
    return (
      <div className="p-6">
        <TeacherForm
          onCancel={handleBackToList}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  if (mode === "edit" && selectedTeacher) {
    return (
      <div className="p-6">
        <TeacherForm
          teacher={selectedTeacher}
          onCancel={() => setMode("detail")}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  if (mode === "detail" && selectedTeacher) {
    return (
      <div className="p-6">
        <TeacherDetail
          teacher={selectedTeacher}
          onBack={handleBackToList}
          onEdit={() => setMode("edit")}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <TeacherList
        teachers={teachers}
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}