import { useState, type FC, type DragEvent } from "react";
import type { CallCardItem, KanbanColumnDef, CallStatus } from "../types";
import { CallCard } from "./CallCard";

type KanbanColumnProps = {
  column: KanbanColumnDef;
  calls: CallCardItem[];
  onDropCall: (callId: string, newStatus: CallStatus) => void;
  onDeleteCall: (id: string) => void;
};

export const KanbanColumn: FC<KanbanColumnProps> = ({
  column,
  calls,
  onDropCall,
  onDeleteCall,
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const callId = e.dataTransfer.getData("text/plain");
    if (callId) {
      onDropCall(callId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex min-h-[500px] flex-col rounded-2xl border-t-4 bg-gray-50/80 p-3 transition-colors ${
        column.color
      } ${
        isOver
          ? "bg-blue-50/70 ring-2 ring-blue-400 dark:bg-blue-950/20"
          : "border-gray-200 dark:border-gray-800 dark:bg-gray-900/40"
      }`}
    >
      {/* Ustun sarlavhasi */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {column.title}
        </h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-bold ${column.badgeBg}`}
        >
          {calls.length}
        </span>
      </div>

      {/* Kartalar joyi */}
      <div className="flex flex-1 flex-col gap-2.5">
        {calls.map((call) => (
          <CallCard key={call.id} call={call} onDelete={onDeleteCall} />
        ))}

        {calls.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 p-4 text-center text-xs text-gray-400 dark:border-gray-800">
            Kartani shu yerga olib keling
          </div>
        )}
      </div>
    </div>
  );
};
