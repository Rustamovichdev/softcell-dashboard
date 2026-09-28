
import { useState, useEffect } from "react";
import type { FC, FormEvent } from "react";

export type DirectionStatus = "active" | "inactive";
export type CourseLevel = "Boshlang'ich" | "O'rta" | "Murakkab" | "Barchaga";
export type CourseFormat = "Oflayn" | "Onlayn" | "Gibrid";

export interface Direction {
  id: string;
  name: string;
  category: string; // Kategoriya: Dasturlash, Dizayn, va h.k.
  description: string;
  durationMonths: number;
  lessonHoursPerWeek: number; // Haftalik dars soati
  format: CourseFormat;
  level: CourseLevel;
  monthlyPrice: number;
  fullPriceDiscount?: number; // Bir yo'la to'lasa chegirma (%)
  technologies: string[]; // Masalan: ["React", "TypeScript", "Next.js"]
  groupsCount: number;
  studentsCount: number;
  mentorsCount: number;
  status: DirectionStatus;
  createdAt: string;
}

const INITIAL_DIRECTIONS: Direction[] = [
  {
    id: "1",
    name: "Frontend Dasturlash",
    category: "Dasturlash",
    description: "Veb-saytlar va murakkab veb-ilovalarning foydalanuvchi interfeysini noldan professional darajagacha yaratish.",
    durationMonths: 8,
    lessonHoursPerWeek: 6,
    format: "Gibrid",
    level: "Boshlang'ich",
    monthlyPrice: 1200000,
    fullPriceDiscount: 10,
    technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    groupsCount: 6,
    studentsCount: 78,
    mentorsCount: 3,
    status: "active",
    createdAt: "2025-09-01",
  },
  {
    id: "2",
    name: "Backend Dasturlash (Node.js & Python)",
    category: "Dasturlash",
    description: "Serverlar, API arxitekturasi, ma'lumotlar bazalari va xavfsiz backend tizimlarini ishlab chiqish.",
    durationMonths: 9,
    lessonHoursPerWeek: 6,
    format: "Oflayn",
    level: "O'rta",
    monthlyPrice: 1400000,
    fullPriceDiscount: 15,
    technologies: ["Node.js", "NestJS", "Python", "PostgreSQL", "Redis", "Docker"],
    groupsCount: 4,
    studentsCount: 52,
    mentorsCount: 2,
    status: "active",
    createdAt: "2025-09-10",
  },
  {
    id: "3",
    name: "Grafik Dizayn va UI/UX",
    category: "Dizayn",
    description: "Brending, tipografika hamda mobil va veb-interfeyslar uchun zamonaviy prototiplar chizish.",
    durationMonths: 6,
    lessonHoursPerWeek: 4,
    format: "Gibrid",
    level: "Boshlang'ich",
    monthlyPrice: 1000000,
    fullPriceDiscount: 5,
    technologies: ["Figma", "Photoshop", "Illustrator", "Prototyping"],
    groupsCount: 5,
    studentsCount: 60,
    mentorsCount: 2,
    status: "active",
    createdAt: "2025-10-05",
  },
  {
    id: "4",
    name: "Foundation IT Savodxonlik",
    category: "Boshlang'ich",
    description: "Kompyuter arxitekturasi, mantiqiy fikrlash, algoritmlar va C dasturlash tili asoslari.",
    durationMonths: 3,
    lessonHoursPerWeek: 4,
    format: "Oflayn",
    level: "Boshlang'ich",
    monthlyPrice: 800000,
    fullPriceDiscount: 0,
    technologies: ["C", "Algorithms", "Git", "Computer Science"],
    groupsCount: 8,
    studentsCount: 110,
    mentorsCount: 4,
    status: "active",
    createdAt: "2025-11-12",
  },
  {
    id: "5",
    name: "Android & iOS (Flutter)",
    category: "Mobil",
    description: "Flutter freymvorki yordamida ikkala platforma uchun bitta kod bazasida mobil ilovalar yaratish.",
    durationMonths: 7,
    lessonHoursPerWeek: 6,
    format: "Onlayn",
    level: "O'rta",
    monthlyPrice: 1300000,
    fullPriceDiscount: 10,
    technologies: ["Dart", "Flutter", "REST API", "Bloc"],
    groupsCount: 2,
    studentsCount: 24,
    mentorsCount: 1,
    status: "inactive",
    createdAt: "2025-12-01",
  },
];

const CATEGORIES = ["Barchasi", "Dasturlash", "Dizayn", "Mobil", "Boshlang'ich"];

const Directions: FC = () => {
  const [directions, setDirections] = useState<Direction[]>(() => {
    const saved = localStorage.getItem("softcell_directions_v2");
    return saved ? JSON.parse(saved) : INITIAL_DIRECTIONS;
  });

  useEffect(() => {
    localStorage.setItem("softcell_directions_v2", JSON.stringify(directions));
  }, [directions]);

  // Filtrlar
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Barchasi");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modallar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<Direction | null>(null);
  const [editingItem, setEditingItem] = useState<Direction | null>(null);
  const [deletingItem, setDeletingItem] = useState<Direction | null>(null);

  // Form maydonlari
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Dasturlash");
  const [formDescription, setFormDescription] = useState("");
  const [formDuration, setFormDuration] = useState(6);
  const [formHours, setFormHours] = useState(6);
  const [formPrice, setFormPrice] = useState(1200000);
  const [formDiscount, setFormDiscount] = useState(10);
  const [formFormat, setFormFormat] = useState<CourseFormat>("Gibrid");
  const [formLevel, setFormLevel] = useState<CourseLevel>("Boshlang'ich");
  const [formStatus, setFormStatus] = useState<DirectionStatus>("active");
  const [formTechs, setFormTechs] = useState("");
  const [formError, setFormError] = useState("");

  // Qidiruv va saralash
  const filteredDirections = directions.filter((item) => {
    const query = search.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.technologies.some((t) => t.toLowerCase().includes(query));

    const matchesCategory =
      categoryFilter === "Barchasi" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // KPI ko'rsatkichlari
  const totalDirections = directions.length;
  const activeDirections = directions.filter((d) => d.status === "active").length;
  const totalStudents = directions.reduce((a, b) => a + b.studentsCount, 0);
  const totalGroups = directions.reduce((a, b) => a + b.groupsCount, 0);

  // Modalni ochish (Yangi)
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory("Dasturlash");
    setFormDescription("");
    setFormDuration(6);
    setFormHours(6);
    setFormPrice(1200000);
    setFormDiscount(10);
    setFormFormat("Gibrid");
    setFormLevel("Boshlang'ich");
    setFormStatus("active");
    setFormTechs("React, TypeScript, CSS");
    setFormError("");
    setIsModalOpen(true);
  };

  // Modalni ochish (Tahrirlash)
  const handleOpenEdit = (item: Direction) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormDuration(item.durationMonths);
    setFormHours(item.lessonHoursPerWeek);
    setFormPrice(item.monthlyPrice);
    setFormDiscount(item.fullPriceDiscount || 0);
    setFormFormat(item.format);
    setFormLevel(item.level);
    setFormStatus(item.status);
    setFormTechs(item.technologies.join(", "));
    setFormError("");
    setIsModalOpen(true);
  };

  // Saqlash
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError("Yo'nalish nomini kiritish majburiy!");
      return;
    }

    const techArray = formTechs
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingItem) {
      setDirections((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formName.trim(),
                category: formCategory,
                description: formDescription.trim(),
                durationMonths: Number(formDuration) || 1,
                lessonHoursPerWeek: Number(formHours) || 1,
                monthlyPrice: Number(formPrice) || 0,
                fullPriceDiscount: Number(formDiscount) || 0,
                format: formFormat,
                level: formLevel,
                status: formStatus,
                technologies: techArray,
              }
            : item
        )
      );
    } else {
      const newItem: Direction = {
        id: String(Date.now()),
        name: formName.trim(),
        category: formCategory,
        description: formDescription.trim(),
        durationMonths: Number(formDuration) || 1,
        lessonHoursPerWeek: Number(formHours) || 1,
        monthlyPrice: Number(formPrice) || 0,
        fullPriceDiscount: Number(formDiscount) || 0,
        format: formFormat,
        level: formLevel,
        status: formStatus,
        technologies: techArray,
        groupsCount: 0,
        studentsCount: 0,
        mentorsCount: 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDirections((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  // O'chirish
  const handleDelete = () => {
    if (!deletingItem) return;
    setDirections((prev) => prev.filter((i) => i.id !== deletingItem.id));
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50/40 min-h-screen">
      {/* 1. Sarlavha va Qo'shish tugmasi */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Yo'nalishlar (Directions)
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            O'quv markazidagi mutaxassisliklar, kurs narxlari, davomiyligi va o'rgatiladigan texnologiyalar
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <span className="text-lg leading-none">+</span> Yangi yo'nalish qo'shish
        </button>
      </div>

      {/* 2. Statistika paneli (KPI) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Jami yo'nalishlar</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{totalDirections} ta</p>
          <span className="text-xs text-green-600 font-medium">Barcha sohalar</span>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Faol yo'nalishlar</p>
          <p className="mt-2 text-2xl font-bold text-green-600">{activeDirections} ta</p>
          <span className="text-xs text-gray-500">Qabul ochiq</span>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-gray-500 uppercase">Guruhlar soni</p>
          <p className="mt-2 text-2xl font-bold text-indigo-600">{totalGroups} ta</p>
          <span className="text-xs text-gray-500">Hozirda o'qiyotgan</span>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-gray-500 uppercase">O'quvchilar soni</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">{totalStudents} nafar</p>
          <span className="text-xs text-gray-500">Jami qamrov</span>
        </div>
      </div>

      {/* 3. Kategoriya teglari va Qidiruv filtrlari */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        {/* Kategoriya tablari */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
          <span className="text-xs font-semibold text-gray-400 mr-2">Soha:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                categoryFilter === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Qidiruv, Holat va Ko'rinish turi */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Yo'nalish yoki texnologiya (masalan: React) bo'yicha qidirish..."
              className="w-full sm:max-w-md rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
            >
              <option value="all">Barcha holatlar</option>
              <option value="active">Faqat Faol (qabul ochiq)</option>
              <option value="inactive">Faqat Nofaol</option>
            </select>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "grid" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"
              }`}
            >
              Kartalar
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "table" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500"
              }`}
            >
              Jadval
            </button>
          </div>
        </div>
      </div>

      {/* 4. Asosiy Kontent (Kartalar yoki Jadval) */}
      {filteredDirections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-base font-semibold text-gray-900">Yo'nalish topilmadi</p>
          <p className="mt-1 text-sm text-gray-500">Qidiruv so'zini tekshiring yoki yangi yo'nalish qo'shing.</p>
        </div>
      ) : viewMode === "grid" ? (
        /* KARTALAR REJIMI */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredDirections.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:shadow-md transition"
            >
              <div>
                {/* Teglar va Holat */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {item.format}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status === "active" ? "Faol" : "Nofaol"}
                    </span>
                  </div>
                </div>

                {/* Sarlavha va Tavsif */}
                <h3 className="mt-3 text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="mt-1.5 text-xs text-gray-600 line-clamp-2">{item.description}</p>

                {/* O'rganiladigan texnologiyalar */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 4 && (
                    <span className="text-[11px] font-medium text-gray-400 self-center">
                      +{item.technologies.length - 4} yana
                    </span>
                  )}
                </div>

                {/* Narx va Davomiylik tafsilotlari */}
                <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Oylik to'lov:</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {item.monthlyPrice.toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Davomiyligi:</span>
                    <span className="font-medium">{item.durationMonths} oy ({item.lessonHoursPerWeek} soat/hafta)</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Guruh va Talabalar:</span>
                    <span className="font-medium text-indigo-600">
                      {item.groupsCount} ta guruh / {item.studentsCount} ta o'quvchi
                    </span>
                  </div>
                </div>
              </div>

              {/* Pastki tugmalar */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <button
                  onClick={() => setDetailItem(item)}
                  className="text-xs font-semibold text-gray-600 hover:text-indigo-600"
                >
                  Batafsil ma'lumot
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => setDeletingItem(item)}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* JADVAL REJIMI */
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3.5">Yo'nalish</th>
                  <th className="px-6 py-3.5">Soha</th>
                  <th className="px-6 py-3.5">Oylik to'lov</th>
                  <th className="px-6 py-3.5">Davomiylik</th>
                  <th className="px-6 py-3.5">Guruh / Talabalar</th>
                  <th className="px-6 py-3.5">Holati</th>
                  <th className="px-6 py-3.5 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDirections.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.format} • {item.level}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.monthlyPrice.toLocaleString()} so'm
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {item.durationMonths} oy ({item.lessonHoursPerWeek} soat/h)
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="font-semibold text-indigo-600">{item.groupsCount} ta</span> guruh /{" "}
                      <span className="font-semibold text-purple-600">{item.studentsCount} ta</span> talaba
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status === "active" ? "Faol" : "Nofaol"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setDetailItem(item)}
                        className="mr-2 text-xs font-medium text-gray-600 hover:text-indigo-600"
                      >
                        Ko'rish
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="mr-2 text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => setDeletingItem(item)}
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Qo'shish va Tahrirlash Modali */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? "Yo'nalishni tahrirlash" : "Yangi yo'nalish qo'shish"}
            </h2>
            {formError && <p className="mt-2 text-xs font-semibold text-red-500">{formError}</p>}

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Yo'nalish nomi *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Masalan: Frontend Dasturlash"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Soha / Kategoriya</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
                  >
                    <option value="Dasturlash">Dasturlash</option>
                    <option value="Dizayn">Dizayn</option>
                    <option value="Mobil">Mobil dasturlash</option>
                    <option value="Boshlang'ich">Boshlang'ich IT</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Tavsifi</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Yo'nalish haqida qisqacha ma'lumot..."
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">
                  O'rganiladigan texnologiyalar (vergul bilan ajrating)
                </label>
                <input
                  type="text"
                  value={formTechs}
                  onChange={(e) => setFormTechs(e.target.value)}
                  placeholder="Masalan: HTML, CSS, JavaScript, React, Next.js"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Davomiyligi (oy)</label>
                  <input
                    type="number"
                    min={1}
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-sm outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Haftalik soat</label>
                  <input
                    type="number"
                    min={1}
                    value={formHours}
                    onChange={(e) => setFormHours(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-sm outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Oylik to'lov (so'm)</label>
                  <input
                    type="number"
                    step={50000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-sm outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Chegirma (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-sm outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Dars formati</label>
                  <select
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value as CourseFormat)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-2 text-sm outline-none"
                  >
                    <option value="Oflayn">Oflayn</option>
                    <option value="Onlayn">Onlayn</option>
                    <option value="Gibrid">Gibrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Daraja (Level)</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as CourseLevel)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-2 text-sm outline-none"
                  >
                    <option value="Boshlang'ich">Boshlang'ich</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Murakkab">Murakkab</option>
                    <option value="Barchaga">Barchaga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Holati</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as DirectionStatus)}
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-2 text-sm outline-none"
                  >
                    <option value="active">Faol (qabul ochiq)</option>
                    <option value="inactive">Nofaol (to'xtatilgan)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Batafsil ko'rish Modali (Detail View) */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-xs font-semibold uppercase text-indigo-600">{detailItem.category}</span>
                <h2 className="text-xl font-bold text-gray-900">{detailItem.name}</h2>
              </div>
              <button
                onClick={() => setDetailItem(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">{detailItem.description}</p>

            <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Oylik to'lov:</span>
                <strong className="text-gray-900">{detailItem.monthlyPrice.toLocaleString()} so'm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Davomiyligi:</span>
                <span className="font-medium text-gray-800">{detailItem.durationMonths} oy ({detailItem.lessonHoursPerWeek} soat/hafta)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Format va Daraja:</span>
                <span className="font-medium text-gray-800">{detailItem.format} • {detailItem.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mavjud guruhlar soni:</span>
                <span className="font-bold text-indigo-600">{detailItem.groupsCount} ta guruh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">O'qiyotgan talabalar:</span>
                <span className="font-bold text-purple-600">{detailItem.studentsCount} nafar</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-700">Texnologiyalar ro'yxati:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {detailItem.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDetailItem(null)}
                className="rounded-xl bg-gray-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. O'chirish Modali */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-bold text-gray-900">O'chirishni tasdiqlang</h3>
            <p className="mt-2 text-sm text-gray-600">
              "{deletingItem.name}" yo'nalishini o'chirib tashlamoqchimisiz?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeletingItem(null)}
                className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Yo'q
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directions;
