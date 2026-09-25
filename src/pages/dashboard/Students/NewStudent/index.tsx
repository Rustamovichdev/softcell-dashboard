import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { StudentFormValues } from "../types";

const studentSchema = z.object({
  ism: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  familya: z.string().min(2, "Familya kamida 2 ta belgidan iborat bo'lishi kerak"),
  raqam: z.string().regex(/^998\s?\d{9}$/, "Raqam formati: 998 901234567"),
  gmail: z.email("Gmail noto'g'ri kiritilgan"),
});

type NewStudentProps = {
  onBack: () => void;
  onSave: (student: StudentFormValues) => void;
};

const fieldClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";

const NewStudent = ({ onBack, onSave }: NewStudentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      ism: "",
      familya: "",
      raqam: "998 ",
      gmail: "",
    },
  });

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold sm:text-xl">
            Student qo'shish
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Yangi student ma'lumotlarini kiriting
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Orqaga
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSave)}
        className="mt-6 max-w-2xl space-y-4"
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-600">Ism</span>

          <input
            {...register("ism")}
            type="text"
            placeholder="Abdulox"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.ism && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ism.message}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-600">
            Familya
          </span>

          <input
            {...register("familya")}
            type="text"
            placeholder="Shehnazarov"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.familya && (
            <p className="mt-1 text-xs text-red-500">
              {errors.familya.message}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-600">
            Raqam
          </span>

          <input
            {...register("raqam")}
            type="tel"
            placeholder="998 901234567"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.raqam && (
            <p className="mt-1 text-xs text-red-500">
              {errors.raqam.message}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-600">
            Gmail
          </span>

          <input
            {...register("gmail")}
            type="email"
            placeholder="abdulo@gmail.com"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.gmail && (
            <p className="mt-1 text-xs text-red-500">
              {errors.gmail.message}
            </p>
          )}
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="h-11 flex-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Bekor qilish
          </button>

          <button
            type="submit"
            className="h-11 flex-1 rounded-lg bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
          >
            Saqlash
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewStudent;