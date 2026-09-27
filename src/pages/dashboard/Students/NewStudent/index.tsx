import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { StudentFormValues } from "../types";

const studentSchema = z.object({
  ism: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  familya: z
    .string()
    .min(2, "Familya kamida 2 ta belgidan iborat bo'lishi kerak"),
  raqam: z
    .string()
    .regex(/^998\s?\d{9}$/, "Raqam formati: 998 901234567"),
  gmail: z.email("Gmail noto'g'ri kiritilgan"),

  otaIsmi: z
    .string()
    .min(2, "Ota ismi kamida 2 ta belgidan iborat bo'lishi kerak"),

  otaFamilya: z
    .string()
    .min(2, "Ota familyasi kamida 2 ta belgidan iborat bo'lishi kerak"),

  onaIsmi: z
    .string()
    .min(2, "Ona ismi kamida 2 ta belgidan iborat bo'lishi kerak"),

  onaFamilya: z
    .string()
    .min(2, "Ona familyasi kamida 2 ta belgidan iborat bo'lishi kerak"),

  passportRaqami: z.string().optional(),
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
      otaIsmi: "",
      otaFamilya: "",
      onaIsmi: "",
      onaFamilya: "",
      passportRaqami: "",
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
        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2"
      >
        {/* CHAP TOMON */}

        <label className="block">
          <span className="text-sm font-medium text-gray-600">
            Ism
          </span>

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
            Ota ismi
          </span>

          <input
            {...register("otaIsmi")}
            type="text"
            placeholder="Olim"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.otaIsmi && (
            <p className="mt-1 text-xs text-red-500">
              {errors.otaIsmi.message}
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
            Ota familyasi
          </span>

          <input
            {...register("otaFamilya")}
            type="text"
            placeholder="Shehnazarov"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.otaFamilya && (
            <p className="mt-1 text-xs text-red-500">
              {errors.otaFamilya.message}
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
            Ona ismi
          </span>

          <input
            {...register("onaIsmi")}
            type="text"
            placeholder="Malika"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.onaIsmi && (
            <p className="mt-1 text-xs text-red-500">
              {errors.onaIsmi.message}
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

        <label className="block">
          <span className="text-sm font-medium text-gray-600">
            Ona familyasi
          </span>

          <input
            {...register("onaFamilya")}
            type="text"
            placeholder="Shehnazarova"
            className={`mt-1.5 ${fieldClass}`}
          />

          {errors.onaFamilya && (
            <p className="mt-1 text-xs text-red-500">
              {errors.onaFamilya.message}
            </p>
          )}
        </label>

        <label className="block lg:col-start-2">
          <span className="text-sm font-medium text-gray-600">
            Pasport raqami{" "}
            <span className="font-normal text-gray-400">
              (ixtiyoriy)
            </span>
          </span>

          <input
            {...register("passportRaqami")}
            type="text"
            placeholder="AA1234567"
            className={`mt-1.5 ${fieldClass}`}
          />
        </label>

        {/* TUGMALAR */}

        <div className="flex gap-3 pt-2 lg:col-span-2">
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