import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

import type { Startup, StartupStatus } from "../types/startup";

interface Props {
  startup?: Startup | null;
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
  demoLink: "",

  submissionDate: "",

  status: "idea",

  mentorName: "",
  mentorComment: "",

  createdAt: "",
};

export default function StartupForm({
  startup,
  onCancel,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Startup>(
    startup ?? {
      ...emptyStartup,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    },
  );

  const updateField = <K extends keyof Startup>(
    field: K,
    value: Startup[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Startup qo'shish
          </h2>

          <p className="text-sm text-gray-500">
            O'quvchining startup loyihasi haqida ma'lumot kiriting
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="O'quvchi"
            value={form.studentName}
            onChange={(value) => updateField("studentName", value)}
            required
          />

          <Input
            label="Telefon raqam"
            value={form.studentPhone}
            onChange={(value) => updateField("studentPhone", value)}
            required
          />

          <Input
            label="Guruh"
            value={form.group}
            onChange={(value) => updateField("group", value)}
          />

          <Input
            label="Startup nomi"
            value={form.startupName}
            onChange={(value) => updateField("startupName", value)}
            required
          />

          <Input
            label="Mavzu"
            value={form.topic}
            onChange={(value) => updateField("topic", value)}
            required
          />

          <Input
            label="Topshirish sanasi"
            type="date"
            value={form.submissionDate}
            onChange={(value) =>
              updateField("submissionDate", value)
            }
            required
          />
        </div>

        <Textarea
          label="Startup maqsadi"
          value={form.goal}
          onChange={(value) => updateField("goal", value)}
          required
        />

        <Textarea
          label="Loyiha / Project haqida"
          value={form.description}
          onChange={(value) =>
            updateField("description", value)
          }
          required
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Project / GitHub link"
            placeholder="https://github.com/..."
            value={form.projectLink}
            onChange={(value) =>
              updateField("projectLink", value)
            }
          />

          <Input
            label="Ishlaydigan loyiha linki"
            placeholder="https://..."
            value={form.demoLink}
            onChange={(value) =>
              updateField("demoLink", value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Holati
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as StartupStatus,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500"
          >
            <option value="idea">G'oya</option>
            <option value="preparing">Tayyorlanmoqda</option>
            <option value="submitted">Topshirilgan</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500"
      />
    </div>
  );
}

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function Textarea({
  label,
  value,
  onChange,
  required,
}: TextareaProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        rows={4}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
      />
    </div>
  );
}