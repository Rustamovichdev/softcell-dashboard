import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_GROUPS } from "./data";
import type { Group, GroupFormValues } from "./types";

type GroupsState = {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  addGroup: (values: GroupFormValues) => number;
  updateGroup: (id: number, values: GroupFormValues) => void;
  deleteGroup: (id: number) => void;
};

export const useGroupsStore = create<GroupsState>()(
  persist(
    (set) => ({
      groups: MOCK_GROUPS,
      setGroups: (groups) => set({ groups }),
      addGroup: (values) => {
        const id = Date.now();
        set((state) => ({ groups: [{ id, ...values, lessons: [] }, ...state.groups] }));
        return id;
      },
      updateGroup: (id, values) =>
        set((state) => ({
          groups: state.groups.map((group) => {
            if (group.id !== id) return group;
            // Darslar soni o'zgarsa, darslar ro'yxatini qayta quriamiz
            const lessons =
              group.lessonCount === values.lessonCount
                ? group.lessons
                : buildLessonsForGroup(id, values);
            return { ...group, ...values, lessons };
          }),
        })),
      deleteGroup: (id) =>
        set((state) => ({ groups: state.groups.filter((group) => group.id !== id) })),
    }),
    { name: "groups-storage", version: 5 },
  ),
);

/** Guruh darslarini sana bo'yicha teng taqsimlab yaratadi */
const buildLessonsForGroup = (groupId: number, values: GroupFormValues) => {
  const start = new Date(values.startDate);
  const end = new Date(values.endDate);
  const count = values.lessonCount;
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || count < 1) return [];

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
      status: date < now ? ("done" as const) : ("planned" as const),
    };
  });
};
