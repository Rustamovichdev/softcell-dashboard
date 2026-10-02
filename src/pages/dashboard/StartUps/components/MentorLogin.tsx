import {
  ArrowLeft,
  LockKeyhole,
  LogIn,
} from "lucide-react";

import { useState } from "react";

interface Props {
  onLogin: () => void;
  onBack: () => void;
}

export default function MentorLogin({
  onLogin,
  onBack,
}: Props) {
  const [login, setLogin] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setError("");

    if (
      login.trim() === "mentor" &&
      password === "12345"
    ) {
      onLogin();
      return;
    }

    setError("Login yoki parol noto'g'ri.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Orqaga
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white">
            <LockKeyhole size={27} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Mentor kirishi
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Startup loyihalarini tekshirish uchun
            mentor loginiga kiring.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Login
              </label>

              <input
                type="text"
                value={login}
                onChange={(event) =>
                  setLogin(event.target.value)
                }
                placeholder="Login"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Parol
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Parol"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800"
            >
              <LogIn size={18} />
              Kirish
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-xs text-gray-500">
            <p>
              Demo login:{" "}
              <b className="text-gray-700">
                mentor
              </b>
            </p>

            <p className="mt-1">
              Demo parol:{" "}
              <b className="text-gray-700">
                12345
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}