import axios from "axios";
import { AUTH_STORAGE_KEY, LOGIN_ROUTE } from "../constants/data";

/** .env dagi VITE_API_URL (masalan: https://api.softcell.uz) */
export const API_URL = import.meta.env.VITE_API_URL ?? "";

/**
 * Demo rejim: backend hali ulanmagan bo'lsa login oqimini sinash uchun.
 * - `VITE_MOCK_AUTH=true` qilinsa yoqiladi
 * - dev rejimda `VITE_API_URL` berilmagan bo'lsa avtomatik yoqiladi
 * Backend tayyor bo'lgach `.env` ga `VITE_API_URL` yozing - demo o'chadi.
 */
export const IS_MOCK_AUTH =
  import.meta.env.VITE_MOCK_AUTH === "true" || (import.meta.env.DEV && !API_URL);

/** Saqlangan tokenni o'qish */
const readStoredToken = (): string | null => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as { token?: string }).token ?? null : null;
  } catch {
    return null;
  }
};

/** Barcha API so'rovlari uchun axios instance */
export const api = axios.create({
  baseURL: API_URL || "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Har bir so'rovga saqlangan token qo'shiladi
api.interceptors.request.use((config) => {
  const token = readStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token muddati tugasa (401) - sessiya tozalanadi va login sahifasiga qaytariladi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      if (window.location.pathname !== LOGIN_ROUTE) window.location.assign(LOGIN_ROUTE);
    }
    return Promise.reject(error);
  },
);

export default api;
