import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../constants/data";
import { PublicOnly, RequireAuth } from "../features/auth/guards";
import AdminLayout from "../layout/AdminLayout";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Tizimdagi foydalanuvchi rollari (keyinchalik to'ldiriladi) */
export type UserRole = "admin" | "manager" | "teacher" | "student";

/**
 * Bitta route tavsifi (data ko'rinishida).
 * Yangi sahifa qo'shish uchun faqat shu massivga element qo'shish kifoya.
 */
export type AppRoute = {
  /** Brauzerdagi to'liq manzil, masalan "/students" */
  path: string;
  /** Menyu, breadcrumb va title uchun nom (sidebar'da ko'rinishi uchun) */
  label?: string;
  /** Icon kaliti (icon kutubxonasi ulanganda ishlatiladi) */
  icon?: string;
  /**
   * Sahifani ko'ra oladigan rollar.
   * Bo'sh yoki ko'rsatilmagan bo'lsa - barcha rollar uchun ochiq.
   */
  roles?: UserRole[];
  /** Sahifa komponenti (lazy import) */
  component: LazyExoticComponent<ComponentType>;
  /** Ichki (nested) routelar - path relative yoziladi: "new", ":id" kabi */
  children?: AppRoute[];
};

/* ------------------------------------------------------------------ */
/*  Routes (data)                                                      */
/* ------------------------------------------------------------------ */

/** AdminLayout ichida ko'rinadigan routelar */
export const appRoutes: AppRoute[] = [
  {
    path: DASHBOARD_ROUTE,
    label: "Dashboard",
    icon: "dashboard",
    // roles: ["admin"], // keyinchalik Dashboard rolga qarab ajratiladi
    component: lazy(() => import("../pages/dashboard/Dashboard")),
  },
  {
    path: "/leads",
    label: "Leads",
    icon: "leads",
    component: lazy(() => import("../pages/dashboard/Leads")),
  },
  {
    path: "/students",
    label: "Students",
    icon: "students",
    component: lazy(() => import("../pages/dashboard/Students")),
  },
  {
    path: "/lessons",
    label: "Lessons",
    icon: "lessons",
    component: lazy(() => import("../pages/dashboard/Lessons")),
  },
  {
    path: "/lessons/new",
    component: lazy(() => import("../pages/dashboard/Lessons/LessonFormPage")),
  },
  {
    path: "/lessons/:lessonId",
    component: lazy(() => import("../pages/dashboard/Lessons/LessonDetailPage")),
  },
  {
    path: "/lessons/:lessonId/add-group",
    component: lazy(() => import("../pages/dashboard/Lessons/AddGroupPage")),
  },
  {
    path: "/meets",
    label: "Meets",
    icon: "meets",
    component: lazy(() => import("../pages/dashboard/Meets")),
  },
  {
    path: "/startups",
    label: "StartUps",
    icon: "startups",
    component: lazy(() => import("../pages/dashboard/StartUps")),
  },
  {
    path: "/teachers",
    label: "Teachers",
    icon: "teachers",
    component: lazy(() => import("../pages/dashboard/Teachers")),
  },
  {
    path: "/directions",
    label: "Directions",
    icon: "directions",
    component: lazy(() => import("../pages/dashboard/Directions")),
  },
  {
    path: "/history",
    label: "History",
    icon: "history",
    component: lazy(() => import("../pages/dashboard/History")),
  },
  {
    path: "/payment",
    label: "Payment",
    icon: "payment",
    component: lazy(() => import("../pages/dashboard/Payment")),
  },
  {
    path: "/results",
    label: "Results",
    icon: "results",
    component: lazy(() => import("../pages/dashboard/Results")),
  },
  {
    path: "/settings",
    label: "Settings",
    icon: "settings",
    component: lazy(() => import("../pages/dashboard/Settings")),
  },
];

/** Layoutsiz (auth) routelar */
export const authRoutes: AppRoute[] = [
  {
    path: LOGIN_ROUTE,
    label: "Login",
    component: lazy(() => import("../pages/auth/Login")),
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Berilgan rolga ruxsat etilgan routelarni qaytaradi.
 * Sidebar/menyu va route guard uchun ishlatiladi.
 * Rol berilmasa - rol cheklovi yo'q routelar qaytadi.
 */
export const getRoutesByRole = (
  role?: UserRole,
  routes: AppRoute[] = appRoutes,
): AppRoute[] =>
  routes.filter(({ roles }) => !roles?.length || (role !== undefined && roles.includes(role)));

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

/** AppRoute (data) -> RouteObject (react-router) */
const toRouteObject = ({ path, component, children }: AppRoute): RouteObject => ({
  path: path.replace(/^\//, ""),
  element: withSuspense(component),
  children: children?.map(toRouteObject),
});

/** Login qilganlarni login sahifasiga kiritmaydigan route (PublicOnly guard bilan) */
const toPublicRouteObject = (route: AppRoute): RouteObject => {
  const routeObject = toRouteObject(route);
  return { ...routeObject, element: <PublicOnly>{routeObject.element}</PublicOnly> };
};

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/* ------------------------------------------------------------------ */

export const router = createBrowserRouter([
  // Ochiq (auth) routelar - login qilingan bo'lsa dashboardga qaytaradi
  ...authRoutes.map(toPublicRouteObject),
  {
    path: "/",
    // Token bo'lmasa - /login ga yo'naltiradi
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to={DASHBOARD_ROUTE} replace /> },
      ...appRoutes.map(toRouteObject),
      { path: "*", element: <Navigate to={DASHBOARD_ROUTE} replace /> },
    ],
  },
]);

export default router;

