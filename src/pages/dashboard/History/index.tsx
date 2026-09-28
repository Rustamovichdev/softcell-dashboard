import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, ArrowUpRight, Wallet, TrendingUp, 
  CreditCard, Sparkles, X, Briefcase, GraduationCap 
} from 'lucide-react';

// ==========================================
// 1. TYPES & INTERFACES (Типы TypeScript)
// ==========================================

export interface PaymentItem {
  id: string;
  sourceTitle: string;
  category: string;
  clientOrGroup: string;
  amount: number;
  date: string;
  time: string;
  method: string;
  status: string;
  description?: string;
}

export interface PaymentFormData {
  sourceTitle: string;
  category: string;
  clientOrGroup: string;
  amount: string;
  date: string;
  time: string;
  method: string;
  description: string;
}

// ==========================================
// 2. MOCK DATA (Boshlang'ich ma'lumotlar)
// ==========================================

const INITIAL_PAYMENTS: PaymentItem[] = [
  {
    id: '1',
    sourceTitle: "E-Commerce Veb-sayt sotildi",
    category: "Project Sale",
    clientOrGroup: "Softcell LLC",
    amount: 15000000,
    date: "2026-09-28",
    time: "14:30",
    method: "Bank Transfer",
    status: "Completed",
    description: "Onlayn do'kon loyihasi topshirildi va to'lov qabul qilindi."
  },
  {
    id: '2',
    sourceTitle: "Front-End React kursi to'lovi",
    category: "Group Fee",
    clientOrGroup: "Front-End #12 Guruh",
    amount: 1200000,
    date: "2026-09-27",
    time: "11:15",
    method: "Click",
    status: "Completed",
    description: "Oktyabr oyi uchun o'quvchi to'lovi."
  },
  {
    id: '3',
    sourceTitle: "Mobil ilova dizayni (UI/UX)",
    category: "Project Sale",
    clientOrGroup: "EduTech Startap",
    amount: 8500000,
    date: "2026-09-25",
    time: "16:45",
    method: "Payme",
    status: "Completed",
    description: "Figma dizayn prototipi topshirildi."
  },
  {
    id: '4',
    sourceTitle: "Matematika kursi to'lovi",
    category: "Group Fee",
    clientOrGroup: "Matematika #04 Guruh",
    amount: 900000,
    date: "2026-09-24",
    time: "09:20",
    method: "Cash",
    status: "Completed",
    description: "Naqd ko'rinishda kassaga topshirildi."
  },
  {
    id: '5',
    sourceTitle: "IT Konsultatsiya xizmati",
    category: "Consulting",
    clientOrGroup: "Akmal Karimov",
    amount: 2000000,
    date: "2026-09-22",
    time: "18:00",
    method: "Click",
    status: "Completed",
    description: "Server va backend arxitekturasi bo'yicha konsultatsiya."
  }
];

// ==========================================
// 3. MAIN COMPONENT (Asosiy Komponent)
// ==========================================

export default function PaymentHistory() {
  const [payments, setPayments] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState<string>('All');

  // Form State
  const [formData, setFormData] = useState<PaymentFormData>({
    sourceTitle: '',
    category: 'Project Sale',
    clientOrGroup: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    method: 'Click',
    description: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dinamik statistika
  const stats = useMemo(() => {
    const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
    const projectIncome = payments
      .filter(p => p.category === 'Project Sale')
      .reduce((sum, p) => sum + p.amount, 0);
    const groupIncome = payments
      .filter(p => p.category === 'Group Fee')
      .reduce((sum, p) => sum + p.amount, 0);

    return { totalIncome, projectIncome, groupIncome, count: payments.length };
  }, [payments]);

  // Saralangan to'lovlar
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = 
        payment.sourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.clientOrGroup.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || payment.category === selectedCategory;
      const matchesMethod = selectedMethod === 'All' || payment.method === selectedMethod;

      return matchesSearch && matchesCategory && matchesMethod;
    });
  }, [payments, searchQuery, selectedCategory, selectedMethod]);

  // Явные типы для событий формы
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.sourceTitle || !formData.amount) {
      return alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
    }

    const newPayment: PaymentItem = {
      id: Date.now().toString(),
      sourceTitle: formData.sourceTitle,
      category: formData.category,
      clientOrGroup: formData.clientOrGroup || "Noma'lum",
      amount: Number(formData.amount),
      date: formData.date,
      time: formData.time,
      method: formData.method,
      status: 'Completed',
      description: formData.description
    };

    setPayments([newPayment, ...payments]);
    setIsModalOpen(false);
    showToast("Yangi tushum muvaffaqiyatli saqlandi! 💰");

    // Formani tozalash
    setFormData({
      sourceTitle: '',
      category: 'Project Sale',
      clientOrGroup: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      method: 'Click',
      description: ''
    });
  };

  // Явный тип для category
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Project Sale':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Briefcase className="w-3 h-3" /> Proekt Sotildi
          </span>
        );
      case 'Group Fee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <GraduationCap className="w-3 h-3" /> Guruh To'lovi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Wallet className="w-3 h-3" /> {category}
          </span>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] h-screen overflow-hidden flex flex-col text-slate-800 p-4 sm:p-6 md:p-8">
      {/* Scrollbar-ni yashirish uchun CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TEPAGI QISM (Fixed Header & Stats) */}
      <div className="shrink-0 space-y-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">To'lovlar Tarixi</h2>
            <p className="text-sm text-slate-500 mt-1">Loyiha sotuvlari va guruhlardan tushgan daromadlar jurnali.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" /> Yangi Tushum Qo'shish
          </button>
        </div>

        {/* Statistika Kartalari */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Tushum</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {stats.totalIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sotilgan Proektlar</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {stats.projectIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guruhlar Tushumi</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {stats.groupIncome.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
              </h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filtrlar va Qidiruv */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Sarlavha yoki mijoz nomi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">Barcha Turkumlar</option>
              <option value="Project Sale">Proekt Sotuvi</option>
              <option value="Group Fee">Guruh To'lovi</option>
              <option value="Consulting">Konsultatsiya</option>
            </select>

            <select 
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">Barcha To'lov Turlari</option>
              <option value="Click">Click</option>
              <option value="Payme">Payme</option>
              <option value="Bank Transfer">Bank O'tkazmasi</option>
              <option value="Cash">Naqd</option>
            </select>
          </div>
        </div>
      </div>

      {/* JADVAL QISMI (No-scrollbar scroll) */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-2xl border border-slate-200 shadow-sm">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Hech qanday to'lov tarixi topilmadi</h3>
            <p className="text-sm text-slate-400 mt-1">Qidiruv yoki filtrlarni o'zgartirib ko'ring.</p>
          </div>
        ) : (
          <div className="min-w-[700px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-xs uppercase font-semibold">
                  <th className="py-4 px-6">Manba / Qayerdan</th>
                  <th className="py-4 px-6">Turkum</th>
                  <th className="py-4 px-6">Mijoz / Guruh</th>
                  <th className="py-4 px-6">To'lov Usuli</th>
                  <th className="py-4 px-6">Sana & Vaqt</th>
                  <th className="py-4 px-6 text-right">Summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredPayments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{item.sourceTitle}</div>
                          {item.description && (
                            <div className="text-xs text-slate-400 font-normal truncate max-w-xs">{item.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getCategoryBadge(item.category)}</td>
                    <td className="py-4 px-6 font-medium text-slate-600">{item.clientOrGroup}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                        {item.method}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      <div>{item.date}</div>
                      <div className="text-slate-400">{item.time}</div>
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-emerald-600">
                      +{item.amount.toLocaleString()} so'm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* YANGI TUSHUM MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Yangi Tushum Qo'shish</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Manba / Qayerdan Keldi? *</label>
                <input 
                  type="text" 
                  name="sourceTitle" 
                  required 
                  value={formData.sourceTitle} 
                  onChange={handleInputChange} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Masalan: CRM Loyihasi sotildi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Turkum</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                    <option value="Project Sale">Proekt Sotuvi</option>
                    <option value="Group Fee">Guruh To'lovi</option>
                    <option value="Consulting">Konsultatsiya</option>
                    <option value="Other">Boshqa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">To'lov Usuli</label>
                  <select name="method" value={formData.method} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                    <option value="Click">Click</option>
                    <option value="Payme">Payme</option>
                    <option value="Bank Transfer">Bank O'tkazmasi</option>
                    <option value="Cash">Naqd</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Mijoz / Guruh Nomi</label>
                  <input 
                    type="text" 
                    name="clientOrGroup" 
                    value={formData.clientOrGroup} 
                    onChange={handleInputChange} 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" 
                    placeholder="Masalan: Softcell LLC"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Summa (so'mda) *</label>
                  <input 
                    type="number" 
                    name="amount" 
                    required 
                    value={formData.amount} 
                    onChange={handleInputChange} 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-emerald-600" 
                    placeholder="1000000"
                  />
                </div>
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

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Izoh (ixtiyoriy)</label>
                <textarea 
                  name="description" 
                  rows={2} 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
                  placeholder="Loyiha yoki to'lov haqida qo'shimcha ma'lumot..."
                />
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-sm font-medium">Bekor qilish</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}