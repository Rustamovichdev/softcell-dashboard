import type { Group, GroupLesson, GroupStatus } from "./types";

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

/** Sanalarga qarab guruh holati avtomatik aniqlanadi */
export const getGroupStatus = (group: Pick<Group, "startDate" | "endDate">): GroupStatus => {
  const now = new Date();
  const start = new Date(group.startDate);
  const end = new Date(group.endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "upcoming";
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "active";
};

/** Guruh darslarini sana bo'yicha teng taqsimlab yaratadi */
const buildLessons = (groupId: number, count: number, startDate: string, endDate: string): GroupLesson[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
  const step = Math.max(1, Math.floor(totalDays / Math.max(1, count)));
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
      endDate: "2026-12-30",
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
      endDate: "2026-12-28",
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
      endDate: "2026-07-30",
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
      endDate: "2027-02-26",
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
      endDate: "2026-10-30",
      payment: 600000,
      lessonCount: 18,
      link: "",
    },
  ] satisfies MockGroupInput[]
).map((group) => ({
  ...group,
  lessons: buildLessons(group.id, group.lessonCount, group.startDate, group.endDate),
}));
