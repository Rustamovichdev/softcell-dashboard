import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Icon from "../../../../components/ui/Icon";
import type { GroupFormValues } from "../types";

const groupSchema = z.object({
  name: z.string().min(2, "Guruh nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  code: z.string().min(2, "Guruh kodi kamida 2 ta belgidan iborat bo'lishi kerak"),
  studentCount: z.number().int("Butun son bo'lishi kerak").min(0, "Noldan katta yoki teng bo'lishi kerak"),
  schedule: z.string().min(1, "Dars jadvali kerak"),
});

type GroupModalProps = {
  lessonName: string;
  onClose: () => void;
  onSubmit: (values: GroupFormValues) => void;
};

const fieldClassName = "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

const GroupModal: FC<GroupModalProps> = ({ lessonName, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: "", code: "", studentCount: 0, schedule: "" },
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
        aria-label="Guruh qo'shish"
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

        <h2 className="text-lg font-semibold">Yangi guruh qo'shish</h2>
        <p className="mt-0.5 text-xs text-gray-500">Dars: <span className="font-medium text-gray-700">{lessonName}</span></p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Guruh nomi</span>
            <input {...register("name")} type="text" placeholder="Alpha" className={fieldClassName} />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Kod</span>
            <input {...register("code")} type="text" placeholder="A" className={fieldClassName} />
            {errors.code && <span className="text-xs text-red-500">{errors.code.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>O'quvchilar soni</span>
            <input {...register("studentCount", { valueAsNumber: true })} type="number" min={0} placeholder="25" className={fieldClassName} />
            {errors.studentCount && <span className="text-xs text-red-500">{errors.studentCount.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Dars jadvali</span>
            <input {...register("schedule")} type="text" placeholder="Dushanba 10:00-12:00" className={fieldClassName} />
            {errors.schedule && <span className="text-xs text-red-500">{errors.schedule.message}</span>}
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

export default GroupModal;