/* Groups sahifasi uchun type'lar */

/** Guruh holati */
export type GroupStatus = "upcoming" | "active" | "completed";

/** Dars qancha kun oralig'ida o'tkaziladi */
export type GroupScheduleType = "even" | "odd" | "daily";

/** Guruh ichidagi bitta dars */
export type GroupLesson = {
  id: number;
  /** Dars raqami (1, 2, 3 ...) */
  number: number;
  title: string;
  date: string;
  status: "planned" | "done" | "cancelled";
};

/** Guruh */
export type Group = {
  id: number;
  name: string;
  direction: string;
  /** Tanlangan ustoz id'si (Groups moduli ro'yxati), bo'sh bo'lishi mumkin */
  teacherId: string | null;
  /** Qo'lda kiritilgan ustoz ismi (ro'yxatda yo'q bo'lsa) */
  teacherName: string;
  /** Guruhdagi o'quvchilar (avvaldan mavjudlidan tanlanadi yoki qo'lda kiritiladi) */
  students: string[];
  scheduleType: GroupScheduleType;
  /** Dars vaqti, masalan "18:00" */
  time: string;
  startDate: string;
  /** Guruh to'lovi (so'm) */
  payment: number;
  /** Jami darslar soni */
  lessonCount: number;
  /** Telegram / Jira linki */
  link: string;
  lessons: GroupLesson[];
};

/** "Guruh qo'shish/tahrirlash" formasi maydonlari */
export type GroupFormValues = Omit<Group, "id" | "lessons">;

/** Guruhga biriktiriladigan o'quvchilar maksimal soni */
export const MAX_STUDENTS_PER_GROUP = 5;
