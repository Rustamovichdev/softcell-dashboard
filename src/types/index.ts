/* Umumiy (shared) type'lar */

/** Header'dagi til tanlash uchun */
export type Language = "uz" | "ru";

/** Icon komponentida mavjud bo'lgan icon kalitlari */
export type IconName =
  | "search"
  | "menu"
  | "bell"
  | "language"
  | "chevron-down"
  | "close"
  | "check"
  | "eye"
  | "eye-off"
  | "user"
  | "settings"
  | "logout"
  | "help";

/** Header'dagi notification elementi (keyinchalik API dan olinadi) */
export type NotificationItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

/** Tizimga kirgan foydalanuvchi (keyinchalik auth store'dan olinadi) */
export type CurrentUser = {
  fullName: string;
  email: string;
  role: string;
};

/** Profil modalining menyu elementlari */
export type ProfileMenuItem = {
  key: "account" | "settings" | "help" | "signout";
  label: string;
  icon: IconName;
  /** bo'lsa - shu routega o'tadi */
  path?: string;
  /** qizil (danger) ko'rinish uchun */
  danger?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Auth                                                               */
/* ------------------------------------------------------------------ */

/** Login formasi (faqat login va parol - ro'yxatdan o'tish yo'q) */
export type LoginCredentials = {
  login: string;
  password: string;
};

/** POST /auth/login javobi */
export type LoginResponse = {
  token: string;
  user: CurrentUser;
};

export type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

/** Auth store holati */
export type AuthState = {
  token: string | null;
  user: CurrentUser | null;
  status: AuthStatus;
  error: string | null;
};

