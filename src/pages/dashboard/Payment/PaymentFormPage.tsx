import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../../components/ui/Button";
import type { PaymentFormValues } from "./types";
import { STUDENTS } from "./data";
import { usePaymentsStore } from "./store";

const paymentSchema = z.object({
  studentId: z.coerce.number().min(1, "Talaba tanlanishi kerak"),
  studentName: z.string().min(2, "Talaba nomi kerak"),
  lessonId: z.coerce.number().min(1, "Kurs tanlanishi kerak"),
  lessonName: z.string().min(2, "Kurs nomi kerak"),
  groupId: z.coerce.number().min(1, "Guruh tanlanishi kerak"),
  groupName: z.string().min(2, "Guruh nomi kerak"),
  currency: z.enum(["UZS", "USD"]),
  status: z.enum(["pending", "completed", "failed", "refunded"]),
  method: z.enum(["cash", "card", "transfer", "click", "payme"]),
  description: z.string().min(5, "Tavsif kamida 5 ta belgidan iborat bo'lishi kerak"),
  dueAmount: z.coerce.number().min(0),
  paidAmount: z.coerce.number().min(0),
  month: z.coerce.number().min(1, "Oy 1 dan katta bo'lishi kerak").max(12, "Oy 12 dan kichik bo'lishi kerak"),
  totalMonths: z.coerce.number().min(1, "Kurs davomiyligi 1 dan katta bo'lishi kerak").max(24, "Kurs davomiyligi 24 dan kichik bo'lishi kerak"),
});

const fieldClassName = "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";
const labelClassName = "text-xs font-medium text-gray-600 sm:text-sm";

/** Forma id'si — yuqoridagi "Saqlash" tugmasi shu formani yuboradi */
const FORM_ID = "payment-form";

const lessons = [
  { id: 1, name: "Frontend Development" },
  { id: 2, name: "Backend Development" },
  { id: 3, name: "Mobile Development" },
  { id: 4, name: "Data Science & ML" },
  { id: 5, name: "DevOps Engineering" },
  { id: 6, name: "UX/UI Design" },
  { id: 7, name: "QA & Test Automation" },
];

const groups = [
  { id: 101, name: "Alpha", lessonId: 1 },
  { id: 102, name: "Beta", lessonId: 1 },
  { id: 201, name: "Alpha", lessonId: 2 },
  { id: 202, name: "Beta", lessonId: 2 },
  { id: 301, name: "Alpha", lessonId: 3 },
  { id: 302, name: "Beta", lessonId: 3 },
  { id: 401, name: "Alpha", lessonId: 4 },
  { id: 402, name: "Beta", lessonId: 4 },
  { id: 501, name: "Alpha", lessonId: 5 },
  { id: 502, name: "Beta", lessonId: 5 },
  { id: 601, name: "Alpha", lessonId: 6 },
  { id: 602, name: "Beta", lessonId: 6 },
  { id: 701, name: "Alpha", lessonId: 7 },
  { id: 702, name: "Beta", lessonId: 7 },
];

const PaymentFormPage: FC = () => {
  const navigate = useNavigate();
  const addPayment = usePaymentsStore((state) => state.addPayment);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema) as Resolver<PaymentFormValues>,
    defaultValues: {
      studentId: STUDENTS[0].id,
      studentName: STUDENTS[0].name,
      lessonId: 1,
      lessonName: "Frontend Development",
      groupId: 101,
      groupName: "Alpha",
      currency: "UZS",
      status: "pending",
      method: "cash",
      description: "",
      dueAmount: 0,
      paidAmount: 0,
      month: 1,
      totalMonths: 6,
    },
  });

  const watchedLessonId = watch("lessonId");
  const filteredGroups = groups.filter((g) => g.lessonId === watchedLessonId);

  const onStudentChange = (value: string) => {
    const student = STUDENTS.find((s) => s.id === Number(value));
    if (student) setValue("studentName", student.name);
  };

  const onLessonChange = (value: string) => {
    const lesson = lessons.find((l) => l.id === Number(value));
    if (lesson) {
      setValue("lessonName", lesson.name);
      setValue("groupId", filteredGroups[0]?.id || 0);
      setValue("groupName", filteredGroups[0]?.name || "");
    }
  };

  const onGroupChange = (value: string) => {
    const group = groups.find((g) => g.id === Number(value));
    if (group) setValue("groupName", group.name);
  };

  const onSubmit = (values: PaymentFormValues) => {
    addPayment(values);
    navigate("/payment");
  };

  const onCancel = () => {
    navigate("/payment");
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-lg font-semibold sm:text-xl">Yangi to'lov qo'shish</h1>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outlineDanger" onClick={onCancel} className="h-11">
            Bekor qilish
          </Button>
          <Button type="submit" variant="accent" form={FORM_ID} className="h-11">
            Saqlash
          </Button>
        </div>
      </div>

      <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Talaba</span>
            <select {...register("studentId", { onChange: onStudentChange })} className={fieldClassName}>
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.studentId && <span className="text-xs text-red-500">{errors.studentId.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Kurs</span>
            <select {...register("lessonId", { onChange: onLessonChange })} className={fieldClassName}>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            {errors.lessonId && <span className="text-xs text-red-500">{errors.lessonId.message}</span>}
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Guruh</span>
          <select {...register("groupId", { onChange: onGroupChange })} className={fieldClassName}>
            {filteredGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.groupId && <span className="text-xs text-red-500">{errors.groupId.message}</span>}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>To'lanishi kerak summa</span>
            <input
              {...register("dueAmount")}
              type="number"
              min="0"
              placeholder="2500000"
              className={fieldClassName}
            />
            {errors.dueAmount && <span className="text-xs text-red-500">{errors.dueAmount.message}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>To'langan summa</span>
            <input
              {...register("paidAmount")}
              type="number"
              min="0"
              placeholder="0"
              className={fieldClassName}
            />
            {errors.paidAmount && <span className="text-xs text-red-500">{errors.paidAmount.message}</span>}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Valyuta</span>
            <select {...register("currency")} className={fieldClassName}>
              <option value="UZS">UZS</option>
              <option value="USD">USD</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Status</span>
            <select {...register("status")} className={fieldClassName}>
              <option value="pending">Kutilmoqda</option>
              <option value="completed">Bajarildi</option>
              <option value="failed">Muvaffaqiyatsiz</option>
              <option value="refunded">Qaytarildi</option>
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>To'lov usuli</span>
            <select {...register("method")} className={fieldClassName}>
              <option value="cash">Naqd</option>
              <option value="card">Karta</option>
              <option value="transfer">O'tkazma</option>
              <option value="click">Click</option>
              <option value="payme">Payme</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Oy (1-12)</span>
            <input
              {...register("month")}
              type="number"
              min="1"
              max="12"
              placeholder="1"
              className={fieldClassName}
            />
            {errors.month && <span className="text-xs text-red-500">{errors.month.message}</span>}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Umumiy kurs davomiyligi (oy)</span>
            <input
              {...register("totalMonths")}
              type="number"
              min="1"
              max="24"
              placeholder="6"
              className={fieldClassName}
            />
            {errors.totalMonths && <span className="text-xs text-red-500">{errors.totalMonths.message}</span>}
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClassName}>Tavsif</span>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Masalan: 1-oylik to'lov (Frontend Development - Alpha)"
            className={`${fieldClassName} resize-none`}
          />
          {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
        </label>
      </form>
    </section>
  );
};

export default PaymentFormPage;