import { LockKeyhole, LogIn, X } from "lucide-react";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const MENTOR_LOGIN = "mentor";
const MENTOR_PASSWORD = "123456";

export default function MentorLogin({
  onClose,
  onSuccess,
}: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      login === MENTOR_LOGIN &&
      password === MENTOR_PASSWORD
    ) {
      setError("");
      onSuccess();
      return;
    }

    setError("Login yoki parol noto'g'ri.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Mentor kirishi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Startup loyihalarini tekshirish
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Login
            </label>

            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Mentor login"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Parol
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Parol"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-800"
          >
            <LogIn size={18} />
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}