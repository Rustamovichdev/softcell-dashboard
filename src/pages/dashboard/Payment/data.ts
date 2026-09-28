import { MOCK_STUDENTS, getStudentName } from "../Students/data";
import type { Payment, PaymentStatus } from "./types";

export const PAGE_SIZE = 10;

/** Talabalar ro'yxati (Students moduli bilan bir xil) */
export const STUDENTS = MOCK_STUDENTS.map(({ id, ism, familya }) => ({
  id,
  name: `${ism} ${familya}`,
}));

/** Bugundan necha oy oldin kurs boshlanishi (0 = shu oy) */
export type StudentEnrollment = {
  studentId: number;
  studentName: string;
  lessonId: number;
  lessonName: string;
  groupId: number;
  groupName: string;
  /** Kurs qancha oy oldin boshlangan */
  startedMonthsAgo: number;
  /** Kurs davomiyligi (oy) */
  totalMonths: number;
  /** Bir oylik to'lov summasi */
  monthlyAmount: number;
  currency: "UZS" | "USD";
};

export const ENROLLMENTS: StudentEnrollment[] = [
  { studentId: 1,  studentName: getStudentName(1),  lessonId: 1, lessonName: "Frontend Development",  groupId: 101, groupName: "Alpha", startedMonthsAgo: 3, totalMonths: 6, monthlyAmount: 2500000, currency: "UZS" },
  { studentId: 2,  studentName: getStudentName(2),  lessonId: 1, lessonName: "Frontend Development",  groupId: 101, groupName: "Alpha", startedMonthsAgo: 3, totalMonths: 6, monthlyAmount: 2500000, currency: "UZS" },
  { studentId: 3,  studentName: getStudentName(3),  lessonId: 2, lessonName: "Backend Development",   groupId: 201, groupName: "Alpha", startedMonthsAgo: 5, totalMonths: 6, monthlyAmount: 3000000, currency: "UZS" },
  { studentId: 4,  studentName: getStudentName(4),  lessonId: 3, lessonName: "Mobile Development",   groupId: 301, groupName: "Alpha", startedMonthsAgo: 2, totalMonths: 6, monthlyAmount: 2800000, currency: "UZS" },
  { studentId: 5,  studentName: getStudentName(5),  lessonId: 4, lessonName: "Data Science & ML",    groupId: 401, groupName: "Alpha", startedMonthsAgo: 6, totalMonths: 6, monthlyAmount: 3500000, currency: "UZS" },
  { studentId: 6,  studentName: getStudentName(6),  lessonId: 5, lessonName: "DevOps Engineering",   groupId: 501, groupName: "Alpha", startedMonthsAgo: 1, totalMonths: 6, monthlyAmount: 3200000, currency: "UZS" },
  { studentId: 7,  studentName: getStudentName(7),  lessonId: 6, lessonName: "UX/UI Design",         groupId: 601, groupName: "Alpha", startedMonthsAgo: 4, totalMonths: 4, monthlyAmount: 2200000, currency: "UZS" },
  { studentId: 8,  studentName: getStudentName(8),  lessonId: 7, lessonName: "QA & Test Automation", groupId: 701, groupName: "Alpha", startedMonthsAgo: 2, totalMonths: 6, monthlyAmount: 2000000, currency: "UZS" },
  { studentId: 9,  studentName: getStudentName(9),  lessonId: 1, lessonName: "Frontend Development",  groupId: 102, groupName: "Beta",  startedMonthsAgo: 2, totalMonths: 6, monthlyAmount: 2500000, currency: "UZS" },
  { studentId: 10, studentName: getStudentName(10), lessonId: 2, lessonName: "Backend Development",   groupId: 202, groupName: "Beta",  startedMonthsAgo: 3, totalMonths: 6, monthlyAmount: 3000000, currency: "UZS" },
  { studentId: 11, studentName: getStudentName(11), lessonId: 3, lessonName: "Mobile Development",   groupId: 302, groupName: "Beta",  startedMonthsAgo: 1, totalMonths: 6, monthlyAmount: 2800000, currency: "UZS" },
  { studentId: 12, studentName: getStudentName(12), lessonId: 4, lessonName: "Data Science & ML",    groupId: 402, groupName: "Beta",  startedMonthsAgo: 4, totalMonths: 6, monthlyAmount: 3500000, currency: "UZS" },
];

/** Oyning 1-sani (month overflow bo'lmasligi uchun) */
const monthStart = (date: Date, offsetMonths: number) => {
  const result = new Date(date.getFullYear(), date.getMonth() + offsetMonths, 1);
  return result;
};

/** Sana ustiga kun qo'shish */
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Har bir o'quvchi uchun oylik to'lovlarni yaratadi (6 oy = 6 ta qator).
 * - dueDate  : oyning 1-sani (to'lov muddati)
 * - paidAt   : to'lov muddatidan 2-5 kun keyin (real to'lov sanasi)
 * - to'langan oylar o'tgan oylarga to'g'ri keladi
 */
const buildMonthlyPayments = (enrollment: StudentEnrollment, today: Date): Payment[] => {
  const start = monthStart(today, -enrollment.startedMonthsAgo);

  return Array.from({ length: enrollment.totalMonths }, (_, index) => {
    const month = index + 1;
    const dueDate = monthStart(start, index);
    const paidAt = addDays(dueDate, 2 + (index % 4)); // 2-5 kun kechikish

    const isDuePast = dueDate < today;
    const isFailed = enrollment.studentId === 4 && month === 1;

    let status: PaymentStatus = "pending";
    if (isFailed) status = "failed";
    else if (isDuePast && paidAt < today) status = "completed";

    const isPaid = status === "completed";

    return {
      id: enrollment.studentId * 100 + month,
      studentId: enrollment.studentId,
      studentName: enrollment.studentName,
      lessonId: enrollment.lessonId,
      lessonName: enrollment.lessonName,
      groupId: enrollment.groupId,
      groupName: enrollment.groupName,
      amount: enrollment.monthlyAmount,
      currency: enrollment.currency,
      status,
      method: isPaid ? "click" : "cash",
      description: `${month}-oylik to'lov (${enrollment.lessonName} - ${enrollment.groupName})`,
      paidAt: isPaid ? paidAt.toISOString() : "",
      createdAt: addDays(dueDate, -3).toISOString(),
      dueAmount: enrollment.monthlyAmount,
      paidAmount: isPaid ? enrollment.monthlyAmount : 0,
      month,
      totalMonths: enrollment.totalMonths,
      dueDate: dueDate.toISOString(),
    } satisfies Payment;
  });
};

export const MOCK_PAYMENTS: Payment[] = (() => {
  const today = new Date();
  return ENROLLMENTS.flatMap((enrollment) => buildMonthlyPayments(enrollment, today));
})();
