import { useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
 
type Lead = {
  id: number;
  fullName: string;
  age: string; // yosh yoki maktabda nechanchi sinf
  direction: string;
  startUp: string;
  startUpDesc: string;
  phone: string;
  telegram: string;
};
 
const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    fullName: "Abdulaziz Karimov",
    age: "16 yosh",
    direction: "Frontend (HTML, CSS, JavaScript)",
    startUp: "EduTrack",
    startUpDesc: "O'quvchilar davomatini kuzatish ilovasi",
    phone: "+998 91 100 10 20",
    telegram: "https://t.me/abdulaziz",
  },
  {
    id: 2,
    fullName: "Malika Rahimova",
    age: "9-sinf",
    direction: "Python",
    startUp: "StudyBot",
    startUpDesc: "Dars tayyorlashda yordam beradigan Telegram bot",
    phone: "+998 92 103 11 21",
    telegram: "https://t.me/malika",
  },
  {
    id: 3,
    fullName: "Jasur Toshmatov",
    age: "18 yosh",
    direction: "Backend",
    startUp: "FoodGo",
    startUpDesc: "Yaqin atrofdagi oshxonalardan buyurtma berish xizmati",
    phone: "+998 93 106 12 22",
    telegram: "https://t.me/jasur",
  },
];
 
const normalizeTelegram = (value: string) => {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith("@")) return `https://t.me/${v.slice(1)}`;
  if (v.startsWith("t.me/")) return `https://${v}`;
  return `https://t.me/${v}`;
};
 
const PAGE_SIZE = 5;
 
// Yo'nalish tanlash uchun kompyuter kurslari
const COURSES = [
  "Kompyuter savodxonligi",
  "Frontend (HTML, CSS, JavaScript)",
  "Backend",
  "Python",
  "Mobil dasturlash",
  "Web dizayn (UI/UX)",
  "Grafik dizayn",
  "Video montaj",
  "Kiberxavfsizlik",
  "Ma'lumotlar tahlili",
  "Sun'iy intellekt",
  "Robototexnika",
  "Scratch (bolalar uchun)",
  "Boshqa",
];
 
// Yozilgan matn kurs nomiga to'liq mos kelsa, kursning aniq nomini qaytaradi
const findCourse = (value: string) =>
  COURSES.find((c) => c.toLowerCase() === value.trim().toLowerCase());
 
const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
 
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [direction, setDirection] = useState("");
  const [startUp, setStartUp] = useState("");
  const [startUpDesc, setStartUpDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
 
  // Yo'nalish (combobox) holati
  const [dirOpen, setDirOpen] = useState(false);
  const [dirError, setDirError] = useState("");
  const [dirPos, setDirPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 220,
  });
  const dirRef = useRef<HTMLDivElement>(null);
  const dirFieldRef = useRef<HTMLDivElement>(null);
 
  // Bir marta yuborishni ta'minlaydi (ikki marta bosishdan himoya)
  const submittedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
 
  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(q) ||
        lead.age.toLowerCase().includes(q) ||
        lead.direction.toLowerCase().includes(q) ||
        lead.startUp.toLowerCase().includes(q) ||
        lead.startUpDesc.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.telegram.toLowerCase().includes(q)
    );
  }, [leads, query]);
 
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageLeads = filteredLeads.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
 
  // Yozilgan matn bo'yicha kurslarni filtrlaydi
  const filteredCourses = COURSES.filter((c) =>
    c.toLowerCase().includes(direction.trim().toLowerCase())
  );
 
  // Ro'yxatni inputning aynan ostida ochadi (forma ichida qirqilib qolmasligi uchun fixed)
  const openDirList = () => {
    const el = dirFieldRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setDirPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.max(120, Math.min(220, window.innerHeight - rect.bottom - 16)),
      });
    }
    setDirOpen(true);
  };
 
  const pickCourse = (course: string) => {
    setDirection(course);
    setDirError("");
    setDirOpen(false);
  };
 
  const openForm = () => {
    setFullName("");
    setAge("");
    setDirection("");
    setStartUp("");
    setStartUpDesc("");
    setPhone("");
    setTelegram("");
    setDirOpen(false);
    setDirError("");
    submittedRef.current = false;
    setSubmitted(false);
    setOpen(true);
  };
 
  const closeForm = () => setOpen(false);
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittedRef.current) return;
 
    // Yo'nalish kurs nomlaridan biriga mos kelishi shart
    const matched = findCourse(direction);
    if (!matched) {
      setDirError("Bunday kurs yo'q. Iltimos, ro'yxatdagi kurslardan birini tanlang");
      return;
    }
 
    submittedRef.current = true;
    setSubmitted(true);
 
    setLeads((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName,
        age,
        direction: matched, // to'g'ri yozilgan kurs nomi saqlanadi
        startUp,
        startUpDesc,
        phone,
        telegram: normalizeTelegram(telegram),
      },
    ]);
    setQuery("");
    setPage(1);
    setOpen(false);
  };
 
  return (
    <div className="leads">
      <style>{`
        .leads {
          width: 100%;
          padding: 32px 24px 64px;
          font-family: "Segoe UI", Roboto, Arial, sans-serif;
          color: #111827;
          box-sizing: border-box;
        }
 
        .leads__title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
 
        .leads__subtitle {
          color: #6b7280;
          font-size: 14px;
          margin: 4px 0 20px;
        }
 
        .leads__toolbar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
 
        .leads__search {
          position: relative;
          flex: 1;
        }
 
        .leads__search svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
 
        .leads__search input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 11px 14px 11px 40px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
 
        .leads__search input:focus {
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
        }
 
        .leads__add-btn {
          flex-shrink: 0;
          border: none;
          border-radius: 10px;
          background: #111827;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          padding: 0 20px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
 
        .leads__add-btn:hover {
          background: #1f2937;
        }
 
        .leads__empty {
          color: #6b7280;
          font-size: 15px;
          padding: 40px 0;
          text-align: center;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef0f2;
        }
 
        .leads__table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 12px;
          border: 1px solid #eef0f2;
          background: #fff;
        }
 
        .leads__table {
          width: 100%;
          min-width: 1000px;
          border-collapse: collapse;
        }
 
        .leads__table thead {
          background: #f9fafb;
        }
 
        .leads__table th,
        .leads__table td {
          padding: 14px 20px;
          text-align: left;
          font-size: 14px;
          vertical-align: top;
        }
 
        .leads__table th {
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6b7280;
          border-bottom: 1px solid #eef0f2;
          white-space: nowrap;
        }
 
        .leads__table tbody tr {
          border-bottom: 1px solid #f3f4f6;
        }
 
        .leads__table tbody tr:last-child {
          border-bottom: none;
        }
 
        .leads__table tbody tr:hover {
          background: #fafafa;
        }
 
        .leads__table td:nth-child(2) {
          font-weight: 600;
        }
 
        .leads__table td:nth-child(5) {
          min-width: 220px;
          color: #4b5563;
        }
 
        .leads__table a {
          color: #2563eb;
          text-decoration: none;
        }
 
        .leads__table a:hover {
          text-decoration: underline;
        }
 
        .leads__age {
          display: block;
          color: #6b7280;
          font-size: 12px;
          font-weight: 400;
          margin-top: 2px;
        }
 
        .leads__pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
 
        .leads__page-btn {
          min-width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          transition: background 0.15s ease, color 0.15s ease;
        }
 
        .leads__page-btn:hover:not(:disabled) {
          background: #f3f4f6;
        }
 
        .leads__page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
 
        .leads__page-btn--active {
          background: #111827;
          border-color: #111827;
          color: #fff;
        }
 
        .leads__page-btn--active:hover {
          background: #111827;
        }
 
        .leads__overlay {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 9999;
        }
 
        .leads__form {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          width: 60vw;
          max-width: 60vw;
          max-height: 90vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 12px;
          padding: 28px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
 
        .leads__close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          color: #9ca3af;
          font-size: 18px;
          cursor: pointer;
          border-radius: 6px;
        }
 
        .leads__close:hover {
          background: #f3f4f6;
          color: #374151;
        }
 
        .leads__close::before {
          content: "\\2715";
        }
 
        .modal-content {
          display: block;
          width: 100%;
        }
 
        .form-title {
          display: block;
          width: 100%;
          margin: 0 0 20px 0;
          font-size: 20px;
          font-weight: 600;
        }
 
        .leads__left,
        .leads__right {
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
 
        .leads__form input[type="text"],
        .leads__form input[type="tel"],
        .leads__form textarea {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
 
        .leads__form input[type="text"]:focus,
        .leads__form input[type="tel"]:focus,
        .leads__form textarea:focus {
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
        }
 
        .leads__form textarea {
          min-height: 100px;
          resize: vertical;
        }
 
        /* Yo'nalish: input + ochiladigan kurslar ro'yxati */
        .leads__combo {
          display: flex;
          flex-direction: column;
        }
 
        .leads__combo-field {
          position: relative;
          display: flex;
        }
 
        .leads__form .leads__combo-field input {
          width: 100%;
          box-sizing: border-box;
          padding-right: 36px;
          cursor: pointer;
        }
 
        .leads__form .leads__input--error,
        .leads__form .leads__input--error:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
 
        .leads__combo-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
 
        .leads__combo-list {
          position: fixed;
          z-index: 10000;
          margin: 0;
          padding: 4px;
          list-style: none;
          overflow-y: auto;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }
 
        .leads__combo-item {
          width: 100%;
          text-align: left;
          border: none;
          background: transparent;
          padding: 9px 10px;
          font-size: 14px;
          font-family: inherit;
          color: #111827;
          border-radius: 6px;
          cursor: pointer;
        }
 
        .leads__combo-item:hover {
          background: #f3f4f6;
        }
 
        .leads__combo-item--active {
          font-weight: 600;
          background: #f9fafb;
        }
 
        .leads__combo-empty {
          padding: 9px 10px;
          font-size: 14px;
          color: #9ca3af;
        }
 
        .leads__error {
          margin-top: 6px;
          font-size: 12px;
          color: #dc2626;
        }
 
        .leads__submit {
          margin-top: auto;
          border: none;
          border-radius: 10px;
          background: #111827;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          padding: 14px 20px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
 
        .leads__submit:hover:not(:disabled) {
          background: #1f2937;
        }
 
        .leads__submit:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
 
        @media (max-width: 768px) {
          .leads {
            padding: 24px 16px 48px;
          }
 
          .leads__title {
            font-size: 20px;
          }
 
          .leads__table th,
          .leads__table td {
            padding: 10px 14px;
            font-size: 13px;
          }
 
          .leads__form {
            width: 90vw;
            max-width: 90vw;
          }
        }
 
        @media (max-width: 480px) {
          .leads__toolbar {
            flex-direction: column;
          }
 
          .leads__add-btn {
            padding: 11px 20px;
          }
 
          .leads__overlay {
            padding: 12px;
            align-items: flex-end;
          }
 
          .leads__form {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
            width: 100%;
            max-width: 100%;
          }
 
          .leads__submit {
            width: 100%;
          }
        }
      `}</style>
 
      <h1 className="leads__title">O'quvchilar ro'yxati</h1>
      <p className="leads__subtitle">Jami: {leads.length} ta o'quvchi</p>
 
      <div className="leads__toolbar">
        <div className="leads__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Ism, yo'nalish, startUp yoki telefon bo'yicha qidirish..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button type="button" className="leads__add-btn" onClick={openForm}>
          + Qo'shish
        </button>
      </div>
 
      {filteredLeads.length === 0 ? (
        <p className="leads__empty">Hozircha ro'yxat bo'sh</p>
      ) : (
        <>
          <div className="leads__table-wrap">
            <table className="leads__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Lead full name</th>
                  <th>Direction</th>
                  <th>StartUp</th>
                  <th>StartUp desc</th>
                  <th>Tel number</th>
                  <th>Telegram link</th>
                </tr>
              </thead>
              <tbody>
                {pageLeads.map((lead, i) => (
                  <tr key={lead.id}>
                    <td>{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                    <td>
                      {lead.fullName}
                      <span className="leads__age">{lead.age}</span>
                    </td>
                    <td>{lead.direction}</td>
                    <td>{lead.startUp}</td>
                    <td>{lead.startUpDesc}</td>
                    <td>{lead.phone}</td>
                    <td>
                      <a href={lead.telegram} target="_blank" rel="noreferrer">
                        {lead.telegram}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          {totalPages > 1 && (
            <div className="leads__pagination">
              <button
                type="button"
                className="leads__page-btn"
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Oldingi"
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={
                    "leads__page-btn" +
                    (n === currentPage ? " leads__page-btn--active" : "")
                  }
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="leads__page-btn"
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Keyingi"
              >
                {">"}
              </button>
            </div>
          )}
        </>
      )}
 
      {open &&
        createPortal(
          // Kulrang joyga bosganda yopilmaydi, faqat X tugmasi orqali yopiladi
          <div
            className="leads__overlay"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <form
              className="leads__form"
              onSubmit={handleSubmit}
              onScroll={() => setDirOpen(false)}
            >
              <button
                type="button"
                className="leads__close"
                onClick={closeForm}
                aria-label="Yopish"
              />
 
              <div className="modal-content">
                <h2 className="form-title">Ma'lumotlarni kiriting</h2>
              </div>
 
              <div className="leads__left">
                <input
                  type="text"
                  placeholder="Ism familya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Yosh (yoki maktabda nechanchi sinf)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
 
                {/* Yo'nalish: bosganda kurslar ro'yxati ochiladi, yozganda filtrlanadi */}
                <div
                  className="leads__combo"
                  ref={dirRef}
                  onBlur={(e) => {
                    // Fokus combobox'dan tashqariga chiqsa: ro'yxatni yopamiz va tekshiramiz
                    if (!dirRef.current?.contains(e.relatedTarget as Node)) {
                      setDirOpen(false);
                      if (direction.trim() && !findCourse(direction)) {
                        setDirError("Bunday kurs yo'q. Iltimos, ro'yxatdagi kurslardan birini tanlang");
                      }
                    }
                  }}
                >
                  <div className="leads__combo-field" ref={dirFieldRef}>
                    <input
                      type="text"
                      className={dirError ? "leads__input--error" : ""}
                      placeholder="Yo'nalish (qaysi kursga qiziqyapti)"
                      value={direction}
                      autoComplete="off"
                      onClick={openDirList}
                      onFocus={openDirList}
                      onChange={(e) => {
                        setDirection(e.target.value);
                        setDirError("");
                        openDirList();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setDirOpen(false);
                        if (e.key === "Enter" && dirOpen && filteredCourses.length > 0) {
                          // Enter bosilganda formani yubormasdan, birinchi mos kursni tanlaydi
                          e.preventDefault();
                          pickCourse(filteredCourses[0]);
                        }
                      }}
                      required
                    />
                    <svg
                      className="leads__combo-arrow"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
 
                  {dirOpen && (
                    <ul
                      className="leads__combo-list"
                      style={{
                        top: dirPos.top,
                        left: dirPos.left,
                        width: dirPos.width,
                        maxHeight: dirPos.maxHeight,
                      }}
                    >
                      {filteredCourses.length === 0 ? (
                        <li className="leads__combo-empty">Kurs topilmadi</li>
                      ) : (
                        filteredCourses.map((course) => (
                          <li key={course}>
                            <button
                              type="button"
                              className={
                                "leads__combo-item" +
                                (course === direction ? " leads__combo-item--active" : "")
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => pickCourse(course)}
                            >
                              {course}
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
 
                  {dirError && <span className="leads__error">{dirError}</span>}
                </div>
 
                <input
                  type="tel"
                  placeholder="+998 ** *** ** **"
                  value={phone}
                  maxLength={17}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/^\+998/, "")
                      .replace(/[^0-9]/g, "")
                      .slice(0, 9);
 
                    if (digits.length === 0) {
                      setPhone("");
                      return;
                    }
 
                    const parts = [
                      digits.slice(0, 2),
                      digits.slice(2, 5),
                      digits.slice(5, 7),
                      digits.slice(7, 9),
                    ].filter(Boolean);
 
                    setPhone(`+998 ${parts.join(" ")}`.trimEnd());
                  }}
                  required
                />
              </div>
 
              <div className="leads__right">
                <input
                  type="text"
                  placeholder="StartUp nomi"
                  value={startUp}
                  onChange={(e) => setStartUp(e.target.value)}
                  required
                />
                <textarea
                  placeholder="StartUp haqida qisqacha yozing"
                  value={startUpDesc}
                  onChange={(e) => setStartUpDesc(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Telegram (@username yoki link)"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  required
                />
 
                <button
                  type="submit"
                  className="leads__submit"
                  disabled={submitted}
                >
                  Kiritish
                </button>
              </div>
            </form>
          </div>,
          document.body
        )}
    </div>
  );
};
 
export default Leads;
 