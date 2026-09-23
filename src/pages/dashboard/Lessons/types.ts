/* Lessons sahifasi uchun type'lar */

/** Dars ichidagi guruh */
export type Group = {
  id: number;
  name: string;
  code: string;
  studentCount: number;
  schedule: string;
  teacher: string;
  room: string;
};

/** Dars (guruhlar bilan) */
export type Lesson = {
  id: number;
  name: string;
  code: string;
  description: string;
  status: "active" | "completed" | "upcoming";
  groups: Group[];
};

/** "Dars qo'shish/tahrirlash" formasi maydonlari */
export type LessonFormValues = Omit<Lesson, "id" | "groups">;

/** "Guruh qo'shish/tahrirlash" formasi maydonlari */
export type GroupFormValues = Omit<Group, "id">;