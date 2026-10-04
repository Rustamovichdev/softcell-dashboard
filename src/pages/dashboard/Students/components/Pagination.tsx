import { useEffect, useRef, useState, type FC } from "react";
import Icon from "../../../../components/ui/Icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
};

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

const baseClassName =
  "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40";

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Tashqariga bosganda menyuni avtomatik yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (size: number) => {
    onPageSizeChange(size);
    setIsOpen(false);
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Chap tomon: umumiy studentlar soni */}
      <div className="text-xs text-gray-500 sm:text-sm">
        Jami <span className="font-semibold text-gray-900">{totalItems}</span> ta student
      </div>

      {/* O'rta: Sahifalar (1, 2, 3...) */}
      {totalPages > 1 ? (
        <nav aria-label="Sahifalash" className="flex flex-wrap items-center justify-center gap-1">
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
                item === page
                  ? "bg-gray-900 font-medium text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
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
      ) : (
        <div />
      )}

      {/* O'ng tomon: Silliq animatsiyali qator tanlagichi */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500" ref={dropdownRef}>
        <span>Qatorlar:</span>

        <div className="relative">
          {/* Asosiy tugma */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none sm:text-sm"
          >
            <span>{pageSize} tadan</span>
            <span
              className={`inline-block transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <Icon name="chevron-down" className="h-3.5 w-3.5 text-gray-400" />
            </span>
          </button>

          {/* Silliq animatsiya bilan yuqoriga qalqib chiquvchi menyu */}
          <div
            className={`absolute bottom-full right-0 mb-2 w-32 origin-bottom-right rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl transition-all duration-200 ease-out ${
              isOpen
                ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
                : "scale-95 opacity-0 pointer-events-none translate-y-2"
            }`}
          >
            <p className="px-2 py-1 text-[11px] font-medium text-gray-400">
              Qatorlar soni
            </p>

            <div className="flex flex-col gap-0.5">
              {PAGE_SIZE_OPTIONS.map((size) => {
                const isSelected = size === pageSize;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSelect(size)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{size} tadan</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
