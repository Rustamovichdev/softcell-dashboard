
import { useState, useMemo, type FC } from "react";

interface Direction {
  id: string;
  title: string;
  category: "Dasturlash" | "Dizayn" | "Mobil" | "Boshlang'ich" | "Aniq fanlar";
  description: string;
  technologies: string[];
  monthlyPrice: number;
  durationMonths: number;
  weeklyHours: number;
  groupsCount: number;
  studentsCount: number;
  format: "Gibrid" | "Oflayn" | "Onlayn";
  status: "Faol" | "Yopiq";
}

const AVAILABLE_TECH_SUGGESTIONS = [
  "React",
  "React Native",
  "Redux Toolkit",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "Express.js",
  "Python",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "Go (Golang)",
  "Figma",
  "Photoshop",
  "Illustrator",
  "UI/UX Prototyping",
  "SAT Math",
  "Algebra",
  "Geometry",
  "Calculus",
  "Data Analysis",
  "Machine Learning",
  "Network Security",
  "Linux Admin",
];

const initialDirections: Direction[] = [
  {
    id: "1",
    title: "Frontend Pro (Intensiv)",
    category: "Dasturlash",
    description: "Zamonaviy veb-ilovalarni noldan professional darajada arxitektura qilish va optimallashtirish.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit"],
    monthlyPrice: 1500000,
    durationMonths: 7,
    weeklyHours: 16,
    groupsCount: 5,
    studentsCount: 65,
    format: "Gibrid",
    status: "Faol",
  },
  {
    id: "2",
    title: "Backend Pro (Node.js & Go)",
    category: "Dasturlash",
    description: "Yuqori yuklamali serverlar, mikroservislar va ma'lumotlar bazalari arxitekturasi.",
    technologies: ["Node.js", "NestJS", "Go (Golang)", "PostgreSQL", "Docker"],
    monthlyPrice: 1600000,
    durationMonths: 8,
    weeklyHours: 14,
    groupsCount: 4,
    studentsCount: 50,
    format: "Oflayn",
    status: "Faol",
  },
  {
    id: "3",
    title: "SAT Matematika (Advanced)",
    category: "Aniq fanlar",
    description: "Xalqaro universitetlarga kirish uchun SAT Math bo'yicha 750+ ball kafolati bilan tayyorlov.",
    technologies: ["SAT Math", "Algebra", "Geometry", "Calculus"],
    monthlyPrice: 1200000,
    durationMonths: 5,
    weeklyHours: 10,
    groupsCount: 6,
    studentsCount: 82,
    format: "Oflayn",
    status: "Faol",
  },
  {
    id: "4",
    title: "Grafik Dizayn va UI/UX",
    category: "Dizayn",
    description: "Brending, tipografika, mobil va veb-interfeyslar uchun zamonaviy prototiplar chizish.",
    technologies: ["Figma", "Photoshop", "Illustrator", "UI/UX Prototyping"],
    monthlyPrice: 1000000,
    durationMonths: 6,
    weeklyHours: 8,
    groupsCount: 5,
    studentsCount: 60,
    format: "Gibrid",
    status: "Faol",
  },
  {
    id: "5",
    title: "Data Science & AI",
    category: "Dasturlash",
    description: "Katta ma'lumotlar tahlili, Machine Learning va sun'iy intellekt modellarini o'rgatish.",
    technologies: ["Python", "Data Analysis", "Machine Learning", "PostgreSQL"],
    monthlyPrice: 1800000,
    durationMonths: 9,
    weeklyHours: 12,
    groupsCount: 3,
    studentsCount: 35,
    format: "Gibrid",
    status: "Faol",
  },
  {
    id: "6",
    title: "IT Foundation (Boshlang'ich)",
    category: "Boshlang'ich",
    description: "Kompyuter savodxonligi, mantiqiy fikrlash va dasturlashga ilk mustahkam qadamlar.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    monthlyPrice: 700000,
    durationMonths: 3,
    weeklyHours: 6,
    groupsCount: 8,
    studentsCount: 110,
    format: "Oflayn",
    status: "Faol",
  },
];

const DirectionsPage: FC = () => {
  const [directions, setDirections] = useState<Direction[]>(() => {
    try {
      const saved = localStorage.getItem("softcell_directions_list");
      return saved ? JSON.parse(saved) : initialDirections;
    } catch {
      return initialDirections;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [selectedStatus, setSelectedStatus] = useState<string>("Barcha holatlar");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Yangi qo'shish modal holati
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Direction["category"]>("Dasturlash");
  const [newDescription, setNewDescription] = useState("");
  const [newMonthlyPrice, setNewMonthlyPrice] = useState("1200000");
  const [newDuration, setNewDuration] = useState("6");
  const [newWeeklyHours, setNewWeeklyHours] = useState("8");
  const [newFormat, setNewFormat] = useState<Direction["format"]>("Gibrid");

  // Texnologiyalar inputi va tavsiyalar
  const [techInput, setTechInput] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["React", "TypeScript"]);

  const saveDirections = (updated: Direction[]) => {
    setDirections(updated);
    localStorage.setItem("softcell_directions_list", JSON.stringify(updated));
  };

  // Filtrlar
  const filteredDirections = useMemo(() => {
    return directions.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.technologies.some((t) => t.toLowerCase().includes(query));

      const matchesCat =
        selectedCategory === "Barchasi" || item.category === selectedCategory;

      const matchesStat =
        selectedStatus === "Barcha holatlar" || item.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStat;
    });
  }, [directions, searchQuery, selectedCategory, selectedStatus]);

  // Texnologiyalar avtomatik taklifi (suggestions)
  const techSuggestions = useMemo(() => {
    if (!techInput.trim()) return [];
    const query = techInput.toLowerCase();
    return AVAILABLE_TECH_SUGGESTIONS.filter(
      (tech) =>
        tech.toLowerCase().includes(query) && !selectedTechs.includes(tech)
    );
  }, [techInput, selectedTechs]);

  const addTechTag = (tech: string) => {
    if (!selectedTechs.includes(tech)) {
      setSelectedTechs([...selectedTechs, tech]);
    }
    setTechInput("");
  };

  const removeTechTag = (techToRemove: string) => {
    setSelectedTechs(selectedTechs.filter((t) => t !== techToRemove));
  };

  const handleCreateDirection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDir: Direction = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      description: newDescription || "Kurs haqida batafsil ma'lumot kiritilmagan.",
      technologies: selectedTechs.length ? selectedTechs : ["Boshlang'ich"],
      monthlyPrice: Number(newMonthlyPrice) || 1000000,
      durationMonths: Number(newDuration) || 6,
      weeklyHours: Number(newWeeklyHours) || 8,
      groupsCount: 1,
      studentsCount: 15,
      format: newFormat,
      status: "Faol",
    };

    saveDirections([newDir, ...directions]);
    setIsModalOpen(false);

    // Formani tozalash
    setNewTitle("");
    setNewDescription("");
    setSelectedTechs(["React", "TypeScript"]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Rostdan ham ushbu yo'nalishni o'chirmoqchimisiz?")) {
      saveDirections(directions.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 p-4 md:p-8">
      {/* Yuqori qism */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            Yo'nalishlar (Directions)
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            O'quv markazidagi mutaxassisliklar, kurs narxlari, davomiyligi va texnologiyalar
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white font-medium text-sm rounded-xl transition shadow-sm hover:shadow self-start md:self-auto"
        >
          <span>+</span>
          <span>Yangi yo'nalish qo'shish</span>
        </button>
      </div>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Jami yo'nalishlar</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{directions.length} ta</p>
          <span className="text-xs text-neutral-400 mt-1 block">Barcha sohalar</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Faol yo'nalishlar</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            {directions.filter((d) => d.status === "Faol").length} ta
          </p>
          <span className="text-xs text-emerald-600/80 mt-1 block">Qabul ochiq</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">Guruhlar soni</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">
            {directions.reduce((acc, curr) => acc + curr.groupsCount, 0)} ta
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">Hozirda o'qiyotgan</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 uppercase">O'quvchilar soni</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">
            {directions.reduce((acc, curr) => acc + curr.studentsCount, 0)} nafar
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">Jami qamrov</span>
        </div>
      </div>

      {/* Filtrlar va Qidiruv */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-6 space-y-4">
        {/* Soha bo'yicha tezkor filtrlar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
          <span className="text-xs font-semibold text-neutral-400 uppercase mr-1">Soha:</span>
          {["Barchasi", "Dasturlash", "Dizayn", "Mobil", "Boshlang'ich", "Aniq fanlar"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jonli qidiruv qatori */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yo'nalish yoki texnologiya (masalan: React, SAT, Python)..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
          >
            <option value="Barcha holatlar">Barcha holatlar</option>
            <option value="Faol">Faol</option>
            <option value="Yopiq">Yopiq</option>
          </select>

          <div className="flex rounded-xl border border-neutral-200 overflow-hidden self-end md:self-auto">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-2 text-xs font-medium transition ${
                viewMode === "cards" ? "bg-neutral-900 text-white" : "bg-white text-neutral-600"
              }`}
            >
              Kartalar
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-xs font-medium transition ${
                viewMode === "table" ? "bg-neutral-900 text-white" : "bg-white text-neutral-600"
              }`}
            >
              Jadval
            </button>
          </div>
        </div>
      </div>

      {/* Kartalar ko'rinishi */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirections.map((dir) => (
            <div
              key={dir.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg">
                    {dir.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-500 border border-neutral-200">
                      {dir.format}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                        dir.status === "Faol"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {dir.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 tracking-tight">{dir.title}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{dir.description}</p>

                {/* Texnologiyalar teglari */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {dir.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] font-medium rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {dir.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 bg-neutral-50 text-neutral-400 text-[11px] rounded-md">
                      +{dir.technologies.length - 4} yana
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <div className="flex justify-between items-center text-xs text-neutral-600 mb-1.5">
                  <span>Oylik to'lov:</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    {dir.monthlyPrice.toLocaleString("uz-UZ")} so'm
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600 mb-1.5">
                  <span>Davomiyligi:</span>
                  <span className="font-medium text-neutral-800">
                    {dir.durationMonths} oy ({dir.weeklyHours} soat/hafta)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600 mb-4">
                  <span>Guruh va Talabalar:</span>
                  <span className="font-medium text-neutral-900">
                    {dir.groupsCount} ta guruh / {dir.studentsCount} ta o'quvchi
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100 text-xs font-semibold">
                  <button
                    onClick={() => handleDelete(dir.id)}
                    className="text-rose-600 hover:text-rose-800 transition"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Jadval ko'rinishi */
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-600">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase font-semibold text-neutral-700">
                <tr>
                  <th className="px-6 py-4">Yo'nalish</th>
                  <th className="px-6 py-4">Soha</th>
                  <th className="px-6 py-4">Texnologiyalar</th>
                  <th className="px-6 py-4">Oylik to'lov</th>
                  <th className="px-6 py-4">Davomiylik / Soat</th>
                  <th className="px-6 py-4">Holat</th>
                  <th className="px-6 py-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredDirections.map((dir) => (
                  <tr key={dir.id} className="hover:bg-neutral-50/50 transition">
                    <td className="px-6 py-4 font-semibold text-neutral-900">{dir.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                        {dir.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {dir.technologies.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-neutral-100 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {dir.monthlyPrice.toLocaleString("uz-UZ")} so'm
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {dir.durationMonths} oy / {dir.weeklyHours} soat
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          dir.status === "Faol"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {dir.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(dir.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800"
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

      {/* Yangi yo'nalish qo'shish modali (Autocomplete takliflar bilan) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900">Yangi yo'nalish yaratish</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDirection} className="space-y-5 mt-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Yo'nalish nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Frontend Pro, SAT Matematika"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Soha
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Direction["category"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  >
                    <option value="Dasturlash">Dasturlash</option>
                    <option value="Dizayn">Dizayn</option>
                    <option value="Mobil">Mobil</option>
                    <option value="Boshlang'ich">Boshlang'ich</option>
                    <option value="Aniq fanlar">Aniq fanlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Format
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as Direction["format"])}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  >
                    <option value="Gibrid">Gibrid</option>
                    <option value="Oflayn">Oflayn</option>
                    <option value="Onlayn">Onlayn</option>
                  </select>
                </div>
              </div>

              {/* 3-rasmdagi O'rganiladigan texnologiyalar inputi (Avtomatik takliflar bilan) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  O'rganiladigan texnologiyalar (Autocomplete)
                </label>
                <p className="text-[11px] text-neutral-400 mb-2">
                  1-harfdan yozing va pastdagi takliflardan tanlang
                </p>

                {/* Tanlangan teglarni chiqarish */}
                <div className="flex flex-wrap gap-2 mb-2 p-2 bg-neutral-50 rounded-xl border border-neutral-200 min-h-[42px] items-center">
                  {selectedTechs.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium text-neutral-800 shadow-xs"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTechTag(t)}
                        className="text-neutral-400 hover:text-rose-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Qidiring: masalan R, P, F, S..."
                    className="flex-1 bg-transparent border-none text-xs focus:outline-none p-1 min-w-[140px]"
                  />
                </div>

                {/* Pastda chiquvchi takliflar ro'yxati */}
                {techSuggestions.length > 0 && (
                  <div className="p-2 bg-white border border-neutral-200 rounded-xl shadow-lg flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                    {techSuggestions.map((suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        onClick={() => addTechTag(suggestion)}
                        className="px-3 py-1 rounded-lg text-xs bg-neutral-100 hover:bg-neutral-900 hover:text-white transition font-medium"
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Narx va soatlar */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Davomiyligi (oy)
                  </label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Haftalik soat
                  </label>
                  <input
                    type="number"
                    value={newWeeklyHours}
                    onChange={(e) => setNewWeeklyHours(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Oylik to'lov (so'm)
                  </label>
                  <input
                    type="number"
                    value={newMonthlyPrice}
                    onChange={(e) => setNewMonthlyPrice(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Qisqacha tavsif
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none"
                  placeholder="Kurs talabalari qanday natijalarga erishishi haqida..."
                ></textarea>
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
                  Yo'nalishni saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectionsPage;
