import { ArrowLeft, Save, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import type {
  Teacher,
  TeacherGender,
  TeacherStatus,
} from "../types/teachers";

interface Props {
  teacher?: Teacher | null;
  onCancel: () => void;
  onSubmit: (teacher: Teacher) => void;
}

const emptyTeacher: Teacher = {
  id: "",
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
  email: "",
  birthDate: "",
  gender: "male",
  address: "",
  subject: "",
  specialization: "",
  education: "",
  university: "",
  experience: 0,
  previousWorkplace: "",
  expectedSalary: "",
  teachingType: "offline",
  workSchedule: "",
  languages: [],
  certificates: "",
  about: "",
  status: "pending",
  createdAt: "",
};

export default function TeacherForm({
  teacher,
  onCancel,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Teacher>(teacher ?? emptyTeacher);

  const [languagesText, setLanguagesText] = useState(
    teacher?.languages.join(", ") ?? "",
  );

  useEffect(() => {
    setForm(teacher ?? emptyTeacher);
    setLanguagesText(teacher?.languages.join(", ") ?? "");
  }, [teacher]);

  const updateField = <K extends keyof Teacher>(
    field: K,
    value: Teacher[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const savedTeacher: Teacher = {
      ...form,
      id: form.id || crypto.randomUUID(),
      languages: languagesText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      createdAt: form.createdAt || new Date().toISOString(),
    };

    onSubmit(savedTeacher);
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {teacher
                ? "O'qituvchini tahrirlash"
                : "Yangi o'qituvchi qo'shish"}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              O'qituvchi haqidagi ma'lumotlarni to'ldiring
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Save className="h-4 w-4" />
          Saqlash
        </button>
      </div>

      {/* Personal information */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <UserRound className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Shaxsiy ma'lumotlar
            </h2>

            <p className="text-xs text-slate-500">
              O'qituvchining asosiy shaxsiy ma'lumotlari
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelClass}>
              Ism <span className="text-red-500">*</span>
            </label>

            <input
              required
              value={form.firstName}
              onChange={(e) =>
                updateField("firstName", e.target.value)
              }
              placeholder="Masalan: Azizbek"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Familiya <span className="text-red-500">*</span>
            </label>

            <input
              required
              value={form.lastName}
              onChange={(e) =>
                updateField("lastName", e.target.value)
              }
              placeholder="Masalan: Karimov"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Otasining ismi</label>

            <input
              value={form.middleName}
              onChange={(e) =>
                updateField("middleName", e.target.value)
              }
              placeholder="Masalan: Anvarovich"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Telefon raqami <span className="text-red-500">*</span>
            </label>

            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              placeholder="+998 90 123 45 67"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              placeholder="teacher@gmail.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tug'ilgan sana</label>

            <input
              type="date"
              value={form.birthDate}
              onChange={(e) =>
                updateField("birthDate", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Jinsi</label>

            <select
              value={form.gender}
              onChange={(e) =>
                updateField(
                  "gender",
                  e.target.value as TeacherGender,
                )
              }
              className={inputClass}
            >
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Manzil</label>

            <input
              value={form.address}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
              placeholder="Toshkent shahri, Chilonzor tumani..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Professional information */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            Kasbiy ma'lumotlar
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            O'qituvchining ta'limi va ish tajribasi
          </p>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelClass}>
              Fan <span className="text-red-500">*</span>
            </label>

            <input
              required
              value={form.subject}
              onChange={(e) =>
                updateField("subject", e.target.value)
              }
              placeholder="Matematika"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Mutaxassisligi
            </label>

            <input
              value={form.specialization}
              onChange={(e) =>
                updateField("specialization", e.target.value)
              }
              placeholder="Matematika va informatika"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Ma'lumoti</label>

            <select
              value={form.education}
              onChange={(e) =>
                updateField("education", e.target.value)
              }
              className={inputClass}
            >
              <option value="">Tanlang</option>
              <option value="O'rta">O'rta</option>
              <option value="O'rta maxsus">O'rta maxsus</option>
              <option value="Oliy">Oliy</option>
              <option value="Magistr">Magistr</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              O'qigan universiteti
            </label>

            <input
              value={form.university}
              onChange={(e) =>
                updateField("university", e.target.value)
              }
              placeholder="Toshkent davlat universiteti"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Ish tajribasi
            </label>

            <div className="relative">
              <input
                type="number"
                min={0}
                value={form.experience}
                onChange={(e) =>
                  updateField(
                    "experience",
                    Number(e.target.value),
                  )
                }
                className={`${inputClass} pr-16`}
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                yil
              </span>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Oldingi ish joyi
            </label>

            <input
              value={form.previousWorkplace}
              onChange={(e) =>
                updateField(
                  "previousWorkplace",
                  e.target.value,
                )
              }
              placeholder="O'quv markazi nomi"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Kutilayotgan oylik
            </label>

            <input
              value={form.expectedSalary}
              onChange={(e) =>
                updateField("expectedSalary", e.target.value)
              }
              placeholder="8 000 000 so'm"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Dars berish turi
            </label>

            <select
              value={form.teachingType}
              onChange={(e) =>
                updateField(
                  "teachingType",
                  e.target.value as Teacher["teachingType"],
                )
              }
              className={inputClass}
            >
              <option value="offline">Offline</option>
              <option value="online">Online</option>
              <option value="hybrid">Gibrid</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Ish grafigi
            </label>

            <input
              value={form.workSchedule}
              onChange={(e) =>
                updateField("workSchedule", e.target.value)
              }
              placeholder="09:00 - 18:00"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>
              Biladigan tillari
            </label>

            <input
              value={languagesText}
              onChange={(e) =>
                setLanguagesText(e.target.value)
              }
              placeholder="O'zbek, Rus, Ingliz"
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Bir nechta til bo'lsa vergul bilan ajrating.
            </p>
          </div>
        </div>
      </section>

      {/* Additional information */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            Qo'shimcha ma'lumotlar
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Sertifikatlar va o'qituvchi haqida qo'shimcha ma'lumot
          </p>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Sertifikatlar
            </label>

            <textarea
              value={form.certificates}
              onChange={(e) =>
                updateField("certificates", e.target.value)
              }
              placeholder="IELTS 7.5, CEFR C1, TESOL..."
              rows={5}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className={labelClass}>
              O'qituvchi haqida
            </label>

            <textarea
              value={form.about}
              onChange={(e) =>
                updateField("about", e.target.value)
              }
              placeholder="O'qituvchi haqida qisqacha ma'lumot..."
              rows={5}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className={labelClass}>
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as TeacherStatus,
                )
              }
              className={inputClass}
            >
              <option value="pending">Kutilmoqda</option>
              <option value="active">Faol</option>
              <option value="inactive">Nofaol</option>
            </select>
          </div>
        </div>
      </section>

      {/* Bottom actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Bekor qilish
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Save className="h-4 w-4" />
          {teacher ? "O'zgarishlarni saqlash" : "O'qituvchini saqlash"}
        </button>
      </div>
    </form>
  );
}