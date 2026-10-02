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

  title: string;
  topic: string;
  goal: string;

  deadline: string;

  status: StartupStatus;

  adminComment: string;
}