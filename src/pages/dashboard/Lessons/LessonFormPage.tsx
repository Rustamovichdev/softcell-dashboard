import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import type { LessonFormValues } from "./types";
import { useLessonsStore } from "./store";

const lessonSchema = z.object({
  name: z.string().min(2, "Dars nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  code: z.string().min(3, "Kod kamida 3 ta belgidan iborat bo'lishi kerak"),
  description: z.string().min(0).default(""),
  status: z.enum(["active", "completed", "upcoming"]),
});

const fieldClassName = "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

const LessonFormPage: FC = () => {
  const navigate = useNavigate();
  const addLesson = useLessonsStore((state) => state.addLesson);
  const { register, handleSubmit, formState: { errors } } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema) as Resolver<LessonFormValues>,
    defaultValues: { name: "", code: "", description: "", status: "upcoming" },
  });

  const onSubmit = (values: LessonFormValues) => {
    addLesson(values);
    navigate("/lessons");
  };

  const onCancel = () => {
    navigate("/lessons");
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-lg font-semibold sm:text-xl">Yangi dars qo'shish</h1>
        <Button type="button" variant="outline" onClick={onCancel} className="h-11">
          Bekor qilish
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Dars nomi</span>
          <input {...register("name")} type="text" placeholder="Frontend Development" className={fieldClassName} />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Kod</span>
          <input {...register("code")} type="text" placeholder="FD-2024-01" className={fieldClassName} />
          {errors.code && <span className="text-xs text-red-500">{errors.code.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Tavsif</span>
          <textarea {...register("description")} rows={3} placeholder="Dars haqida qisqa ma'lumot" className={`${fieldClassName} resize-none`} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Holat</span>
          <select {...register("status")} className={fieldClassName}>
            <option value="upcoming">Keladi</option>
            <option value="active">Faol</option>
            <option value="completed">Yakunlandi</option>
          </select>
        </label>

        <div className="mt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} className="h-11">
            Bekor qilish
          </Button>
          <Button type="submit" className="h-11">
            Saqlash
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LessonFormPage;