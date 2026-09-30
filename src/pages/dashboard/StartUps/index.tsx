import { Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";

import MentorDashboard from "./components/MentorDashboard";
import MentorLogin from "./components/MentorLogin";
import StartupDetail from "./components/StartupDetail";
import StartupForm from "./components/StartupForm";
import StartupList from "./components/StartupList";

import { initialStartups } from "./data/startups";

import type { Startup } from "./types/startup";

type Page = "list" | "form" | "mentorLogin" | "mentor";

export default function Startups() {
  const [startups, setStartups] =
    useState<Startup[]>(initialStartups);

  const [page, setPage] = useState<Page>("list");

  const [selectedStartup, setSelectedStartup] =
    useState<Startup | null>(null);

  // ==========================================
  // STARTUP QO'SHISH
  // ==========================================

  const handleAddStartup = () => {
    setSelectedStartup(null);
    setPage("form");
  };

  // ==========================================
  // STARTUP SAQLASH
  // ==========================================

  const handleSubmitStartup = (startup: Startup) => {
    setStartups((currentStartups) => {
      const exists = currentStartups.some(
        (item) => item.id === startup.id,
      );

      if (exists) {
        return currentStartups.map((item) =>
          item.id === startup.id ? startup : item,
        );
      }

      return [...currentStartups, startup];
    });

    setSelectedStartup(null);
    setPage("list");
  };

  // ==========================================
  // STARTUP YANGILASH
  // ==========================================

  const handleUpdateStartup = (
    updatedStartup: Startup,
  ) => {
    setStartups((currentStartups) =>
      currentStartups.map((startup) =>
        startup.id === updatedStartup.id
          ? updatedStartup
          : startup,
      ),
    );
  };

  // ==========================================
  // STARTUP O'CHIRISH
  // ==========================================

  const handleDeleteStartup = (id: string) => {
    const startup = startups.find(
      (item) => item.id === id,
    );

    if (!startup) {
      return;
    }

    const confirmed = window.confirm(
      `"${startup.studentName}" ning "${startup.startupName}" startup loyihasini o'chirmoqchimisiz?`,
    );

    if (!confirmed) {
      return;
    }

    setStartups((currentStartups) =>
      currentStartups.filter(
        (item) => item.id !== id,
      ),
    );

    setSelectedStartup(null);
  };

  // ==========================================
  // STARTUP FORM
  // ==========================================

  if (page === "form") {
    return (
      <div className="p-6">
        <StartupForm
          startup={selectedStartup}
          onCancel={() => {
            setSelectedStartup(null);
            setPage("list");
          }}
          onSubmit={handleSubmitStartup}
        />
      </div>
    );
  }

  // ==========================================
  // MENTOR LOGIN
  // ==========================================

  if (page === "mentorLogin") {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            StartUp
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            O'quvchilarning startup loyihalari
          </p>
        </div>

        <StartupList
          startups={startups}
          onSelect={(startup) => {
            setSelectedStartup(startup);
          }}
          onDelete={handleDeleteStartup}
        />

        <MentorLogin
          onClose={() => {
            setSelectedStartup(null);
            setPage("list");
          }}
          onSuccess={() => {
            setSelectedStartup(null);
            setPage("mentor");
          }}
        />

        {selectedStartup && (
          <StartupDetail
            startup={selectedStartup}
            onClose={() => {
              setSelectedStartup(null);
            }}
          />
        )}
      </div>
    );
  }

  // ==========================================
  // MENTOR DASHBOARD
  // ==========================================

  if (page === "mentor") {
    return (
      <div className="p-6">
        <MentorDashboard
          startups={startups}
          onBack={() => {
            setPage("list");
          }}
          onUpdate={handleUpdateStartup}
        />
      </div>
    );
  }

  // ==========================================
  // ASOSIY STARTUP SAHIFA
  // ==========================================

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            StartUp
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            O'quvchilarning startup loyihalari
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* MENTOR */}

          <button
            type="button"
            onClick={() => {
              setSelectedStartup(null);
              setPage("mentorLogin");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ShieldCheck size={18} />

            Mentor
          </button>

          {/* STARTUP QO'SHISH */}

          <button
            type="button"
            onClick={handleAddStartup}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />

            StartUp qo'shish
          </button>
        </div>
      </div>

      {/* STATISTIKA */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jami startup"
          value={startups.length}
        />

        <StatCard
          title="G'oya"
          value={getStatusCount(
            startups,
            "idea",
          )}
        />

        <StatCard
          title="Tayyorlanmoqda"
          value={getStatusCount(
            startups,
            "preparing",
          )}
        />

        <StatCard
          title="Topshirilgan"
          value={getStatusCount(
            startups,
            "submitted",
          )}
        />
      </div>

      {/* STARTUP TABLE */}

      <StartupList
        startups={startups}
        onSelect={(startup) => {
          setSelectedStartup(startup);
        }}
        onDelete={handleDeleteStartup}
      />

      {/* STARTUP DETAIL */}

      {selectedStartup && (
        <StartupDetail
          startup={selectedStartup}
          onClose={() => {
            setSelectedStartup(null);
          }}
        />
      )}
    </div>
  );
}

// ==========================================
// STATUS SANASH
// ==========================================

function getStatusCount(
  startups: Startup[],
  status: Startup["status"],
): number {
  return startups.filter(
    (startup) => startup.status === status,
  ).length;
}

// ==========================================
// STATISTIKA KARTASI
// ==========================================

interface StatCardProps {
  title: string;
  value: number;
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}