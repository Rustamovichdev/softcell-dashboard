// types.ts

export interface Meet {
  id: string;
  title: string;
  group: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
  status: 'Live' | 'Upcoming';
  description?: string;
}

export interface MeetFormData {
  title: string;
  group: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
  description?: string;
}

export type ViewMode = 'list' | 'calendar';