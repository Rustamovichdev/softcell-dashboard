import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  XCircle,
} from "lucide-react";

import { useState } from "react";

import type {
  Startup,
  StartupStatus,
} from "../types/startup";

import StartupStatusBadge from "./StartupStatusBadge";

interface Props {
  startup: Startup;

  onClose: () => void;

  onUpdate?: (
    status: StartupStatus,
    mentorComment?: string,
  ) => void;
}

export default function StartupDetail({
  startup,
  onClose,
  onUpdate,
}: Props) {
  const [comment, setComment] = useState(
    startup.mentorComment ?? "",
  );

  const [showRevision, setShowRevision] =
    useState(false);

  const handleApprove = () => {
    onUpdate?.(
      "approved",
      comment.trim() ||
        "Loyiha mentor tomonidan tasdiqlandi.",
    );

    onClose();
  };

  const handleRevision = () => {
    if (!comment.trim()) {
      return;
    }

    onUpdate?.("revision", comment.trim());

    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Orqaga
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Startup loyihasi
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                {startup.startupName}
              </h1>
            </div>

            <StartupStatusBadge
              status={startup.status}
            />
          </div>

          <div className="space-y-6 p-6">
            {/* O'QUVCHI */}

            <div className="rounded-xl border border-gray-200 p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                O'quvchi
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">
                    Ism
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {startup.studentName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Telefon
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {startup.studentPhone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Guruh
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {startup.group}
                  </p>
                </div>
              </div>
            </div>

            {/* MAVZU VA SANA */}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-xs text-gray-500">
                  Mavzu / g'oya
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {startup.topic}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5">
                <p className="text-xs text-gray-500">
                  Topshirish sanasi
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {new Date(
                    startup.submissionDate,
                  ).toLocaleDateString("uz-UZ")}
                </p>
              </div>
            </div>

            {/* MAQSAD */}

            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Startup maqsadi
              </h2>

              <div className="rounded-xl bg-gray-50 p-5 text-sm leading-6 text-gray-700">
                {startup.goal}
              </div>
            </div>

            {/* LOYIHA */}

            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Loyiha haqida
              </h2>

              <div className="rounded-xl bg-gray-50 p-5 text-sm leading-6 text-gray-700">
                {startup.description}
              </div>
            </div>

            {/* LOYIHA LINKI */}

            <div className="rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Loyiha havolasi
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {startup.projectLink}
                  </p>
                </div>

                <a
                  href={startup.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Loyihani ko'rish
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* MENTOR */}

            {onUpdate && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Mentor tekshiruvi
                </h2>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mentor izohi
                  </label>

                  <textarea
                    value={comment}
                    onChange={(event) =>
                      setComment(event.target.value)
                    }
                    rows={4}
                    placeholder="Loyiha haqida izoh yoki qayta ishlash sababini yozing..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                {showRevision && (
                  <p className="mt-2 text-xs text-orange-600">
                    Qayta ishlashga yuborish uchun sabab
                    yozilishi kerak.
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <CheckCircle2 size={17} />
                    Tasdiqlash
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!comment.trim()) {
                        setShowRevision(true);
                        return;
                      }

                      handleRevision();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
                  >
                    <XCircle size={17} />
                    Qayta ishlashga yuborish
                  </button>
                </div>
              </div>
            )}

            {/* MENTOR OLDINGI IZOHI */}

            {startup.mentorComment && !onUpdate && (
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-semibold text-gray-900">
                  Mentor izohi
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {startup.mentorComment}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}