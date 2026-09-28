import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1),
  );

  return (
    <nav className="mt-4 flex items-center justify-center gap-1" aria-label="Sahifalash">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Oldingi sahifa"
      >
        <Icon name="chevron-down" className="h-5 w-5 rotate-90" />
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
            p === page
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-label={`Sahifa ${p}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Keyingi sahifa"
      >
        <Icon name="chevron-down" className="h-5 w-5 -rotate-90" />
      </button>
    </nav>
  );
};

export default Pagination;