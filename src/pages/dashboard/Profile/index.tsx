import { useState, useEffect } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
  avatarUrl?: string;
  language: "uz" | "ru" | "en";
  emailNotifications: boolean;
  securityAlerts: boolean;
}

const STORAGE_KEY = "softcell_admin_account_data";

const DEFAULT_PROFILE: UserProfile = {
  fullName: "Admin User",
  email: "admin@softcell.uz",
  phone: "+998 90 123 45 67",
  role: "Admin",
  department: "Boshqaruv va IT",
  bio: "Softcell CRM boshqaruvchisi va tizim administratori.",
  avatarUrl: "",
  language: "uz",
  emailNotifications: true,
  securityAlerts: true,
};

const ProfilePage: FC = () => {
  // Profil ma'lumotlari
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [formData, setFormData] = useState<UserProfile>(profile);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // Xabarnomalar
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // Parol formalari
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Profil rasmini yuklash
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, avatarUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Rasmni o'chirish
  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };

  // Profilni saqlash
  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setProfileSuccessMsg("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
    setTimeout(() => setProfileSuccessMsg(""), 3500);
  };

  // Parolni yangilash
  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPasswordErrorMsg("");
    setPasswordSuccessMsg("");

    if (!currentPassword) {
      setPasswordErrorMsg("Hozirgi parolingizni kiriting.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordErrorMsg("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordErrorMsg("Yangi parol va tasdiqlash paroli bir-biriga mos kelmadi!");
      return;
    }

    setPasswordSuccessMsg("Parolingiz muvaffaqiyatli o'zgartirildi!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccessMsg(""), 3500);
  };

  // Avatar bosh harflari (AU)
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "AU";
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Sahifa sarlavhasi */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Mening hisobim (My Account)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Shaxsiy profil ma'lumotlari, xavfsizlik va bildirishnoma sozlamalari
        </p>
      </div>

      {/* Yuqori profil kartasi */}
      <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover border-2 border-indigo-600 shadow-xs"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white shadow-xs">
                {getInitials(profile.fullName)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
                {profile.role}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">{profile.email}</p>
            <p className="mt-1 text-xs text-gray-400">
              Bo'lim: <span className="text-gray-700 font-medium">{profile.department}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition">
            Rasm yuklash
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          {formData.avatarUrl && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              O'chirish
            </button>
          )}
        </div>
      </div>

      {/* Bo'limlarni almashtirish tablari */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("profile")}
          className={`border-b-2 py-3 px-4 text-sm font-semibold transition ${
            activeTab === "profile"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Shaxsiy ma'lumotlar
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`border-b-2 py-3 px-4 text-sm font-semibold transition ${
            activeTab === "security"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Xavfsizlik va Parol
        </button>
      </div>

      {/* 1-TAB: Shaxsiy ma'lumotlar */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {profileSuccessMsg && (
            <div className="rounded-xl bg-green-50 p-4 border border-green-200 text-sm font-medium text-green-700">
              ✓ {profileSuccessMsg}
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Asosiy ma'lumotlar
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-700">Ism va familiya *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Email manzil</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-500 cursor-not-allowed"
                />
                <span className="mt-1 block text-[11px] text-gray-400">
                  Emailni o'zgartirish faqat tizim egasi orqali amalga oshiriladi
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Telefon raqam</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Lavozim (Rol)</label>
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Qisqacha ma'lumot (Bio)</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-indigo-500"
                placeholder="O'zingiz haqingizda qisqacha..."
              />
            </div>
          </div>

          {/* Bildirishnomalar va Til */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Bildirishnomalar va Til sozlamalari
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-700">Tizim tili</label>
                <select
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value as "uz" | "ru" | "en" })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm outline-none"
                >
                  <option value="uz">O'zbek tili (Lotin)</option>
                  <option value="ru">Русский язык</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) =>
                    setFormData({ ...formData, emailNotifications: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Yangi o'quvchilar va to'lovlar haqida emailga xabarnoma olish
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.securityAlerts}
                  onChange={(e) =>
                    setFormData({ ...formData, securityAlerts: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Yangi qurilmadan kirilganda xavfsizlik ogohlantirishini yuborish
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              O'zgarishlarni saqlash
            </button>
          </div>
        </form>
      )}

      {/* 2-TAB: Xavfsizlik va Parol */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {passwordSuccessMsg && (
            <div className="rounded-xl bg-green-50 p-4 border border-green-200 text-sm font-medium text-green-700">
              ✓ {passwordSuccessMsg}
            </div>
          )}
          {passwordErrorMsg && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-sm font-medium text-red-600">
              ⚠ {passwordErrorMsg}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Parolni o'zgartirish
            </h3>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Hozirgi parol *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Yangi parol *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Yangi parolni tasdiqlang *</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPass"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4 rounded text-indigo-600"
                />
                <label htmlFor="showPass" className="text-xs text-gray-600 cursor-pointer">
                  Parollarni ko'rsatish
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Parolni yangilash
              </button>
            </div>
          </form>

          {/* Faol sessiyalar */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Faol seanslar (Oxirgi kirishlar)
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Windows PC • Chrome brauzer (Hozirgi seans)</p>
                    <p className="text-gray-400">Toshkent, O'zbekiston • IP: 185.139.xxx.xx</p>
                  </div>
                </div>
                <span className="rounded-md bg-green-100 px-2 py-0.5 font-medium text-green-700">
                  Faol
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-medium text-gray-700">iPhone 14 • Safari brauzer</p>
                    <p className="text-gray-400">2 kun oldin kirilgan</p>
                  </div>
                </div>
                <span className="text-gray-400">Yakunlangan</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
