import type { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../../constants/data";
import { useAppSelector } from "../../store";
import { selectToken } from "./index";

type GuardProps = {
  children: ReactNode;
};

/** Login qilmagan foydalanuvchini /login sahifasiga yo'naltiradi */
export const RequireAuth: FC<GuardProps> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const { pathname } = useLocation();

  if (!token) {
    // Kelgan sahifani eslab qolamiz - login qilgach shu yerga qaytadi
    return <Navigate to={LOGIN_ROUTE} replace state={{ from: pathname }} />;
  }

  return <>{children}</>;
};

/** Login qilgan foydalanuvchini dashboardga qaytaradi (login sahifasi uchun) */
export const PublicOnly: FC<GuardProps> = ({ children }) => {
  const token = useAppSelector(selectToken);

  if (token) {
    return <Navigate to={DASHBOARD_ROUTE} replace />;
  }

  return <>{children}</>;
};