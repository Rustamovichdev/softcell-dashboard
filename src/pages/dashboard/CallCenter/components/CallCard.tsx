import type { FC, DragEvent } from "react";
import type { CallCardItem } from "../types";

type CallCardProps = {
  call: CallCardItem;
  onDelete: (id: string) => void;
};

export const CallCard: FC<CallCardProps> = ({ call, onDelete }) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", call.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group cursor-grab rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md active:cursor-grabbing dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white">
          {call.clientName}
        </h4>
        <button
          type="button"
          onClick={() => onDelete(call.id)}
          className="text-xs text-gray-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
          title="O'chirish"
        >
          ✕
        </button>
      </div>

      <p className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">
        📞 {call.phone}
      </p>

      {call.note && (
        <p className="mt-2 line-clamp-2 rounded-md bg-gray-50 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {call.note}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] text-gray-500 dark:border-gray-800">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          👤 {call.operator}
        </span>
        <div className="flex items-center gap-2">
          {call.duration && <span>⏱ {call.duration}</span>}
          <span>🕒 {call.time}</span>
        </div>
      </div>
    </div>
  );
};
