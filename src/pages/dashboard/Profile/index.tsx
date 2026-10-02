
import { useState, type FC, type ChangeEvent } from "react";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
  avatarUrl: string;
}

const STORAGE_KEY = "softcell_user_profile";

const defaultProfile: ProfileData = {
  fullName: "Admin User",
  email: "admin@softcell.uz",
  phone: "+998 90 123 45 67",
  role: "Admin",
  department: "Boshqaruv va IT",
  bio: "Softcell CRM boshqaruvchisi va tizim administratori.",
  avatarUrl: "",
};

const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState<"info" | "security">("info");
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Parol holatlari
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMsg({ text: "Iltimos, barcha maydonlarni to'ldiring", error: true });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ text: "Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak", error: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "Yangi parollar bir-biriga mos kelmadi", error: true });
      return;
    }

    setPasswordMsg({ text: "Parol muvaffaqiyatli yangilandi!", error: false });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMsg(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 p-4 md:p-8">
      {/* Sahifa sarlavhasi */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
          Mening hisobim (My Account)
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Shaxsiy profil ma'lumotlari, xavfsizlik va sozlamalar
        </p>
      </div>

      {/* Profil bosh kartasi (Header Card) - to'liq kenglikda */}
      <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="relative">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-bold tracking-wider">
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "AU"}
              </div>
            )}
            <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-neutral-900">{profile.fullName}</h2>
              <span className="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200">
                {profile.role}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-0.5">{profile.email}</p>
            <p className="text-xs text-neutral-400 mt-1">Bo'lim: {profile.department}</p>
          </div>
        </div>

        {/* Qora rangli rasm yuklash tugmasi */}
        <div>
          <label className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-sm font-medium rounded-xl transition shadow-sm hover:shadow">
            <span>Rasm yuklash</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      {/* Tablar */}
      <div className="flex border-b border-neutral-200 mb-6 gap-8">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === "info"
              ? "text-neutral-900 border-b-2 border-neutral-900"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Shaxsiy ma'lumotlar
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === "security"
              ? "text-neutral-900 border-b-2 border-neutral-900"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Xavfsizlik va Parol
        </button>
      </div>

      {/* Form qismi - To'liq kenglikda */}
      <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {activeTab === "info" ? (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
              Asosiy ma'lumotlar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Ism va familiya *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Email manzil
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed text-sm"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Emailni o'zgartirish faqat tizim egasi orqali amalga oshiriladi
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Telefon raqam
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Lavozim (Rol)
                </label>
                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Qisqacha ma'lumot (Bio)
              </label>
              <textarea
                name="bio"
                rows={3}
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition text-sm"
              ></textarea>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
                Ma'lumotlar muvaffaqiyatli saqlandi!
              </div>
            )}

            {/* Qora rangli saqlash tugmasi */}
            <div className="flex justify-end pt-4 border-t border-neutral-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white font-medium text-sm rounded-xl transition shadow-sm hover:shadow"
              >
                O'zgartirishlarni saqlash
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSavePassword} className="space-y-6 max-w-xl">
            <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
              Parolni yangilash
            </h3>

            {passwordMsg && (
              <div
                className={`p-3 rounded-xl text-sm font-medium border ${
                  passwordMsg.error
                    ? "bg-rose-50 border-rose-200 text-rose-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}
              >
                {passwordMsg.text}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Hozirgi parol *
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Yangi parol *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Yangi parolni tasdiqlang *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 text-sm"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white font-medium text-sm rounded-xl transition shadow-sm hover:shadow"
              >
                Parolni yangilash
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
