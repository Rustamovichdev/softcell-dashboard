import type { LoginCredentials, LoginResponse } from "../../types";

/** Demo login uchun credential (backend ulanmaguncha ishlatiladi) */
export const DEMO_CREDENTIALS: LoginCredentials = {
  login: "admin",
  password: "admin123",
};

/**
 * Demo login - backend o'rniga ishlaydi (`IS_MOCK_AUTH` yoqilganda).
 * Login/parol noto'g'ri bo'lsa xato tashlaydi, thunk uni xato matniga aylantiradi.
 */
export const mockLoginRequest = async ({
  login,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  // Tarmoq kechikishini taqlid qilamiz
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (login !== DEMO_CREDENTIALS.login || password !== DEMO_CREDENTIALS.password) {
    throw new Error("Login yoki parol xato");
  }

  return {
    token: "demo-token",
    user: {
      fullName: "Admin User",
      email: "admin@softcell.uz",
      role: "admin",
    },
  };
};