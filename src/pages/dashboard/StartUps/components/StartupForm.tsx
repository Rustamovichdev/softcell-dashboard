import {
  ArrowLeft,
  Save,
} from "lucide-react";

import { useState } from "react";

import type { Startup } from "../types/startup";

interface Props {
  onCancel: () => void;
  onSubmit: (startup: Startup) => void;
}

const emptyStartup: Startup = {
  id: "",

  studentName: "",
  studentPhone: "",
  group: "",

  startupName: "",

  topic: "",

  goal: "",

  description: "",

  projectLink: "",

  submissionDate: "",

  status: "draft",

  mentorName: "",

  mentorComment: "",

  createdAt: "",
};

export default function StartupForm({
  onCancel,
  onSubmit,
}: Props) {
  const [formData, setFormData] =
    useState<Startup>(emptyStartup);

  const [error, setError] = useState("");

  const updateField = <K extends keyof Startup>(
    field: K,
    value: Startup[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!formData.studentName.trim()) {
      setError("O'quvchi ismini kiriting.");
      return;
    }

    if (!formData.startupName.trim()) {
      setError("Startup nomini kiriting.");
      return;
    }

    if (!formData.topic.trim()) {
      setError("Startup mavzusini kiriting.");
      return;
    }

    if (!formData.goal.trim()) {
      setError("Startup maqsadini kiriting.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Loyiha haqida ma'lumot kiriting.");
      return;
    }

    if (!formData.projectLink.trim()) {
      setError("Loyiha linkini kiriting.");
      return;
    }

    if (!formData.submissionDate) {
      setError("Topshirish sanasini kiriting.");
      return;
    }

    try {
      new URL(formData.projectLink);
    } catch {
      setError("Loyiha linkini to'g'ri kiriting.");
      return;
    }

    onSubmit({
      ...formData,

      id: crypto.randomUUID(),

      status: "submitted",

      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={onCancel}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Orqaga
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              StartUp qo'shish
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              O'quvchining startup loyihasi haqida barcha
              kerakli ma'lumotlarni kiriting.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* O'QUVCHI */}

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                O'quvchi ma'lumotlari
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    O'quvchi ismi
                  </label>

                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(event) =>
                      updateField(
                        "studentName",
                        event.target.value,
                      )
                    }
                    placeholder="Masalan: Azizbek Karimov"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Telefon raqam
                  </label>

                  <input
                    type="tel"
                    value={formData.studentPhone}
                    onChange={(event) =>
                      updateField(
                        "studentPhone",
                        event.target.value,
                      )
                    }
                    placeholder="+998 90 123 45 67"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Guruh
                  </label>

                  <input
                    type="text"
                    value={formData.group}
                    onChange={(event) =>
                      updateField(
                        "group",
                        event.target.value,
                      )
                    }
                    placeholder="Frontend-12"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* STARTUP */}

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                StartUp ma'lumotlari
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    StartUp nomi
                  </label>

                  <input
                    type="text"
                    value={formData.startupName}
                    onChange={(event) =>
                      updateField(
                        "startupName",
                        event.target.value,
                      )
                    }
                    placeholder="Masalan: EduApp"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mavzu / g'oya
                  </label>

                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(event) =>
                      updateField(
                        "topic",
                        event.target.value,
                      )
                    }
                    placeholder="Masalan: Ta'lim platformasi"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Maqsad
                  </label>

                  <textarea
                    rows={3}
                    value={formData.goal}
                    onChange={(event) =>
                      updateField(
                        "goal",
                        event.target.value,
                      )
                    }
                    placeholder="Loyihaning asosiy maqsadini yozing..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Loyiha haqida
                  </label>

                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value,
                      )
                    }
                    placeholder="Loyiha qanday ishlashi, qanday muammoni hal qilishi va boshqa ma'lumotlarni yozing..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>

                {/* FAQAT LOYIHA LINKI */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Loyiha linki
                  </label>

                  <input
                    type="url"
                    value={formData.projectLink}
                    onChange={(event) =>
                      updateField(
                        "projectLink",
                        event.target.value,
                      )
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    O'quvchi tayyorlagan loyihaning havolasini
                    kiriting.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Topshirish sanasi
                  </label>

                  <input
                    type="date"
                    value={formData.submissionDate}
                    onChange={(event) =>
                      updateField(
                        "submissionDate",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Bekor qilish
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Save size={17} />
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}