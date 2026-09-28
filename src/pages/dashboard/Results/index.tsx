import { useState } from "react";

type Student = {
  id: number;
  email: string;
  phone: string;
  district: string; // qayerdan ekanligi
  source: string; // qayerdan bilgan
  course: string; // kompyuter bo'yicha qaysi kursda o'qiydi
  project: string; // nima dastur qilayotgani
  avatar: string;
};

const names = [
  "abdulaziz", "malika", "jasur", "dilnoza", "sardor",
  "madina", "bobur", "nodira", "otabek", "zilola",
  "sherzod", "gulnora", "akmal", "shahlo", "eldor",
  "feruza", "islom", "kamola", "lazizbek", "nigora",
  "rustam", "sevara", "timur", "umida", "javohir",
];
const districts = [
  "Chilonzor tumani", "Yunusobod tumani", "Mirzo Ulug'bek tumani",
  "Shayxontohur tumani", "Yashnobod tumani", "Olmazor tumani",
  "Sergeli tumani", "Uchtepa tumani", "Yakkasaroy tumani",
  "Mirobod tumani", "Bektemir tumani", "Yangihayot tumani",
];
const sources = ["O'zi kelgani", "Internetdan eshitgani", "Do'stidan eshitgani"];
const courses = [
  "Frontend (HTML, CSS, JavaScript, React)",
  "Backend (Node.js)",
  "Python dasturlash",
  "Kompyuter savodxonligi",
  "Grafik dizayn",
  "Mobil ilovalar yaratish",
];
const projects = [
  "Kalkulyator dasturi (React)",
  "Do'kon veb-sayti (HTML, CSS)",
  "Vazifalar ro'yxati (To-Do) ilovasi",
  "Telegram bot (Python)",
  "Portfolio sayti",
  "Ob-havo ilovasi (API bilan)",
  "Tik-Tak-Toe o'yini (JavaScript)",
  "Blog sayti (Node.js)",
];

const students: Student[] = names.map((n, i) => ({
  id: i + 1,
  email: `${n}${i + 1}@gmail.com`,
  phone: `+998 ${91 + (i % 9)} ${100 + i * 3} ${10 + i} ${20 + i}`,
  district: districts[i % districts.length],
  source: sources[i % sources.length],
  course: courses[i % courses.length],
  project: projects[i % projects.length],
  avatar: `https://i.pravatar.cc/200?img=${(i % 70) + 1}`,
}));

const styles = `
.results {
  min-height: 100vh;
  padding: 32px 20px;
  background: #f8fafc;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  box-sizing: border-box;
}
.results-wrap { max-width: 900px; margin: 0 auto; }
.results-title { margin: 0 0 20px; font-size: 28px; color: #0f172a; }

.results-top {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.results-search {
  flex: 1;
  min-width: 220px;
  padding: 12px 18px;
  font-size: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  outline: none;
  background: #fff;
}
.results-search:focus { border-color: #0f172a; }
.results-size {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-size: 14px;
}
.results-size select {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.results-card-table {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
}
.results-table { width: 100%; border-collapse: collapse; }
.results-table th {
  text-align: left;
  padding: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: #f8fafc;
}
.results-table th:first-child,
.results-table td:first-child { width: 60px; }
.results-table td {
  padding: 12px 16px;
  border-top: 1px solid #f1f5f9;
  color: #1e293b;
  font-size: 15px;
}
.results-table tbody tr { cursor: pointer; transition: background 0.15s; }
.results-table tbody tr:hover { background: #f8fafc; }
.results-user { display: flex; align-items: center; gap: 14px; }
.results-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0f172a;
  background: #e2e8f0;
  flex-shrink: 0;
}
.results-email {
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.results-empty { padding: 32px; text-align: center; color: #64748b; }

.results-pages {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.results-pages button {
  min-width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #0f172a;
}
.results-pages button:hover:not(:disabled) { background: #f1f5f9; }
.results-pages button.active { background: #0f172a; color: #fff; border-color: #0f172a; }
.results-pages button:disabled { color: #cbd5e1; cursor: not-allowed; }

/* Butun ekran */
.results-full {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow-y: auto;
  background: #f8fafc;
  padding: 24px 20px 48px;
  box-sizing: border-box;
  animation: results-fade 0.2s ease;
}
@keyframes results-fade {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.results-back {
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 15px;
}
.results-back:hover { background: #f1f5f9; }
.results-profile { max-width: 600px; margin: 32px auto 0; text-align: center; }
.results-big-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #0f172a;
  margin-bottom: 16px;
  background: #e2e8f0;
}
.results-profile h2 { margin: 0 0 24px; font-size: 26px; color: #0f172a; }
.results-info {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px 22px;
  margin-bottom: 14px;
  text-align: left;
}
.results-info small {
  display: block;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.results-info p { margin: 0; font-size: 18px; color: #0f172a; }
`;

export default function Results() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<Student | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = students.filter(
    (s) =>
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.district.toLowerCase().includes(q) ||
      s.source.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q) ||
      s.project.toLowerCase().includes(q)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  // ko'rinadigan sahifa tugmalari (ko'pi bilan 5 ta)
  const windowStart = Math.max(1, Math.min(current - 2, totalPages - 4));
  const windowEnd = Math.min(totalPages, windowStart + 4);
  const pageNumbers: number[] = [];
  for (let p = windowStart; p <= windowEnd; p++) pageNumbers.push(p);

  return (
    <div className="results">
      <style>{styles}</style>

      <div className="results-wrap">
        <h1 className="results-title">O'quvchilar</h1>

        <div className="results-top">
          <input
            className="results-search"
            placeholder="🔍 Qidirish..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <label className="results-size">
            Sahifada:
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[2, 5, 6, 10, 25].map((n) => (
                <option key={n} value={n}>
                  {n} ta
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="results-card-table">
          {visible.length === 0 ? (
            <div className="results-empty">Hech narsa topilmadi</div>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((s, i) => (
                  <tr key={s.id} onClick={() => setSelected(s)}>
                    <td>{start + i + 1}</td>
                    <td>
                      <div className="results-user">
                        <img
                          className="results-avatar"
                          src={s.avatar}
                          alt={s.email}
                        />
                        <span className="results-email">{s.email}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="results-pages">
          <button
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
          >
            &lt;
          </button>
          {pageNumbers.map((p) => (
            <button
              key={p}
              className={p === current ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            disabled={current === totalPages}
            onClick={() => setPage(current + 1)}
          >
            &gt;
          </button>
        </div>
      </div>

      {selected && (
        <div className="results-full">
          <button className="results-back" onClick={() => setSelected(null)}>
            ← Orqaga
          </button>

          <div className="results-profile">
            <img
              className="results-big-avatar"
              src={selected.avatar}
              alt={selected.email}
            />
            <h2>{selected.email}</h2>

            <div className="results-info">
              <small>Telefon</small>
              <p>{selected.phone}</p>
            </div>
            <div className="results-info">
              <small>Qayerdan ekanligi</small>
              <p>{selected.district}</p>
            </div>
            <div className="results-info">
              <small>Qayerdan bilgan</small>
              <p>{selected.source}</p>
            </div>
            <div className="results-info">
              <small>Qaysi kursda o'qiydi</small>
              <p>{selected.course}</p>
            </div>
            <div className="results-info">
              <small>Nima dastur qilyapti</small>
              <p>{selected.project}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}