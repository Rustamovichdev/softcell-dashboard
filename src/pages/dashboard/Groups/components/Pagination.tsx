import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-4 flex items-center justify-center gap-2" aria-label="Sahifalash">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Oldingi sahifa"
      >
        <Icon name="chevron-down" className="h-5 w-5 rotate-90" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onChange(pageNumber)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
            pageNumber === page ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-current={pageNumber === page ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Keyingi sahifa"
      >
        <Icon name="chevron-down" className="h-5 w-5 -rotate-90" />
      </button>
    </nav>
  );
};

export default Pagination;
