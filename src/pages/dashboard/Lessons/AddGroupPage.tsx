import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import type { Lesson, Group, GroupFormValues } from "./types";
import { useLessonsStore } from "./store";

const groupSchema = z.object({
  name: z.string().min(2, "Guruh nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  code: z.string().min(3, "Kod kamida 3 ta belgidan iborat bo'lishi kerak"),
  studentCount: z.coerce.number().min(0, "O'quvchilar soni 0 dan katta bo'lishi kerak"),
  schedule: z.string().min(2, "Dars jadvali kiritilishi kerak"),
});

const fieldClassName = "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

const AddGroupPage: FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lessons = useLessonsStore((state) => state.lessons);
  const addGroupToLesson = useLessonsStore((state) => state.addGroupToLesson);
  const [lesson, setLesson] = useState<Lesson | undefined>();

  useEffect(() => {
    if (lessonId) {
      const found = lessons.find((l) => l.id === Number(lessonId));
      setLesson(found);
    }
  }, [lessonId, lessons]);

  const { register, handleSubmit, formState: { errors } } = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema) as Resolver<GroupFormValues>,
    defaultValues: { name: "", code: "", studentCount: 0, schedule: "" },
  });

  const onSubmit = (values: GroupFormValues) => {
    if (!lessonId) return;
    const newGroup: Group = { id: Date.now(), ...values };
    addGroupToLesson(Number(lessonId), newGroup);
    navigate(`/lessons/${lessonId}`);
  };

  const onCancel = () => {
    if (lessonId) {
      navigate(`/lessons/${lessonId}`);
    } else {
      navigate("/lessons");
    }
  };

  if (!lesson) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Dars topilmadi</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={onCancel} className="h-11">
            <Icon name="chevron-down" className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-lg font-semibold sm:text-xl">Guruh qo'shish</h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">{lesson.name}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-6">
          <p className="text-xs text-gray-500">Mavjud guruhlar</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(lesson.groups ?? []).length === 0 ? (
              <span className="text-sm text-gray-400">Guruhlar yo'q</span>
            ) : (
              (lesson.groups ?? []).map((group) => (
                <span key={group.id} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm text-gray-700 border border-gray-200">
                  {group.name}
                </span>
              ))
            )}
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Guruh nomi</span>
          <input {...register("name")} type="text" placeholder="Frontend Development - 1-guruh" className={fieldClassName} />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Kod</span>
          <input {...register("code")} type="text" placeholder="FD-2024-01-G1" className={fieldClassName} />
          {errors.code && <span className="text-xs text-red-500">{errors.code.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>O'quvchilar soni</span>
          <input {...register("studentCount")} type="number" min="0" placeholder="20" className={fieldClassName} />
          {errors.studentCount && <span className="text-xs text-red-500">{errors.studentCount.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Dars jadvali</span>
          <input {...register("schedule")} type="text" placeholder="Dushanba, Juma 14:00-16:00" className={fieldClassName} />
          {errors.schedule && <span className="text-xs text-red-500">{errors.schedule.message}</span>}
        </label>

        <div className="mt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} className="h-11">
            Bekor qilish
          </Button>
          <Button type="submit" className="h-11">
            Guruhga qo'shish
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddGroupPage;