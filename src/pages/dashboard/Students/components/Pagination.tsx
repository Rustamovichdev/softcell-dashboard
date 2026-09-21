import type { FC } from "react";
import Icon from "../../../../components/ui/Icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const baseClassName =
  "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40";

const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Sahifalash" className="mt-4 flex flex-wrap items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Oldingi sahifa"
        className={`${baseClassName} text-gray-500 hover:bg-gray-100`}
      >
        <Icon name="chevron-down" className="h-4 w-4 rotate-90" />
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-current={item === page ? "page" : undefined}
          className={`${baseClassName} ${
            item === page ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Keyingi sahifa"
        className={`${baseClassName} text-gray-500 hover:bg-gray-100`}
      >
        <Icon name="chevron-down" className="h-4 w-4 -rotate-90" />
      </button>
    </nav>
  );
};

export default Pagination;