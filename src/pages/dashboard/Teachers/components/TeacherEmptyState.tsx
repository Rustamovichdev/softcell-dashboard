import { Users } from "lucide-react";

export default function TeacherEmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Users className="h-7 w-7 text-slate-500" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        Hozircha o'qituvchilar yo'q
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-500">
        Yangi o'qituvchi qo'shish uchun yuqoridagi
        "O'qituvchi qo'shish" tugmasidan foydalaning.
      </p>
    </div>
  );
}