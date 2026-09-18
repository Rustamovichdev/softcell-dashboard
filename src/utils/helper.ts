import axios from "axios";
/** "Admin User" -> "AU" (avatar uchun bosh harflar) */
export const getInitials = (fullName: string, maxParts = 2): string =>
  fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxParts)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/** API / tarmoq xatolaridan foydalanuvchiga ko'rsatiladigan matn chiqaradi */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (message) return message;
    if (!error.response) return "Server bilan aloqa yo'q. Internetni tekshiring.";
    return "Xatolik yuz berdi. Keyinroq qayta urinib ko'ring.";
  }

  if (error instanceof Error && error.message) return error.message;

  return "Xatolik yuz berdi. Keyinroq qayta urinib ko'ring.";
};

