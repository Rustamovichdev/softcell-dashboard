
import { useState, useMemo, type FC } from "react";

interface TargetCampaign {
  id: string;
  name: string;
  platform: "Instagram" | "Facebook" | "Telegram" | "TikTok";
  targetAudience: string; // Masalan: "18-25 yosh, Toshkent, IT va Dasturlash qiziqishi"
  dailyBudget: number;
  totalSpent: number;
  leadsCount: number;
  clicksCount: number;
  status: "Faol" | "Pauzada" | "Tugagan";
  targetUrl: string;
}

const initialTargets: TargetCampaign[] = [
  {
    id: "t1",
    name: "Frontend Pro – Bahorgi qabul uchun target",
    platform: "Instagram",
    targetAudience: "17-26 yosh, Toshkent & Samarqand, Talabalar",
    dailyBudget: 250000,
    totalSpent: 3500000,
    leadsCount: 142,
    clicksCount: 2850,
    status: "Faol",
    targetUrl: "https://softcell.uz/directions/frontend?utm_source=instagram&utm_medium=target_pro",
  },
  {
    id: "t2",
    name: "SAT Matematika – 750+ Ball kafolati",
    platform: "Instagram",
    targetAudience: "15-19 yosh, O'zbekiston, Litsey va maktab o'quvchilari",
    dailyBudget: 200000,
    totalSpent: 2800000,
    leadsCount: 98,
    clicksCount: 1940,
    status: "Faol",
    targetUrl: "https://softcell.uz/directions/sat?utm_source=meta&utm_medium=target_sat",
  },
  {
    id: "t3",
    name: "Backend Node.js & Go – Ishga joylashish kafolati",
    platform: "Facebook",
    targetAudience: "20-30 yosh, Butun O'zbekiston, IT ish qidiruvchilar",
    dailyBudget: 180000,
    totalSpent: 1800000,
    leadsCount: 64,
    clicksCount: 1120,
    status: "Pauzada",
    targetUrl: "https://softcell.uz/directions/backend?utm_source=facebook&utm_medium=target_work",
  },
];

const MarketingPage: FC = () => {
  const [activeTab, setActiveTab] = useState<"target" | "general">("target");
  const [targets, setTargets] = useState<TargetCampaign[]>(() => {
    try {
      const saved = localStorage.getItem("softcell_target_campaigns");
      return saved ? JSON.parse(saved) : initialTargets;
    } catch {
      return initialTargets;
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Yangi target form
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState<TargetCampaign["platform"]>("Instagram");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("200000");

  const saveTargets = (updated: TargetCampaign[]) => {
    setTargets(updated);
    localStorage.setItem("softcell_target_campaigns", JSON.stringify(updated));
  };

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTarget: TargetCampaign = {
      id: Date.now().toString(),
      name,
      platform,
      targetAudience: audience || "O'zbekiston, 18-35 yosh",
      dailyBudget: Number(budget) || 150000,
      totalSpent: 0,
      leadsCount: 0,
      clicksCount: 0,
      status: "Faol",
      targetUrl: `https://softcell.uz/lead?utm_source=${platform.toLowerCase()}&utm_campaign=${encodeURIComponent(
        name.toLowerCase().replace(/\s+/g, "_")
      )}`,
    };

    saveTargets([newTarget, ...targets]);
    setIsModalOpen(false);
    setName("");
    setAudience("");
  };

  const toggleStatus = (id: string) => {
    const updated = targets.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === "Faol" ? ("Pauzada" as const) : ("Faol" as const),
        };
      }
      return t;
    });
    saveTargets(updated);
  };

  const totalLeads = useMemo(() => targets.reduce((acc, t) => acc + t.leadsCount, 0), [targets]);
  const totalBudget = useMemo(() => targets.reduce((acc, t) => acc + t.totalSpent, 0), [targets]);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 p-4 md:p-8">
      {/* Sahifa sarlavhasi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            Marketing va Target boshqaruvi
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Instagram, Meta va Telegram target reklamalari, arizalar va UTM havolalar tahlili
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white font-medium text-sm rounded-xl transition shadow-sm hover:shadow self-start md:self-auto"
        >
          <span>+</span>
          <span>Yangi target reklama yaratish</span>
        </button>
      </div>

      {/* Target Ko'rsatkichlari */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Jami target arizalar</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{totalLeads} ta lid</p>
          <span className="text-xs text-emerald-600 mt-1 block">Konversiya: 5.2%</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Sarflangan byudjet</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">
            {totalBudget.toLocaleString("uz-UZ")} so'm
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">Oxirgi 30 kunda</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Faol targetlar</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            {targets.filter((t) => t.status === "Faol").length} ta
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">Jonli efirda</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">O'rtacha lid narxi</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">
            {totalLeads > 0 ? Math.round(totalBudget / totalLeads).toLocaleString("uz-UZ") : 0} so'm
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">CPL (Cost per Lead)</span>
        </div>
      </div>

      {/* Tablar */}
      <div className="flex border-b border-neutral-200 mb-6 gap-8 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("target")}
          className={`pb-3 transition-all ${
            activeTab === "target"
              ? "text-neutral-900 border-b-2 border-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Target Kampaniyalar (Meta & Instagram)
        </button>
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 transition-all ${
            activeTab === "general"
              ? "text-neutral-900 border-b-2 border-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Umumiy Reklama Kanallari
        </button>
      </div>

      {/* Target jadvali */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase font-semibold text-neutral-700">
              <tr>
                <th className="px-6 py-4">Kampaniya va Platforma</th>
                <th className="px-6 py-4">Auditoriya</th>
                <th className="px-6 py-4">Kunlik byudjet</th>
                <th className="px-6 py-4">Kelgan arizalar (Lid)</th>
                <th className="px-6 py-4">Bosishlar (Clicks)</th>
                <th className="px-6 py-4">Holat</th>
                <th className="px-6 py-4 text-right">Target Linki (UTM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {targets.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-neutral-900">{item.name}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                      {item.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-600 max-w-xs">{item.targetAudience}</td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {item.dailyBudget.toLocaleString("uz-UZ")} so'm/kun
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-neutral-900 text-base">{item.leadsCount}</span>
                    <span className="text-xs text-neutral-400 ml-1">ta lid</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-700">{item.clicksCount.toLocaleString()} marta</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
                        item.status === "Faol"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleCopyLink(item.id, item.targetUrl)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-black text-white transition shadow-xs"
                    >
                      {copiedId === item.id ? "Nusxalandi! ✓" : "Linkni nusxalash"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yangi Target Yaratish Modali */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900">Yangi Target Reklama Qo'shish</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTarget} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Target Reklama Nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Frontend Pro - Instagram Stories reklama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Platforma
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as TargetCampaign["platform"])}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                >
                  <option value="Instagram">Instagram (Stories & Reels)</option>
                  <option value="Facebook">Facebook Feed</option>
                  <option value="Telegram">Telegram Ads</option>
                  <option value="TikTok">TikTok Ads</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Mo'ljallangan Auditoriya
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 18-25 yosh, Toshkent, IT ga qiziqadiganlar"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Kunlik byudjet (so'm)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 text-sm font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white text-sm font-medium rounded-xl transition shadow-sm"
                >
                  Targetni boshlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingPage;
