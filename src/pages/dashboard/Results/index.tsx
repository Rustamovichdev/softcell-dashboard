import { useEffect, useMemo, useState } from "react";

type Student = {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  course: string; // qaysi kompyuter kursida o'qiydi
  phone: string;
  district: string; // qayerdan
  source: string; // qayerdan bilgan
  project: string; // nima dastur qilayotgani
};

const NAMES = [
  "Abdulaziz Karimov", "Malika Rahimova", "Jasur Toshmatov", "Dilnoza Yusupova", "Sardor Qodirov",
  "Madina Aliyeva", "Bobur Ismoilov", "Zilola Hamidova", "Otabek Nazarov", "Nilufar Saidova",
  "Sherzod Abdullayev", "Gulnora Ergasheva", "Javohir Mirzayev", "Kamola Tursunova", "Akmal Rustamov",
  "Shahzoda Ormonova", "Ulugbek Xolmatov", "Feruza Normatova", "Doniyor Sobirov", "Sevara Qosimova",
  "Humoyun Baxtiyorov", "Laylo Davronova", "Azizbek Yuldashev", "Munisa Karimova", "Temur Ochilov",
];

const COURSES = [
  "Frontend (HTML, CSS, JavaScript)",
  "Python",
  "Backend",
  "Kompyuter savodxonligi",
  "Mobil dasturlash",
  "Web dizayn (UI/UX)",
  "Grafik dizayn",
  "Scratch (bolalar uchun)",
];

const DISTRICTS = [
  "Chilonzor", "Yunusobod", "Mirzo Ulug'bek", "Sergeli", "Yakkasaroy",
  "Olmazor", "Shayxontohur", "Bektemir", "Mirobod", "Uchtepa",
];

const SOURCES = ["O'zi kelgan", "Internetdan eshitgan", "Do'stidan eshitgan"];

const PROJECTS = [
  "Davomat kuzatish ilovasi",
  "Dars tayyorlashga yordam beruvchi Telegram bot",
  "Yaqin oshxonalardan buyurtma berish xizmati",
  "Shaxsiy portfolio sayti",
  "Xarajatlarni hisoblash ilovasi",
  "Onlayn kutubxona",
  "Ob-havo ilovasi",
  "Kichik o'yin (Scratch)",
];

const STUDENTS: Student[] = NAMES.map((fullName, i) => {
  const n = i + 1;
  const first = fullName.split(" ")[0].toLowerCase();
  return {
    id: n,
    fullName,
    email: `${first}${n}@gmail.com`,
    avatar: `https://i.pravatar.cc/80?img=${n}`,
    course: COURSES[i % COURSES.length],
    phone: `+998 9${i % 10} ${100 + n} ${10 + (n % 80)} ${20 + (n % 70)}`,
    district: DISTRICTS[i % DISTRICTS.length],
    source: SOURCES[i % SOURCES.length],
    project: PROJECTS[i % PROJECTS.length],
  };
});

const PAGE_SIZES = [2, 5, 6, 10];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Rasm yuklanmasa, ism bosh harflari ko'rsatiladi
const Avatar = ({ student, size }: { student: Student; size: number }) => {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size, fontSize: size * 0.36 };

  if (failed) {
    return (
      <span className="results__avatar results__avatar--fallback" style={style}>
        {initials(student.fullName)}
      </span>
    );
  }
  return (
    <img
      className="results__avatar"
      style={style}
      src={student.avatar}
      alt={student.fullName}
      onError={() => setFailed(true)}
    />
  );
};

const Results = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selected, setSelected] = useState<Student | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STUDENTS;
    return STUDENTS.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Esc bosilganda to'liq ekran oynasi yopiladi
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="results">
      <style>{`
        .results {
          width: 100%;
          padding: 32px 24px 64px;
          font-family: "Segoe UI", Roboto, Arial, sans-serif;
          color: #111827;
          box-sizing: border-box;
        }

        .results__title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .results__subtitle {
          color: #6b7280;
          font-size: 14px;
          margin: 4px 0 20px;
        }

        .results__search {
          position: relative;
          margin-bottom: 20px;
        }

        .results__search svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .results__search input {
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

        .results__search input:focus {
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
        }

        .results__empty {
          color: #6b7280;
          font-size: 15px;
          padding: 40px 0;
          text-align: center;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef0f2;
        }

        .results__table-wrap {
          width: 100%;
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #eef0f2;
          background: #fff;
        }

        .results__table {
          width: 100%;
          border-collapse: collapse;
        }

        .results__table th,
        .results__table td {
          padding: 12px 20px;
          text-align: left;
          font-size: 14px;
        }

        .results__table th {
          font-weight: 600;
          font-size: 12px;
          color: #6b7280;
          background: #f9fafb;
          border-bottom: 1px solid #eef0f2;
          white-space: nowrap;
        }

        .results__table td:first-child,
        .results__table th:first-child {
          width: 64px;
          color: #6b7280;
        }

        .results__table tbody tr {
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .results__table tbody tr:last-child {
          border-bottom: none;
        }

        .results__table tbody tr:hover {
          background: #f9fafb;
        }

        .results__user {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .results__avatar {
          flex-shrink: 0;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #111827;
          box-sizing: border-box;
        }

        .results__avatar--fallback {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #e5e7eb;
          color: #374151;
          font-weight: 700;
        }

        .results__name {
          font-weight: 600;
        }

        .results__course {
          margin-left: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          background: #eef2ff;
          color: #4338ca;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .results__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .results__size {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
        }

        .results__size select {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 13px;
          font-family: inherit;
          background: #fff;
          color: #111827;
          cursor: pointer;
        }

        .results__pagination {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .results__page-btn {
          min-width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 0 10px;
          transition: background 0.15s ease;
        }

        .results__page-btn:hover:not(:disabled) {
          background: #f3f4f6;
        }

        .results__page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .results__page-btn--active,
        .results__page-btn--active:hover:not(:disabled) {
          background: #111827;
          border-color: #111827;
          color: #fff;
        }

        /* To'liq ekran tafsilotlar */
        .results__detail {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #f9fafb;
          overflow-y: auto;
          padding: 32px 24px 64px;
          box-sizing: border-box;
        }

        .results__detail-inner {
          max-width: 760px;
          margin: 0 auto;
        }

        .results__back {
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 10px;
          padding: 9px 16px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          color: #374151;
          cursor: pointer;
          margin-bottom: 24px;
        }

        .results__back:hover {
          background: #f3f4f6;
        }

        .results__hero {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .results__hero-name {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
        }

        .results__hero-email {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .results__card {
          background: #fff;
          border: 1px solid #eef0f2;
          border-radius: 12px;
          padding: 8px 24px;
        }

        .results__row {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .results__row:last-child {
          border-bottom: none;
        }

        .results__label {
          flex: 0 0 200px;
          color: #6b7280;
          font-size: 14px;
        }

        .results__value {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .results {
            padding: 24px 16px 48px;
          }

          .results__table th,
          .results__table td {
            padding: 10px 12px;
          }

          .results__user {
            flex-wrap: wrap;
            gap: 8px 12px;
          }

          .results__course {
            margin-left: 0;
          }

          .results__row {
            flex-direction: column;
            gap: 4px;
          }

          .results__label {
            flex: none;
          }

          .results__footer {
            justify-content: center;
          }
        }
      `}</style>

      <h1 className="results__title">O'quvchilar ro'yxati</h1>
      <p className="results__subtitle">Jami: {STUDENTS.length} ta o'quvchi</p>

      <div className="results__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Ism, kurs, email yoki telefon bo'yicha qidirish..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="results__empty">Hech narsa topilmadi</p>
      ) : (
        <>
          <div className="results__table-wrap">
            <table className="results__table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>O'quvchi</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((s, i) => (
                  <tr key={s.id} onClick={() => setSelected(s)}>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                    <td>
                      <div className="results__user">
                        <Avatar student={s} size={40} />
                        <span className="results__name">{s.fullName}</span>
                        <span className="results__course">{s.course}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="results__footer">
            <label className="results__size">
              Sahifada:
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {PAGE_SIZES.map((n) => (
                  <option key={n} value={n}>
                    {n} ta
                  </option>
                ))}
              </select>
            </label>

            {totalPages > 1 && (
              <div className="results__pagination">
                <button
                  type="button"
                  className="results__page-btn"
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
                      "results__page-btn" +
                      (n === currentPage ? " results__page-btn--active" : "")
                    }
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  className="results__page-btn"
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Keyingi"
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {selected && (
        <div className="results__detail">
          <div className="results__detail-inner">
            <button
              type="button"
              className="results__back"
              onClick={() => setSelected(null)}
            >
              ← Orqaga
            </button>

            <div className="results__hero">
              <Avatar student={selected} size={84} />
              <div>
                <h2 className="results__hero-name">{selected.fullName}</h2>
                <p className="results__hero-email">{selected.email}</p>
              </div>
            </div>

            <div className="results__card">
              <div className="results__row">
                <span className="results__label">Kompyuter kursi</span>
                <span className="results__value">{selected.course}</span>
              </div>
              <div className="results__row">
                <span className="results__label">Telefon raqami</span>
                <span className="results__value">{selected.phone}</span>
              </div>
              <div className="results__row">
                <span className="results__label">Qayerdan (tuman)</span>
                <span className="results__value">{selected.district}</span>
              </div>
              <div className="results__row">
                <span className="results__label">Qayerdan bilgan</span>
                <span className="results__value">{selected.source}</span>
              </div>
              <div className="results__row">
                <span className="results__label">Qilayotgan dasturi</span>
                <span className="results__value">{selected.project}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
