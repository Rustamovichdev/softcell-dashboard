import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import Icon from "../../../../components/ui/Icon";
import type { LessonFormValues } from "../types";

const lessonSchema = z.object({
  name: z.string().min(2, "Dars nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  code: z.string().min(3, "Kod kamida 3 ta belgidan iborat bo'lishi kerak"),
  description: z.string().min(0).default(""),
  status: z.enum(["active", "completed", "upcoming"]),
});

type LessonModalProps = {
  onClose: () => void;
  onSubmit: (values: LessonFormValues) => void;
};

const fieldClassName = "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

const LessonModal: FC<LessonModalProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema) as Resolver<LessonFormValues>,
    defaultValues: { name: "", code: "", description: "", status: "upcoming" },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dars qo'shish"
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold">Yangi dars qo'shish</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
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
            <span className={labelClassName}>Tavsif (ixtiyoriy)</span>
            <textarea {...register("description")} rows={2} placeholder="Dars haqida qisqa ma'lumot" className={`${fieldClassName} resize-none`} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Holat</span>
            <select {...register("status")} className={fieldClassName}>
              <option value="upcoming">Keladi</option>
              <option value="active">Faol</option>
              <option value="completed">Yakunlandi</option>
            </select>
          </label>

          <div className="mt-1 flex gap-3">
            <button type="button" onClick={onClose} className="h-11 flex-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Bekor qilish</button>
            <button type="submit" className="h-11 flex-1 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;