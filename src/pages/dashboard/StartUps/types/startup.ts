export type StartupStatus =
  | "idea"
  | "preparing"
  | "submitted"
  | "approved"
  | "revision";

export interface Startup {
  id: string;

  studentName: string;
  studentPhone: string;
  group: string;

  startupName: string;
  topic: string;

  goal: string;
  description: string;

  projectLink: string;
  demoLink: string;

  submissionDate: string;

  status: StartupStatus;

  mentorName?: string;
  mentorComment?: string;

  createdAt: string;
}