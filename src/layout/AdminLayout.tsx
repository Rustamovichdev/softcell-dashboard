import { useEffect, useState, type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getRoutesByRole } from "../app/router";
import Icon from "../components/ui/Icon";
import Header from "./Header";

const AdminLayout: FC = () => {
    // TODO: rol auth store / redux dan olinadi va getRoutesByRole(role) ga uzatiladi
    const routes = getRoutesByRole();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Escape tugmasi bilan mobil menyuni yopish
    useEffect(() => {
        if (!isSidebarOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSidebarOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSidebarOpen]);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
            {/* Mobil menyu uchun overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:w-60 lg:translate-x-0 lg:transition-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between gap-2 px-4 py-5">
                    <span className="text-lg font-semibold">Softcell</span>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Menyuni yopish"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                    >
                        <Icon name="close" className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 px-2 pb-4">
                    {routes.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

