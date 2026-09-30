
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Platform = "instagram" | "telegram" | "facebook" | "google" | "tiktok";
type CampaignStatus = "active" | "paused" | "completed" | "scheduled";

interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  spent: number;
  clicks: number;
  leads: number;
  startDate: string;
  endDate: string;
  trackingLink: string;
}

const Icons = {
  Instagram: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Telegram: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Facebook: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  TikTok: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  Google: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  ),
  Copy: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Search: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  DollarSign: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  MousePointer: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="m13 13 6 6" />
    </svg>
  ),
};

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    name: "Frontend Dasturlash — Kuzgi qabul",
    platform: "instagram",
    status: "active",
    budget: 300,
    spent: 195,
    clicks: 1420,
    leads: 78,
    startDate: "2026-09-15",
    endDate: "2026-10-15",
    trackingLink: "https://softcell.uz/reg?src=instagram&camp=frontend_kuz",
  },
  {
    id: "camp-2",
    name: "SMM & Grafik dizayn — Chegirma",
    platform: "telegram",
    status: "active",
    budget: 150,
    spent: 80,
    clicks: 890,
    leads: 42,
    startDate: "2026-09-20",
    endDate: "2026-10-05",
    trackingLink: "https://softcell.uz/reg?src=telegram&camp=smm_sale",
  },
  {
    id: "camp-3",
    name: "Python & Data Science — Masterclass",
    platform: "facebook",
    status: "paused",
    budget: 250,
    spent: 250,
    clicks: 1100,
    leads: 51,
    startDate: "2026-09-01",
    endDate: "2026-09-25",
    trackingLink: "https://softcell.uz/reg?src=facebook&camp=python_mc",
  },
];

const STORAGE_KEY = "softcell_marketing_campaigns";

export default function MarketingPage() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    } catch {
      // ignore
    }
  }, [campaigns]);

  const handleCopyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStatus = (id: string) => {
    setCampaigns(
      campaigns.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: c.status === "active" ? "paused" : "active",
          };
        }
        return c;
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Haqiqatan ham bu kampaniyani o'chirmoqchimisiz?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const avgCpl = totalLeads > 0 ? (totalSpent / totalLeads).toFixed(2) : "0.00";

  const filteredCampaigns = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchPlatform = platformFilter === "all" || c.platform === platformFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchPlatform && matchStatus;
  });

  const getPlatformBadge = (platform: Platform) => {
    switch (platform) {
      case "instagram":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">
            <Icons.Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram
          </span>
        );
      case "telegram":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
            <Icons.Telegram className="w-3.5 h-3.5 text-sky-600" /> Telegram
          </span>
        );
      case "facebook":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Icons.Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook
          </span>
        );
      case "tiktok":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-900 text-gray-100 border border-gray-800">
            <Icons.TikTok className="w-3.5 h-3.5 text-white" /> TikTok
          </span>
        );
      case "google":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Icons.Google className="w-3.5 h-3.5 text-amber-600" /> Google Ads
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Sarlavha va Yangi sahifaga o'tkazuvchi tugma */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing & Target</h1>
          <p className="text-sm text-gray-500 mt-1">
            Reklama kampaniyalari, maxsus kuzatuv havolalari (UTM) va lidlar tahlili.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/marketing/new")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
        >
          <span className="text-base font-bold">+</span> Yangi reklama qo'shish
        </button>
      </div>

      {/* 4 ta Statistika kartochkasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-xs font-semibold uppercase tracking-wider">Jami byudjet / Sarf</p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Icons.DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${totalSpent} <span className="text-xs font-normal text-gray-400">/ ${totalBudget}</span>
          </p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (totalSpent / (totalBudget || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-xs font-semibold uppercase tracking-wider">Kelgan Lidlar</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Icons.Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{totalLeads} ta</p>
          <p className="text-xs text-gray-400 mt-1">Saytga qoldirilgan anketalar</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-xs font-semibold uppercase tracking-wider">1 ta lid narxi (CPL)</p>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Icons.TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">${avgCpl}</p>
          <p className="text-xs text-gray-400 mt-1">Har bir o'quvchi tannarxi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-xs font-semibold uppercase tracking-wider">Jami Bosishlar (Clicks)</p>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Icons.MousePointer className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalClicks.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Havola orqali o'tganlar</p>
        </div>
      </div>

      {/* Qidiruv va Filterlar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Kampaniya nomini qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <Icons.Search className="w-4 h-4" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="all">Barcha platformalar</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
            <option value="google">Google Ads</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="all">Barcha holatlar</option>
            <option value="active">Faol</option>
            <option value="paused">To'xtatilgan</option>
          </select>
        </div>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4">Kampaniya nomi</th>
                <th className="py-3.5 px-4">Platforma</th>
                <th className="py-3.5 px-4">Kuzatuv havolasi (UTM link)</th>
                <th className="py-3.5 px-4">Byudjet / Sarf</th>
                <th className="py-3.5 px-4">Bosishlar</th>
                <th className="py-3.5 px-4">Lidlar</th>
                <th className="py-3.5 px-4">1 lid (CPL)</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-400">
                    Reklama kampaniyalari topilmadi.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => {
                  const cpl = camp.leads > 0 ? (camp.spent / camp.leads).toFixed(2) : "0.00";
                  return (
                    <tr key={camp.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {camp.name}
                        <p className="text-xs font-normal text-gray-400 mt-0.5">
                          {camp.startDate} — {camp.endDate}
                        </p>
                      </td>
                      <td className="py-4 px-4">{getPlatformBadge(camp.platform)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200 max-w-[200px] truncate font-mono">
                            {camp.trackingLink}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyLink(camp.id, camp.trackingLink)}
                            className="inline-flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded-lg text-gray-600 transition"
                            title="Havolani nusxalash"
                          >
                            {copiedId === camp.id ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                <Icons.Check className="w-3.5 h-3.5" /> Nusxalandi
                              </span>
                            ) : (
                              <Icons.Copy className="w-3.5 h-3.5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">
                        ${camp.spent} <span className="text-xs text-gray-400 font-normal">/ ${camp.budget}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">{camp.clicks.toLocaleString()}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-600">{camp.leads} ta</td>
                      <td className="py-4 px-4 font-medium text-gray-900">${cpl}</td>
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => toggleStatus(camp.id)}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                            camp.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              camp.status === "active" ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          {camp.status === "active" ? "Faol" : "To'xtatilgan"}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(camp.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="O'chirish"
                        >
                          <Icons.Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
