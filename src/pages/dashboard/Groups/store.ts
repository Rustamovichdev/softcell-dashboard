import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_GROUPS, buildGroupLessons } from "./data";
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
        // Darslar boshlanish sanasi va darslar sonidan avtomatik yaratiladi
        const lessons = buildGroupLessons(id, values);
        set((state) => ({ groups: [{ id, ...values, lessons }, ...state.groups] }));
        return id;
      },
      updateGroup: (id, values) =>
        set((state) => ({
          groups: state.groups.map((group) => {
            if (group.id !== id) return group;
            // Darslar soni yoki boshlash sanasi o'zgarsa, ro'yxatni qayta quriamiz
            const shouldRebuild =
              group.lessonCount !== values.lessonCount ||
              group.startDate !== values.startDate ||
              group.scheduleType !== values.scheduleType;
            const lessons = shouldRebuild ? buildGroupLessons(id, values) : group.lessons;
            return { ...group, ...values, lessons };
          }),
        })),
      deleteGroup: (id) =>
        set((state) => ({ groups: state.groups.filter((group) => group.id !== id) })),
    }),
    { name: "groups-storage", version: 6 },
  ),
);