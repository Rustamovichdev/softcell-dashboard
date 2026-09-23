/* Lessons sahifasi uchun type'lar */

/** Dars ichidagi guruh */
export type Group = {
  id: number;
  name: string;
  code: string;
  studentCount: number;
  schedule: string;
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

/** "Dars qo'shish" formasi maydonlari (guruhlar alohida qo'shiladi) */
export type LessonFormValues = Omit<Lesson, "id" | "groups">;

/** "Guruh qo'shish" formasi maydonlari (id avtomatik beriladi) */
export type GroupFormValues = Omit<Group, "id">;