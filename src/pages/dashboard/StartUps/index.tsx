import { ShieldCheck } from "lucide-react";

import { useState } from "react";

import MentorDashboard from "./components/MentorDashboard";
import MentorLogin from "./components/MentorLogin";
import StartupDetail from "./components/StartupDetail";
import StartupForm from "./components/StartupForm";
import StartupList from "./components/StartupList";

import { initialStartups } from "./data/startups";

import type {
  Startup,
  StartupStatus,
} from "./types/startup";

type PageMode =
  | "list"
  | "form"
  | "detail"
  | "mentorLogin"
  | "mentorDashboard";

export default function StartUpsPage() {
  const [startups, setStartups] =
    useState<Startup[]>(initialStartups);

  const [pageMode, setPageMode] =
    useState<PageMode>("list");

  const [selectedStartup, setSelectedStartup] =
    useState<Startup | null>(null);

  const [mentorLoggedIn, setMentorLoggedIn] =
    useState(false);

  // ------------------------------------------
  // STARTUP QO'SHISH
  // ------------------------------------------

  const handleAddStartup = (
    startup: Startup,
  ) => {
    setStartups((prev) => [
      ...prev,
      startup,
    ]);

    setPageMode("list");
  };

  // ------------------------------------------
  // STARTUP OCHIRISH
  // ------------------------------------------

  const handleDeleteStartup = (
    id: string,
  ) => {
    const confirmed = window.confirm(
      "Bu startupni o'chirishni xohlaysizmi?",
    );

    if (!confirmed) {
      return;
    }

    setStartups((prev) =>
      prev.filter(
        (startup) => startup.id !== id,
      ),
    );

    if (
      selectedStartup &&
      selectedStartup.id === id
    ) {
      setSelectedStartup(null);
    }
  };

  // ------------------------------------------
  // STARTUP KO'RISH
  // ------------------------------------------

  const handleSelectStartup = (
    startup: Startup,
  ) => {
    setSelectedStartup(startup);
    setPageMode("detail");
  };

  // ------------------------------------------
  // MENTOR LOGIN
  // ------------------------------------------

  const handleMentorLogin = () => {
    setMentorLoggedIn(true);
    setPageMode("mentorDashboard");
  };

  // ------------------------------------------
  // MENTOR LOGOUT
  // ------------------------------------------

  const handleMentorLogout = () => {
    setMentorLoggedIn(false);
    setPageMode("list");
    setSelectedStartup(null);
  };

  // ------------------------------------------
  // MENTOR STARTUP STATUS O'ZGARTIRADI
  // ------------------------------------------

  const handleMentorUpdate = (
    id: string,
    status: StartupStatus,
    mentorComment?: string,
  ) => {
    setStartups((prev) =>
      prev.map((startup) =>
        startup.id === id
          ? {
              ...startup,
              status,
              mentorComment:
                mentorComment ??
                startup.mentorComment,
            }
          : startup,
      ),
    );

    setSelectedStartup((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status,
            mentorComment:
              mentorComment ??
              prev.mentorComment,
          }
        : prev,
    );
  };

  // ------------------------------------------
  // MENTOR DASHBOARD
  // ------------------------------------------

  if (
    pageMode === "mentorDashboard" &&
    mentorLoggedIn
  ) {
    return (
      <MentorDashboard
        startups={startups}
        onSelect={handleSelectStartup}
        onLogout={handleMentorLogout}
        onBack={() => setPageMode("list")}
      />
    );
  }

  // ------------------------------------------
  // MENTOR LOGIN
  // ------------------------------------------

  if (pageMode === "mentorLogin") {
    return (
      <MentorLogin
        onLogin={handleMentorLogin}
        onBack={() => setPageMode("list")}
      />
    );
  }

  // ------------------------------------------
  // STARTUP DETAIL
  // ------------------------------------------

  if (
    pageMode === "detail" &&
    selectedStartup
  ) {
    return (
      <StartupDetail
        startup={selectedStartup}
        onClose={() => {
          setSelectedStartup(null);

          if (mentorLoggedIn) {
            setPageMode(
              "mentorDashboard",
            );
          } else {
            setPageMode("list");
          }
        }}
        onUpdate={
          mentorLoggedIn
            ? (
                status,
                mentorComment,
              ) => {
                handleMentorUpdate(
                  selectedStartup.id,
                  status,
                  mentorComment,
                );

                setSelectedStartup(
                  (prev) =>
                    prev
                      ? {
                          ...prev,
                          status,
                          mentorComment:
                            mentorComment ??
                            prev.mentorComment,
                        }
                      : prev,
                );
              }
            : undefined
        }
      />
    );
  }

  // ------------------------------------------
  // STARTUP FORM
  // ------------------------------------------

  if (pageMode === "form") {
    return (
      <StartupForm
        onCancel={() =>
          setPageMode("list")
        }
        onSubmit={handleAddStartup}
      />
    );
  }

  // ------------------------------------------
  // ASOSIY STARTUP SAHIFA
  // ------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Startuplar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              O'quvchilarning startup loyihalari
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* MENTOR */}

            <button
              type="button"
              onClick={() =>
                setPageMode("mentorLogin")
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ShieldCheck size={17} />
              Mentor
            </button>

            {/* STARTUP QO'SHISH */}

            <button
              type="button"
              onClick={() =>
                setPageMode("form")
              }
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              + StartUp qo'shish
            </button>
          </div>
        </div>

        {/* STATISTIKA */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Jami startup
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {startups.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              G'oya
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {
                startups.filter(
                  (startup) =>
                    startup.status ===
                    "draft",
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Tayyorlanmoqda
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {
                startups.filter(
                  (startup) =>
                    startup.status ===
                    "preparing",
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Tasdiqlangan
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {
                startups.filter(
                  (startup) =>
                    startup.status ===
                    "approved",
                ).length
              }
            </p>
          </div>
        </div>

        {/* STARTUP LIST */}

        <StartupList
          startups={startups}
          onSelect={handleSelectStartup}
          onDelete={handleDeleteStartup}
        />
      </div>
    </div>
  );
}