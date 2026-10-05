import { useState, type FC, type FormEvent } from "react";
import type { CallCardItem, CallStatus } from "../types";

type NewCallModalProps = {
  onClose: () => void;
  onAdd: (call: CallCardItem) => void;
};

export const NewCallModal: FC<NewCallModalProps> = ({ onClose, onAdd }) => {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("Malika Karimova");
  const [status, setStatus] = useState<CallStatus>("new");
  const [note, setNote] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) return;

    const newCall: CallCardItem = {
      id: `call-${Date.now()}`,
      clientName: clientName.trim(),
      phone: phone.trim(),
      operator,
      status,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      note: note.trim(),
    };

    onAdd(newCall);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-800">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Yangi qo'ng'iroq kartasi
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-sm">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Mijoz ismi *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Masalan: Sardor Aliyev"
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Telefon raqami *
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Operator
              </label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-2 outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              >
                <option value="Malika Karimova">Malika Karimova</option>
                <option value="Nodir Saidov">Nodir Saidov</option>
                <option value="Diyor Bek">Diyor Bek</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Boshlang'ich holati
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CallStatus)}
                className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-2 outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              >
                <option value="new">Yangi</option>
                <option value="answered">Javob berildi</option>
                <option value="missed">Javobsiz</option>
                <option value="callback">Keyinroq</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Izoh (eslatma)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Mijoz nima dedi..."
              className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gray-900 py-2.5 font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900"
            >
              Qo'shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
