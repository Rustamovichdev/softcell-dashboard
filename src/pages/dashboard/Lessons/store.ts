import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_LESSONS } from "./data";
import type { Lesson, LessonFormValues, Group } from "./types";

type LessonsState = {
  lessons: Lesson[];
  setLessons: (lessons: Lesson[]) => void;
  addLesson: (values: LessonFormValues) => void;
  addGroupToLesson: (lessonId: number, group: Group) => void;
};

export const useLessonsStore = create<LessonsState>()(
  persist(
    (set) => ({
      lessons: MOCK_LESSONS,
      setLessons: (lessons) => set({ lessons }),
      addLesson: (values) =>
        set((state) => {
          const nextId = state.lessons.length
            ? Math.max(...state.lessons.map(({ id }) => id)) + 1
            : 1;
          return { lessons: [{ id: nextId, ...values, groups: [] }, ...state.lessons] };
        }),
      addGroupToLesson: (lessonId, group) =>
        set((state) => ({
          lessons: state.lessons.map((lesson) =>
            lesson.id === lessonId
              ? { ...lesson, groups: [...lesson.groups, group] }
              : lesson,
          ),
        })),
    }),
    { name: "lessons-storage" },
  ),
);