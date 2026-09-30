
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Platform = "instagram" | "telegram" | "facebook" | "google" | "tiktok";

interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: "active" | "paused" | "completed" | "scheduled";
  budget: number;
  spent: number;
  clicks: number;
  leads: number;
  startDate: string;
  endDate: string;
  trackingLink: string;
}

const STORAGE_KEY = "softcell_marketing_campaigns";

export default function CampaignFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    platform: "instagram" as Platform,
    budget: 100,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    targetAudience: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Unikal UTM kuzatuv havolasi generatsiya qilish
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .slice(0, 20);
    const trackingLink = `https://softcell.uz/reg?src=${formData.platform}&camp=${slug}_${Date.now().toString().slice(-4)}`;

    const newCampaign: Campaign = {
      id: "camp-" + Date.now(),
      name: formData.name,
      platform: formData.platform,
      status: "active",
      budget: Number(formData.budget) || 0,
      spent: 0,
      clicks: 0,
      leads: 0,
      startDate: formData.startDate,
      endDate: formData.endDate || "2026-12-31",
      trackingLink,
    };

    // LocalStorage ga qo'shish
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const list: Campaign[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newCampaign, ...list]));
    } catch {
      // LocalStorage bo'sh bo'lsa
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newCampaign]));
    }

    // Saqlab bo'lgach, marketing jadvaliga qaytish
    navigate("/marketing");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Yuqori navigatsiya va sarlavha */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/marketing")}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
        >
          ← Orqaga
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yangi reklama kampaniyasi</h1>
          <p className="text-sm text-gray-500">
            Target parametrlari va unikal UTM kuzatuv havolasi yaratish.
          </p>
        </div>
      </div>

      {/* Forma */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
            Asosiy parametrlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Kampaniya nomi *
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Frontend Dasturlash — Kuzgi qabul"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Reklama platformasi
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="instagram">Instagram</option>
                <option value="telegram">Telegram</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
                <option value="google">Google Ads</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Ajratilgan byudjet ($) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
            Reklama muddati
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Boshlanish sanasi *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Tugash sanasi
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
            Auditoriya va qo'shimcha ma'lumot
          </h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Maqsadli auditoriya
              </label>
              <input
                type="text"
                placeholder="Masalan: Toshkent shahar, 18-25 yosh, talabalar"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                Izoh yoki banner talablari
              </label>
              <textarea
                rows={3}
                placeholder="Masalan: Story formatidagi video banner bilan joylanadi"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/marketing")}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
          >
            Kampaniyani saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
