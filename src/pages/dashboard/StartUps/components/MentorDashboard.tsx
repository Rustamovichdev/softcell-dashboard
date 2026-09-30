import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { Startup } from "../types/startup";
import StartupStatusBadge from "./StartupStatusBadge";

interface Props {
  startups: Startup[];
  onBack: () => void;
  onUpdate: (startup: Startup) => void;
}

export default function MentorPanel({
  startups,
  onBack,
  onUpdate,
}: Props) {
  const [selectedStartup, setSelectedStartup] =
    useState<Startup | null>(null);

  const [comment, setComment] = useState("");

  const submittedStartups = useMemo(() => {
    return startups.filter(
      (startup) => startup.status === "submitted",
    );
  }, [startups]);

  const approveStartup = () => {
    if (!selectedStartup) return;

    const updatedStartup: Startup = {
      ...selectedStartup,
      status: "approved",
      mentorName: "Mentor",
      mentorComment:
        "Startup loyihasi mentor tomonidan tasdiqlandi.",
    };

    onUpdate(updatedStartup);

    setSelectedStartup(null);
    setComment("");
  };

  const sendToRevision = () => {
    if (!selectedStartup) return;

    if (!comment.trim()) {
      alert("Qayta ishlash sababini yozing.");
      return;
    }

    const updatedStartup: Startup = {
      ...selectedStartup,
      status: "revision",
      mentorName: "Mentor",
      mentorComment: comment.trim(),
    };

    onUpdate(updatedStartup);

    setSelectedStartup(null);
    setComment("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Mentor paneli
            </h2>

            <p className="text-sm text-gray-500">
              Topshirilgan startup loyihalarini tekshirish
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
          Topshirilgan: {submittedStartups.length}
        </div>
      </div>

      {/* STARTUPLAR */}
      {submittedStartups.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <CheckCircle2
            size={40}
            className="mx-auto text-green-500"
          />

          <h3 className="mt-4 font-semibold text-gray-900">
            Tekshiriladigan startup yo'q
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Hozircha mentor uchun topshirilgan loyiha mavjud emas.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                    O'QUVCHI
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                    STARTUP
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                    MAVZU
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600">
                    TOPSHIRISH
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold text-gray-600">
                    AMAL
                  </th>
                </tr>
              </thead>

              <tbody>
                {submittedStartups.map((startup) => (
                  <tr
                    key={startup.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-5">
                      <p className="font-semibold text-gray-900">
                        {startup.studentName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {startup.group}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-gray-900">
                        {startup.startupName}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm text-gray-600">
                        {startup.topic}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="whitespace-nowrap text-sm text-gray-600">
                        {new Date(
                          startup.submissionDate,
                        ).toLocaleDateString("uz-UZ")}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedStartup(startup)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                      >
                        Tekshirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedStartup && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <p className="text-sm text-gray-500">
                  Tekshirilayotgan loyiha
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {selectedStartup.startupName}
                </h2>
              </div>

              <StartupStatusBadge
                status={selectedStartup.status}
              />
            </div>

            <div className="space-y-6 p-6">
              {/* O'QUVCHI */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  O'quvchi ma'lumotlari
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Info
                    title="Ism"
                    value={selectedStartup.studentName}
                  />

                  <Info
                    title="Telefon"
                    value={selectedStartup.studentPhone}
                  />

                  <Info
                    title="Guruh"
                    value={selectedStartup.group}
                  />
                </div>
              </div>

              {/* LOYIHA */}
              <div className="space-y-5">
                <Info
                  title="Startup mavzusi"
                  value={selectedStartup.topic}
                />

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    MAQSAD
                  </p>

                  <p className="mt-2 leading-6 text-gray-700">
                    {selectedStartup.goal}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    LOYIHA HAQIDA
                  </p>

                  <p className="mt-2 whitespace-pre-line leading-6 text-gray-700">
                    {selectedStartup.description}
                  </p>
                </div>
              </div>

              {/* LINKLAR */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  Loyiha fayllari va havolalari
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  {selectedStartup.projectLink && (
                    <a
                      href={selectedStartup.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      Project / GitHub
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {selectedStartup.demoLink && (
                    <a
                      href={selectedStartup.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      Ishlaydigan loyiha
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* QAROR */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">
                  Mentor qarori
                </h3>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Izoh
                  </label>

                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    placeholder="Agar qayta ishlash kerak bo'lsa, sababini yozing..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={sendToRevision}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-5 py-2.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100"
                  >
                    <XCircle size={18} />
                    Qayta ishlashga yuborish
                  </button>

                  <button
                    type="button"
                    onClick={approveStartup}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <CheckCircle2 size={18} />
                    Tasdiqlash
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedStartup(null);
                  setComment("");
                }}
                className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-sm font-medium text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}