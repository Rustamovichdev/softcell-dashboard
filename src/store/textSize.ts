import { create } from "zustand";
import { TEXT_SIZE_STORAGE_KEY } from "../constants/data";

export type TextSize = "sm" | "md" | "lg";

const FONT_SIZE_PX: Record<TextSize, number> = { sm: 14, md: 16, lg: 18 };

const applyTextSize = (size: TextSize): void => {
  if (typeof document === "undefined") return;
  document.documentElement.style.fontSize = `${FONT_SIZE_PX[size]}px`;
  localStorage.setItem(TEXT_SIZE_STORAGE_KEY, size);
};

const getInitialTextSize = (): TextSize => {
  if (typeof window === "undefined") return "md";
  const saved = localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
  return saved === "sm" || saved === "md" || saved === "lg" ? saved : "md";
};

type TextSizeStore = {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
};

const initialTextSize = getInitialTextSize();
applyTextSize(initialTextSize);

export const useTextSizeStore = create<TextSizeStore>((set) => ({
  textSize: initialTextSize,
  setTextSize: (size) => {
    applyTextSize(size);
    set({ textSize: size });
  },
}));