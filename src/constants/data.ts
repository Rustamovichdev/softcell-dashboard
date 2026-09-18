import type { CurrentUser, Language, NotificationItem, ProfileMenuItem } from "../types";

/* ------------------------------------------------------------------ */
/*  Route manzillari                                                   */
/* ------------------------------------------------------------------ */

/** Login sahifasi manzili */
export const LOGIN_ROUTE = "/login";

/** Dashboard sahifasi manzili */
export const DASHBOARD_ROUTE = "/dashboard";

/* ------------------------------------------------------------------ */
/*  Saqlash kalitlari (localStorage)                                   */
/* ------------------------------------------------------------------ */

/** Auth (token + user) shu kalit bilan saqlanadi */
export const AUTH_STORAGE_KEY = "dashboard:auth";

/** Header'dagi tillar */
export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "uz", label: "UZB" },
  { value: "ru", label: "RUS" },
];

/** Tanlangan til localStorage'da shu kalit bilan saqlanadi */
export const LANGUAGE_STORAGE_KEY = "dashboard:language";

/** Notificationlar (hozircha statik, keyinchalik API dan olinadi) */
export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: "Yangi lid qo'shildi",
    description: "Lidlar sahifasida yangi malumot paydo bo'ldi",
    time: "5 daqiqa oldin",
    unread: true,
  },
  {
    id: 2,
    title: "To'lov qabul qilindi",
    description: "Student to'lovi muvaffaqiyatli o'tdi",
    time: "1 soat oldin",
    unread: true,
  },
  {
    id: 3,
    title: "Dars jadvali o'zgardi",
    description: "Dars vaqti 14:00 ga ko'chirildi",
    time: "Kecha",
  },
];

/** Tizimga kirgan foydalanuvchi (TODO: auth store'dan olinadi) */
export const CURRENT_USER: CurrentUser = {
  fullName: "Admin User",
  email: "admin@softcell.uz",
  role: "admin",
};

/** Profil modalining menyulari */
export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { key: "account", label: "My Account", icon: "user" },
  { key: "settings", label: "Settings", icon: "settings", path: "/settings" },
  { key: "help", label: "Help & Support", icon: "help" },
  { key: "signout", label: "Sign out", icon: "logout", danger: true },
];

