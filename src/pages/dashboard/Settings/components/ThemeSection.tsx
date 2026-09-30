import type { FC, SVGProps } from "react";
import { useThemeStore, type Theme } from "../../../../store/theme";

const SunIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const MoonIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

const OPTIONS: { value: Theme; label: string; Icon: FC<SVGProps<SVGSVGElement>> }[] = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
];

const ThemeSection: FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <h2 className="text-sm font-semibold sm:text-base">Color theme</h2>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
        Tizim ko'rinishini tanlang
      </p>

      <div className="mt-4 flex gap-3">
        {OPTIONS.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={theme === value}
            className={`flex flex-1 flex-col items-center gap-2 rounded-lg border px-4 py-4 text-sm font-medium transition sm:flex-row sm:justify-center ${
              theme === value
                ? "border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThemeSection;