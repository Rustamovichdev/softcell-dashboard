import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

import type { Teacher } from "../types/teachers";
import TeacherStatusBadge from "./TeacherStatusBadge";

interface Props {
  teacher: Teacher;
  onBack: () => void;
  onEdit: () => void;
}

export default function TeacherDetail({
  teacher,
  onBack,
  onEdit,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              O'qituvchi ma'lumotlari
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              O'qituvchining to'liq ma'lumotlari
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Pencil className="h-4 w-4" />
          Tahrirlash
        </button>
      </div>

      {/* Profile */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-900">
              {teacher.firstName.charAt(0)}
              {teacher.lastName.charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">
                {teacher.lastName} {teacher.firstName}{" "}
                {teacher.middleName}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {teacher.subject}
              </p>
            </div>

            <TeacherStatusBadge status={teacher.status} />
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem
            icon={<Phone className="h-4 w-4" />}
            label="Telefon"
            value={teacher.phone}
          />

          <InfoItem
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={teacher.email || "Ko'rsatilmagan"}
          />

          <InfoItem
            icon={<CalendarDays className="h-4 w-4" />}
            label="Tug'ilgan sana"
            value={teacher.birthDate || "Ko'rsatilmagan"}
          />

          <InfoItem
            icon={<MapPin className="h-4 w-4" />}
            label="Manzil"
            value={teacher.address || "Ko'rsatilmagan"}
          />
        </div>
      </div>

      {/* Professional */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-slate-700" />

            <h2 className="font-semibold text-slate-900">
              Kasbiy ma'lumotlar
            </h2>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Fan"
            value={teacher.subject}
          />

          <DetailItem
            label="Mutaxassisligi"
            value={teacher.specialization}
          />

          <DetailItem
            label="Ma'lumoti"
            value={teacher.education}
          />

          <DetailItem
            label="Universitet"
            value={teacher.university}
          />

          <DetailItem
            label="Ish tajribasi"
            value={`${teacher.experience} yil`}
          />

          <DetailItem
            label="Oldingi ish joyi"
            value={teacher.previousWorkplace}
          />

          <DetailItem
            label="Kutilayotgan oylik"
            value={teacher.expectedSalary}
          />

          <DetailItem
            label="Dars turi"
            value={
              teacher.teachingType === "offline"
                ? "Offline"
                : teacher.teachingType === "online"
                  ? "Online"
                  : "Gibrid"
            }
          />

          <DetailItem
            label="Ish grafigi"
            value={teacher.workSchedule}
          />
        </div>
      </div>

      {/* Education */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-slate-700" />

            <h2 className="font-semibold text-slate-900">
              Sertifikatlar
            </h2>
          </div>

          <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
            {teacher.certificates || "Sertifikatlar kiritilmagan"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <UserRound className="h-5 w-5 text-slate-700" />

            <h2 className="font-semibold text-slate-900">
              Biladigan tillari
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {teacher.languages.length > 0 ? (
              teacher.languages.map((language) => (
                <span
                  key={language}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                >
                  {language}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Til ma'lumotlari kiritilmagan
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-900">
          O'qituvchi haqida
        </h2>

        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
          {teacher.about || "Qo'shimcha ma'lumot kiritilmagan"}
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-1 truncate text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value || "Kiritilmagan"}
      </p>
    </div>
  );
}