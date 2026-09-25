import { useState, useMemo } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  Search, Plus, Calendar, List, Clock, Video, 
  Trash2, Edit3, ExternalLink, Sparkles, Copy, Wand2, Link2, X
} from 'lucide-react';
import type { Meet, MeetFormData, ViewMode } from './types';
const GROUPS: string[] = [
  "Front-End", 
  "Matematika", 
  "Ingliz tili", 
  "Mobilografiya", 
  "Foundation", 
  "Back-End"
];

const INITIAL_MEETS: Meet[] = [
  {
    id: '1',
    title: "Front-End - React Hooks va State Management Q&A",
    group: "Front-End",
    date: "2026-09-24",
    time: "15:00",
    duration: "60",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
    status: "Upcoming",
    description: "React Context API va Redux Toolkit bo'yicha amaliy dars."
  },
  {
    id: '2',
    title: "Matematika - Geometriya masalalari tahlili",
    group: "Matematika",
    date: "2026-09-23",
    time: "17:30",
    duration: "45",
    platform: "Softcell Live",
    link: "https://softcell.uz/meet/math-9201",
    status: "Live",
    description: "Geometriya shakllari yuzalarini hisoblash bo'yicha jonli dars."
  },
  {
    id: '3',
    title: "Ingliz tili - Speaking Practice (IELTS B2+)",
    group: "Ingliz tili",
    date: "2026-09-25",
    time: "18:00",
    duration: "60",
    platform: "Zoom",
    link: "https://zoom.us/j/9876543210",
    status: "Upcoming",
    description: "IELTS Part 2 va Part 3 bo'yicha guruhda muloqot mashg'uloti."
  },
  {
    id: '4',
    title: "Mobilografiya - Mobil Videomontaj va CapCut sirlari",
    group: "Mobilografiya",
    date: "2026-09-26",
    time: "19:00",
    duration: "90",
    platform: "Google Meet",
    link: "https://meet.google.com/mob-cam-edit",
    status: "Upcoming",
    description: "Smartfonda sifatli video olish va montaj qilish usullari."
  },
  {
    id: '5',
    title: "Foundation - Dasturlashga kirish va Mantiqiy fikrlash",
    group: "Foundation",
    date: "2026-09-24",
    time: "14:00",
    duration: "60",
    platform: "Softcell Live",
    link: "https://softcell.uz/meet/foundation-01",
    status: "Upcoming",
    description: "Algoritmlar va o'zgaruvchilar tushunchasi."
  },
  {
    id: '6',
    title: "Back-End - Node.js va REST API arxitekturasi",
    group: "Back-End",
    date: "2026-09-27",
    time: "20:00",
    duration: "60",
    platform: "Google Meet",
    link: "https://meet.google.com/backend-api-dev",
    status: "Upcoming",
    description: "Express.js ramkasida server xizmatlarini yaratish."
  }
];

export default function Meets() {
  const [meets, setMeets] = useState<Meet[]>(INITIAL_MEETS);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingMeetId, setEditingMeetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('All');

  const [formData, setFormData] = useState<MeetFormData>({
    title: '',
    group: GROUPS[0],
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    duration: '60',
    platform: 'Google Meet',
    link: '',
    description: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast("Uchrashuv havolasi nusxalandi! 📋");
  };

  const generateAutoLink = (platformType: string, groupName: string = formData.group): string => {
    const code = Math.random().toString(36).substring(2, 7);
    const cleanGroup = groupName.toLowerCase().replace(/[^a-z0-9]/g, '');
    switch (platformType) {
      case 'Google Meet':
        return `https://meet.google.com/${cleanGroup}-${code}`;
      case 'Zoom':
        return `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      default:
        return `https://softcell.uz/meet/${cleanGroup}-${code}`;
    }
  };

  const filteredMeets = useMemo(() => {
    return meets.filter(meet => {
      const matchesSearch = meet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            meet.group.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroupFilter === 'All' || meet.group === selectedGroupFilter;
      return matchesSearch && matchesGroup;
    });
  }, [meets, searchQuery, selectedGroupFilter]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenCreateModal = () => {
    setEditingMeetId(null);
    const platform = 'Google Meet';
    setFormData({
      title: '',
      group: GROUPS[0],
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      duration: '60',
      platform,
      link: generateAutoLink(platform, GROUPS[0]),
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (meet: Meet) => {
    setEditingMeetId(meet.id);
    setFormData({
      title: meet.title,
      group: meet.group,
      date: meet.date,
      time: meet.time,
      duration: meet.duration,
      platform: meet.platform,
      link: meet.link,
      description: meet.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveMeet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title) return alert("Iltimos, uchrashuv nomini kiriting!");

    const finalLink = formData.link || generateAutoLink(formData.platform);

    if (editingMeetId) {
      setMeets(meets.map(m => m.id === editingMeetId ? { ...m, ...formData, link: finalLink } : m));
      showToast("Uchrashuv yangilandi! ✏️");
    } else {
      const newMeet: Meet = { 
        id: Date.now().toString(), 
        ...formData, 
        link: finalLink, 
        status: 'Upcoming' 
      };
      setMeets([newMeet, ...meets]);
      showToast("Yangi uchrashuv yaratildi! 🚀");
    }
    setIsModalOpen(false);
  };

  const handleDeleteMeet = (id: string) => {
    if (window.confirm("Haqiqatan ham ushbu uchrashuvni o'chirmoqchimisiz?")) {
      setMeets(meets.filter(m => m.id !== id));
      showToast("Uchrashuv o'chirildi!");
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen text-slate-800 p-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Meets (Uchrashuvlar)</h2>
          <p className="text-sm text-slate-500 mt-1">Guruhlar uchun onlayn darslar linklarini yaratish va boshqarish.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yangi uchrashuv yaratish
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ssilka yoki uchrashuv nomi..." 
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
            />
          </div>

          <select 
            value={selectedGroupFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedGroupFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium"
          >
            <option value="All">Barcha guruhlar</option>
            {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <List className="w-4 h-4" /> Ro'yxat
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md ${
              viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Calendar className="w-4 h-4" /> Kalendar
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredMeets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Uchrashuvlar topilmadi</h3>
            </div>
          ) : (
            filteredMeets.map((meet) => (
              <div key={meet.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    {meet.status === 'Live' ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">Jonli 🔴</span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Kutilmoqda</span>
                    )}
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">{meet.group}</span>
                    <span className="text-xs text-slate-400 font-medium">• {meet.platform}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{meet.title}</h3>

                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl max-w-xl">
                    <Link2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="text-xs font-mono text-slate-700 truncate flex-1">{meet.link}</span>
                    <button
                      onClick={() => handleCopyLink(meet.link)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-white text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 hover:bg-indigo-50 transition-colors"
                    >
                      <Copy className="w-3 h-3" /> Nusxalash
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{meet.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{meet.time} ({meet.duration} min)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={meet.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Kirish
                  </a>
                  <button onClick={() => handleOpenEditModal(meet)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteMeet(meet.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Darslar Taqvimi</h3>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
            <div>DUSH</div><div>SESH</div><div>CHOR</div><div>PAYS</div><div>JUM</div><div>SHAN</div><div>YAK</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="min-h-[80px] bg-slate-50 border border-slate-100 p-2 rounded-xl text-xs font-bold text-slate-500">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-bold">{editingMeetId ? "Uchrashuvni Tahrirlash" : "Yangi Uchrashuv Yaratish"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveMeet} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mavzu *</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Masalan: React Hooks darsi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Guruh</label>
                  <select name="group" value={formData.group} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                    {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Platforma</label>
                  <select name="platform" value={formData.platform} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Softcell Live">Softcell Live</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-600">Havola (Link) *</label>
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({ ...p, link: generateAutoLink(p.platform, p.group) }))}
                    className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Wand2 className="w-3 h-3" /> Avto-yaratish
                  </button>
                </div>
                <input 
                  type="url" 
                  name="link" 
                  required 
                  value={formData.link} 
                  onChange={handleInputChange} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sana</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Vaqt</label>
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-sm font-medium">Bekor qilish</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}