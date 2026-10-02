import type { Group, GroupLesson, GroupScheduleType, GroupStatus } from "./types";

/** Bir sahifada nechta guruh ko'rinadi */
export const PAGE_SIZE = 10;

/** Guruhga biriktiriladigan ustozlar (boshqalar qo'lda kiritiladi) */
export const GROUP_TEACHERS = [
  { id: "t1", name: "Dilnoza Karimova" },
  { id: "t2", name: "Sarvar Qurbonov" },
] as const;

/** Qo'lda kiritish variantidagi sentinel qiymat */
export const CUSTOM_TEACHER = "custom";

/** Yo'nalishlar */
export const DIRECTIONS = [
  "English",
  "IELTS",
  "General English",
  "Speaking",
  "Grammar",
] as const;

/** Dars vaqti variantlari */
export const TIME_PRESETS = ["10:00", "12:00", "14:00", "16:00", "18:00", "19:30"] as const;

export const scheduleTypeLabels = {
  even: "Juft kunlari",
  odd: "Toq kunlari",
  daily: "Har kuni",
} as const;

export const statusLabels: Record<GroupStatus, string> = {
  upcoming: "Upcoming",
  active: "Active",
  completed: "Completed",
};

/** Guruh o'quvchilari (qo'lda kiritilgan ismlar) */
export const getGroupStudentNames = (group: Group) => group.students;

/** Guruh o'qituvchisining to'liq ismi (avval qo'lda kiritilgan, keyin ro'yxatdan) */
export const getGroupTeacherName = (group: Group) => {
  if (group.teacherName) return group.teacherName;
  if (!group.teacherId) return "";
  return GROUP_TEACHERS.find((t) => t.id === group.teacherId)?.name ?? "";
};

/** Haftada necha dars o'tkaziladi */
const getLessonsPerWeek = (scheduleType: GroupScheduleType) =>
  scheduleType === "daily" ? 7 : 2;

/**
 * Guruh tugash sanasi: startDate + darslar soni va chastotasidan hisoblanadi.
 * (End Date alohida kiritilmaydi — foydalanuvchi shuni olib tashladi)
 */
export const getGroupEndDate = (
  group: Pick<Group, "startDate" | "lessonCount" | "scheduleType">,
) => {
  const start = new Date(group.startDate);
  if (Number.isNaN(start.getTime()) || group.lessonCount < 1) return null;

  const weeks = Math.max(1, Math.ceil(group.lessonCount / getLessonsPerWeek(group.scheduleType)));
  const end = new Date(start);
  end.setDate(end.getDate() + weeks * 7 - 1);
  return end;
};

/** Sanalarga qarab guruh holati avtomatik aniqlanadi */
export const getGroupStatus = (
  group: Pick<Group, "startDate" | "lessonCount" | "scheduleType">,
): GroupStatus => {
  const now = new Date();
  const start = new Date(group.startDate);
  const end = getGroupEndDate(group);

  if (Number.isNaN(start.getTime()) || !end) return "upcoming";
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
};

/** Guruh darslarini boshlanish sanasidan teng taqsimlab yaratadi */
export const buildGroupLessons = (
  groupId: number,
  group: Pick<Group, "startDate" | "lessonCount" | "scheduleType">,
): GroupLesson[] => {
  const start = new Date(group.startDate);
  const end = getGroupEndDate(group);
  const count = group.lessonCount;
  if (Number.isNaN(start.getTime()) || !end || count < 1) return [];

  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
  const step = Math.max(1, Math.floor(totalDays / count));
  const now = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + index * step);

    return {
      id: groupId * 1000 + index + 1,
      number: index + 1,
      title: `${index + 1}-dars`,
      date: date.toISOString(),
      status: date < now ? "done" : "planned",
    };
  });
};

type MockGroupInput = Omit<Group, "id" | "lessons"> & { id: number };

export const MOCK_GROUPS: Group[] = (
  [
    {
      id: 1,
      name: "English A1",
      direction: "English",
      teacherId: "t1",
      teacherName: "",
      students: ["Alisher Karimov", "Bekzod Tursunov", "Doston Rahimov", "Elvin Saidov", "Farruh Usmonov"],
      scheduleType: "even",
      time: "18:00",
      startDate: "2026-10-01",
      payment: 900000,
      lessonCount: 24,
      link: "https://t.me/english_a1",
    },
    {
      id: 2,
      name: "IELTS 7.0",
      direction: "IELTS",
      teacherId: "t2",
      teacherName: "",
      students: ["Gavhar Qodirova", "Husniddin Aliyev", "Ibrohim Norqulov", "Jasur Ergashev"],
      scheduleType: "odd",
      time: "16:00",
      startDate: "2026-08-03",
      payment: 1500000,
      lessonCount: 36,
      link: "https://t.me/ielts_70",
    },
    {
      id: 3,
      name: "Speaking B2",
      direction: "Speaking",
      teacherId: "t1",
      teacherName: "",
      students: ["Kamron Sodiqov", "Laziz Rustamov", "Muhammad Sherzod"],
      scheduleType: "daily",
      time: "19:30",
      startDate: "2026-06-01",
      payment: 750000,
      lessonCount: 20,
      link: "",
    },
    {
      id: 4,
      name: "Grammar A2",
      direction: "Grammar",
      teacherId: "t1",
      teacherName: "",
      students: ["Nodirbek Yusupov", "Otabek Mamatov", "Ozod Shukurov", "Piyoda Xolmatova", "Qodirjon To'rayev"],
      scheduleType: "even",
      time: "14:00",
      startDate: "2026-11-02",
      payment: 1100000,
      lessonCount: 30,
      link: "https://jira.softcell.uz/browse/GRAM-1",
    },
    {
      id: 5,
      name: "General English C1",
      direction: "General English",
      teacherId: null,
      teacherName: "",
      students: ["Ravshan Oripov", "Sirojiddin Husanov"],
      scheduleType: "daily",
      time: "12:00",
      startDate: "2026-09-01",
      payment: 600000,
      lessonCount: 18,
      link: "",
    },
  ] satisfies MockGroupInput[]
).map((group) => ({
  ...group,
  lessons: buildGroupLessons(group.id, group),
}));
