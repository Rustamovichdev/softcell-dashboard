import { ArrowLeft, ExternalLink } from "lucide-react";

import type { Startup } from "../types/startup";
import StartupStatusBadge from "./StartupStatusBadge";

interface Props {
  startup: Startup;
  onClose: () => void;
}

export default function StartupDetail({
  startup,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
      <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-sm text-gray-500">
              Startup loyihasi
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {startup.startupName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Yopish
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-xl border border-gray-200 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                O'quvchi
              </h3>

              <StartupStatusBadge status={startup.status} />
            </div>

            <p className="font-medium text-gray-900">
              {startup.studentName}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {startup.group}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {startup.studentPhone}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Info
              title="Mavzu"
              value={startup.topic}
            />

            <Info
              title="Topshirish sanasi"
              value={new Date(
                startup.submissionDate,
              ).toLocaleDateString("uz-UZ")}
            />
          </div>

          <section>
            <h3 className="font-semibold text-gray-900">
              Startup maqsadi
            </h3>

            <p className="mt-2 leading-6 text-gray-600">
              {startup.goal}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900">
              Loyiha haqida
            </h3>

            <p className="mt-2 whitespace-pre-line leading-6 text-gray-600">
              {startup.description}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900">
              Loyiha havolalari
            </h3>

            <div className="mt-3 flex flex-wrap gap-3">
              {startup.projectLink && (
                <a
                  href={startup.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Project / GitHub
                  <ExternalLink size={16} />
                </a>
              )}

              {startup.demoLink && (
                <a
                  href={startup.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Loyihani ko'rish
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </section>

          {startup.mentorComment && (
            <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <h3 className="font-semibold text-gray-900">
                Mentor izohi
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {startup.mentorComment}
              </p>
            </section>
          )}
        </div>
      </div>
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
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-xs font-medium uppercase text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}