import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Icon from "../../../../components/ui/Icon";
import type { StudentFormValues } from "../types";

const studentSchema = z.object({
  ism: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  familya: z.string().min(2, "Familya kamida 2 ta belgidan iborat bo'lishi kerak"),
  raqam: z.string().regex(/^998\s?\d{9}$/, "Raqam formati: 998 901234567"),
  gmail: z.email("Gmail noto'g'ri kiritilgan"),
});

type StudentModalProps = {
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => void;
};

const fieldClassName =
  "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";

const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

/** Modal ochilganda mount bo'ladi, yopilganda unmount - forma o'zi tozalanadi */
const StudentModal: FC<StudentModalProps> = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: { ism: "", familya: "", raqam: "998 ", gmail: "" },
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
        aria-label="Student qo'shish"
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

        <h2 className="text-lg font-semibold">Student qo'shish</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Ism</span>
            <input {...register("ism")} type="text" placeholder="Abdulox" className={fieldClassName} />
            {errors.ism && <span className="text-xs text-red-500">{errors.ism.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Familya</span>
            <input {...register("familya")} type="text" placeholder="Shehnazarov" className={fieldClassName} />
            {errors.familya && <span className="text-xs text-red-500">{errors.familya.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Raqam</span>
            <input {...register("raqam")} type="tel" placeholder="998 264373563" className={fieldClassName} />
            {errors.raqam && <span className="text-xs text-red-500">{errors.raqam.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Gmail</span>
            <input {...register("gmail")} type="email" placeholder="abdulo@gmail.com" className={fieldClassName} />
            {errors.gmail && <span className="text-xs text-red-500">{errors.gmail.message}</span>}
          </label>

          <div className="mt-1 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="h-11 flex-1 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;