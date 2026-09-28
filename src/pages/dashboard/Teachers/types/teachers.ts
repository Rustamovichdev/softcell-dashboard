export type TeacherStatus = "active" | "inactive" | "pending";

export type TeacherGender = "male" | "female";

export interface Teacher {
  id: string;

  firstName: string;
  lastName: string;
  middleName: string;

  phone: string;
  email: string;

  birthDate: string;
  gender: TeacherGender;

  address: string;

  subject: string;
  specialization: string;

  education: string;
  university: string;

  experience: number;
  previousWorkplace: string;

  expectedSalary: string;

  teachingType: "offline" | "online" | "hybrid";

  workSchedule: string;

  languages: string[];

  certificates: string;

  about: string;

  status: TeacherStatus;

  createdAt: string;
}