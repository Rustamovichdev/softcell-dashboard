import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import Icon from "../../../components/ui/Icon";
import { DASHBOARD_ROUTE } from "../../../constants/data";
import { loginUser, selectAuthError, selectAuthStatus } from "../../../features/auth";
import { DEMO_CREDENTIALS } from "../../../features/auth/mockAuth";
import { IS_MOCK_AUTH } from "../../../service/api";
import { useAppDispatch, useAppSelector } from "../../../store";

const loginSchema = z.object({
    login: z.string().min(3, "Login kamida 3 ta belgidan iborat bo'lishi kerak"),
    password: z.string().min(4, "Parol kamida 4 ta belgidan iborat bo'lishi kerak"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const fieldClassName =
    "h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { login: "", password: "" },
    });

    const isLoading = status === "loading";

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await dispatch(loginUser(values)).unwrap();
            // Login qilishdan oldin ochmoqchi bo'lgan sahifasiga qaytaramiz
            const from = (location.state as { from?: string } | null)?.from;
            navigate(from || DASHBOARD_ROUTE, { replace: true });
        } catch {
            // Xato matni store'dagi selectAuthError orqali pastda ko'rsatiladi
        }
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex flex-col items-center text-center">
                    <img src="/softcell.png" alt="Softcell" className="h-12 w-12 object-contain" />
                    <h1 className="mt-3 text-lg font-semibold sm:text-xl">Tizimga kirish</h1>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">Login va parolni kiriting</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-gray-600 sm:text-sm">Login</span>
                        <input
                            {...register("login")}
                            type="text"
                            autoComplete="username"
                            placeholder="Loginni kiriting"
                            className={fieldClassName}
                        />
                        {errors.login && <span className="text-xs text-red-500">{errors.login.message}</span>}
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-gray-600 sm:text-sm">Parol</span>
                        <span className="relative block">
                            <input
                                {...register("password")}
                                type={isPasswordVisible ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Parolni kiriting"
                                className={`${fieldClassName} pr-11`}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible((visible) => !visible)}
                                aria-label={isPasswordVisible ? "Parolni yashirish" : "Parolni ko'rsatish"}
                                className="absolute top-1/2 right-1 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <Icon name={isPasswordVisible ? "eye-off" : "eye"} className="h-4 w-4" />
                            </button>
                        </span>
                        {errors.password && (
                            <span className="text-xs text-red-500">{errors.password.message}</span>
                        )}
                    </label>

                    {error && (
                        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 sm:text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex h-11 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        )}
                        {isLoading ? "Kirilmoqda..." : "Kirish"}
                    </button>
                </form>

                {IS_MOCK_AUTH && (
                    <p className="mt-5 rounded-lg bg-gray-50 px-3 py-2 text-center text-[11px] text-gray-500">
                        Demo rejim: login <span className="font-semibold">{DEMO_CREDENTIALS.login}</span>, parol{" "}
                        <span className="font-semibold">{DEMO_CREDENTIALS.password}</span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default Login;
