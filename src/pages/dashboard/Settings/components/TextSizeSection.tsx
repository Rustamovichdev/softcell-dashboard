import type { FC } from "react";
import { useTextSizeStore, type TextSize } from "../../../../store/textSize";

const OPTIONS: { value: TextSize; label: string; sample: string }[] = [
  { value: "sm", label: "Kichik", sample: "text-xs" },
  { value: "md", label: "O'rtacha", sample: "text-sm" },
  { value: "lg", label: "Katta", sample: "text-base" },
];

const TextSizeSection: FC = () => {
  const textSize = useTextSizeStore((state) => state.textSize);
  const setTextSize = useTextSizeStore((state) => state.setTextSize);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <h2 className="text-sm font-semibold sm:text-base">Text size</h2>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
        Matn o'lchamini tanlang
      </p>

      <div className="mt-4 flex gap-3">
        {OPTIONS.map(({ value, label, sample }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTextSize(value)}
            aria-pressed={textSize === value}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-4 py-4 font-medium transition ${
              textSize === value
                ? "border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className={sample}>Aa</span>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TextSizeSection;