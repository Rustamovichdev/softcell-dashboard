import { useState, useEffect, type FC } from "react";
import { KANBAN_COLUMNS, INITIAL_CALLS } from "./data";
import { KanbanColumn } from "./components/KanbanColumn";
import { NewCallModal } from "./components/NewCallModal";
import type { CallCardItem, CallStatus } from "./types";

const CALL_STORAGE_KEY = "softcell_call_center_cards";

const CallCenter: FC = () => {
  const [calls, setCalls] = useState<CallCardItem[]>(() => {
    const saved = localStorage.getItem(CALL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CALLS;
      }
    }
    return INITIAL_CALLS;
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kartalar o'zgarganda localStorage ga yozish
  useEffect(() => {
    localStorage.setItem(CALL_STORAGE_KEY, JSON.stringify(calls));
  }, [calls]);

  // Drag & drop orqali statusni o'zgartirish
  const handleDropCall = (callId: string, newStatus: CallStatus) => {
    setCalls((prev) =>
      prev.map((c) => (c.id === callId ? { ...c, status: newStatus } : c))
    );
  };

  // Yangi karta qo'shish
  const handleAddCall = (newCall: CallCardItem) => {
    setCalls((prev) => [newCall, ...prev]);
  };

  // Kartani o'chirish
  const handleDeleteCall = (id: string) => {
    setCalls((prev) => prev.filter((c) => c.id !== id));
  };

  // Qidiruv bo'yicha saralash
  const filteredCalls = calls.filter((c) =>
    search.trim() === ""
      ? true
      : c.clientName.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.operator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Sarlavha va asboblar paneli */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Call Center (Qo'ng'iroqlar)
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Kartalarni ushlab (drag & drop) kerakli holat ustuniga suring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mijoz yoki raqamni qidirish..."
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-xs outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white sm:text-sm"
          />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-xs font-medium text-white shadow-sm transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 sm:text-sm"
          >
            <span>+</span>
            <span>Yangi qo'ng'iroq</span>
          </button>
        </div>
      </div>

      {/* Kanban doskasi (Gorizontal 5 ta ustun) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {KANBAN_COLUMNS.map((col) => {
          const colCalls = filteredCalls.filter((c) => c.status === col.id);
          return (
            <KanbanColumn
              key={col.id}
              column={col}
              calls={colCalls}
              onDropCall={handleDropCall}
              onDeleteCall={handleDeleteCall}
            />
          );
        })}
      </div>

      {/* Yangi qo'shish modali */}
      {isModalOpen && (
        <NewCallModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddCall}
        />
      )}
    </div>
  );
};

export default CallCenter;
