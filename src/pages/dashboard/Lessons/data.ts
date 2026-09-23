import type { Lesson } from "./types";

/** Bir sahifada nechta dars ko'rinadi */
export const PAGE_SIZE = 5;

/** Har bir dars uchun asosiy o'qituvchi */
const LESSON_TEACHERS: Record<number, string> = {
  1: "Karimov Aziz",
  2: "To'xtapov Dilshod",
  3: "Islomov Jasur",
  4: "Mannonova Sevda",
  5: "Nurmatov Bekzod",
  6: "Shokirova Nilufar",
  7: "Xolmatov Rustam",
};

/** Har bir dars uchun binolar/ko'rinish o'rinlari */
const LESSON_ROOMS: Record<number, string> = {
  1: "A-101",
  2: "A-102",
  3: "B-201",
  4: "B-202",
  5: "C-301",
  6: "C-302",
  7: "D-401",
};

/** Har bir dars uchun guruh nomlari va jadvali */
const GROUP_SCHEDULES = [
  "Dushanba 10:00-12:00",
  "Dushanba 14:00-16:00",
  "Seshanba 10:00-12:00",
  "Seshanba 14:00-16:00",
  "Chorshanba 10:00-12:00",
  "Chorshanba 14:00-16:00",
  "Payshanba 10:00-12:00",
];

const GROUP_PREFIXES = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"];

/** 7 ta dars, har biri 7 ta guruh bilan */
export const MOCK_LESSONS: Lesson[] = [
  {
    id: 1,
    name: "Frontend Development",
    code: "FD-2024-01",
    description: "React, TypeScript, Vite, TailwindCSS bilan zamonaviy frontend",
    status: "active",
    groups: buildGroups(1, "FD"),
  },
  {
    id: 2,
    name: "Backend Development",
    code: "BD-2024-02",
    description: "Node.js, Express, PostgreSQL, Redis bilan backend dasturlash",
    status: "active",
    groups: buildGroups(2, "BD"),
  },
  {
    id: 3,
    name: "Mobile Development",
    code: "MD-2024-03",
    description: "React Native, Flutter bilan cross-platform mobil ilovalar",
    status: "upcoming",
    groups: buildGroups(3, "MD"),
  },
  {
    id: 4,
    name: "Data Science & ML",
    code: "DS-2024-04",
    description: "Python, Pandas, Scikit-learn, TensorFlow bilan ma'lumotlar tahlili",
    status: "upcoming",
    groups: buildGroups(4, "DS"),
  },
  {
    id: 5,
    name: "DevOps Engineering",
    code: "DE-2024-05",
    description: "Docker, Kubernetes, CI/CD, AWS, Terraform bilan DevOps",
    status: "active",
    groups: buildGroups(5, "DE"),
  },
  {
    id: 6,
    name: "UX/UI Design",
    code: "UX-2024-06",
    description: "Figma, prototiplash, user research, design systems",
    status: "completed",
    groups: buildGroups(6, "UX"),
  },
  {
    id: 7,
    name: "QA & Test Automation",
    code: "QA-2024-07",
    description: "Manual testing, Playwright, Cypress, Postman, API testing",
    status: "upcoming",
    groups: buildGroups(7, "QA"),
  },
];

/** Berilgan dars uchun 7 ta guruhini yaratadi (teacher + room bilan) */
function buildGroups(lessonId: number, prefix: string) {
  const teacher = LESSON_TEACHERS[lessonId];
  const room = LESSON_ROOMS[lessonId];
  return GROUP_PREFIXES.map((name, i) => ({
    id: lessonId * 100 + i + 1,
    name,
    code: `${prefix}-${String.fromCharCode(65 + i)}`,
    studentCount: 18 + ((lessonId * 3 + i * 7) % 15),
    schedule: GROUP_SCHEDULES[i],
    teacher,
    room,
  }));
}