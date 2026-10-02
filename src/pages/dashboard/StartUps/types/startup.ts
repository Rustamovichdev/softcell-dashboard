export type StartupStatus =
  | "draft"
  | "preparing"
  | "submitted"
  | "revision"
  | "approved";

export interface Startup {
  id: string;

  studentName: string;
  studentPhone: string;
  group: string;

  startupName: string;

  topic: string;

  goal: string;

  description: string;

  // Faqat loyiha linki.
  // GitHub link ishlatilmaydi.
  projectLink: string;

  submissionDate: string;

  status: StartupStatus;

  mentorName?: string;

  mentorComment?: string;

  createdAt: string;
}