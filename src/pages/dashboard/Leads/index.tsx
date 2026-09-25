import { useMemo, useRef, useState, type FormEvent } from "react";

type SourceKey = "ozi" | "internet" | "dost";

type Lead = {
  id: number;
  email: string;
  phone: string;
  address: string;
  source: SourceKey;
};

const SOURCE_LABELS: Record<SourceKey, string> = {
  ozi: "O'zi kelgani",
  internet: "Internetdan eshitgani",
  dost: "Do'stidan eshitgani",
};

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    email: "abdulaziz1@gmail.com",
    phone: "+998 91 100 10 20",
    address: "Chilonzor tumani",
    source: "ozi",
  },
  {
    id: 2,
    email: "malika2@gmail.com",
    phone: "+998 92 103 11 21",
    address: "Yunusobod tumani",
    source: "internet",
  },
  {
    id: 3,
    email: "jasur3@gmail.com",
    phone: "+998 93 106 12 22",
    address: "Mirzo Ulug'bek tumani",
    source: "dost",
  },
  {
    id: 4,
    email: "dilnoza4@gmail.com",
    phone: "+998 94 109 13 23",
    address: "Shayxontohur tumani",
    source: "ozi",
  },
  {
    id: 5,
    email: "sardor5@gmail.com",
    phone: "+998 95 112 14 24",
    address: "Yashnobod tumani",
    source: "internet",
  },
  {
    id: 6,
    email: "nodira6@gmail.com",
    phone: "+998 91 115 15 25",
    address: "Sergeli tumani",
    source: "dost",
  },
  {
    id: 7,
    email: "bekzod7@gmail.com",
    phone: "+998 92 118 16 26",
    address: "Bektemir tumani",
    source: "ozi",
  },
  {
    id: 8,
    email: "zarina8@gmail.com",
    phone: "+998 93 121 17 27",
    address: "Uchtepa tumani",
    source: "internet",
  },
  {
    id: 9,
    email: "otabek9@gmail.com",
    phone: "+998 94 124 18 28",
    address: "Yakkasaroy tumani",
    source: "dost",
  },
  {
    id: 10,
    email: "madina10@gmail.com",
    phone: "+998 95 127 19 29",
    address: "Olmazor tumani",
    source: "ozi",
  },
  {
    id: 11,
    email: "shohruh11@gmail.com",
    phone: "+998 91 130 20 30",
    address: "Chilonzor tumani",
    source: "internet",
  },
  {
    id: 12,
    email: "gulnora12@gmail.com",
    phone: "+998 92 133 21 31",
    address: "Yunusobod tumani",
    source: "dost",
  },
  {
    id: 13,
    email: "farrux13@gmail.com",
    phone: "+998 93 136 22 32",
    address: "Mirzo Ulug'bek tumani",
    source: "ozi",
  },
  {
    id: 14,
    email: "sevara14@gmail.com",
    phone: "+998 94 139 23 33",
    address: "Shayxontohur tumani",
    source: "internet",
  },
  {
    id: 15,
    email: "ilyos15@gmail.com",
    phone: "+998 95 142 24 34",
    address: "Yashnobod tumani",
    source: "dost",
  },
  {
    id: 16,
    email: "nigora16@gmail.com",
    phone: "+998 91 145 25 35",
    address: "Sergeli tumani",
    source: "ozi",
  },
  {
    id: 17,
    email: "ravshan17@gmail.com",
    phone: "+998 92 148 26 36",
    address: "Bektemir tumani",
    source: "internet",
  },
  {
    id: 18,
    email: "kamola18@gmail.com",
    phone: "+998 93 151 27 37",
    address: "Uchtepa tumani",
    source: "dost",
  },
  {
    id: 19,
    email: "diyorbek19@gmail.com",
    phone: "+998 94 154 28 38",
    address: "Yakkasaroy tumani",
    source: "ozi",
  },
  {
    id: 20,
    email: "feruza20@gmail.com",
    phone: "+998 95 157 29 39",
    address: "Olmazor tumani",
    source: "internet",
  },
  {
    id: 21,
    email: "jamshid21@gmail.com",
    phone: "+998 91 160 30 40",
    address: "Chilonzor tumani",
    source: "dost",
  },
  {
    id: 22,
    email: "laylo22@gmail.com",
    phone: "+998 92 163 31 41",
    address: "Yunusobod tumani",
    source: "ozi",
  },
  {
    id: 23,
    email: "rustam23@gmail.com",
    phone: "+998 93 166 32 42",
    address: "Mirzo Ulug'bek tumani",
    source: "internet",
  },
  {
    id: 24,
    email: "ozoda24@gmail.com",
    phone: "+998 94 169 33 43",
    address: "Shayxontohur tumani",
    source: "dost",
  },
  {
    id: 25,
    email: "shahzod25@gmail.com",
    phone: "+998 95 172 34 44",
    address: "Yashnobod tumani",
    source: "ozi",
  },
];

const PAGE_SIZE = 5;

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [source, setSource] = useState<SourceKey>("ozi");

  // Bir marta yuborishni ta'minlaydi (ikki marta bosishdan himoya)
  const submittedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (lead) =>
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.address.toLowerCase().includes(q)
    );
  }, [leads, query]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageLeads = filteredLeads.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const openForm = () => {
    setEmail("");
    setPhone("");
    setAddress("");
    setSource("ozi");
    submittedRef.current = false;
    setSubmitted(false);
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true);

    setLeads((prev) => [
      ...prev,
      { id: Date.now(), email, phone, address, source },
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
          min-width: 640px;
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
        }

        .leads__table th {
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6b7280;
          border-bottom: 1px solid #eef0f2;
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
          z-index: 50;
        }

        .leads__form {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          width: 50vw;
          max-width: 50vw;
          background: #fff;
          border-radius: 12px;
          padding: 28px;
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

        .leads__left,
        .leads__right {
          flex: 1 1 220px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .leads__form input[type="email"],
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

        .leads__form input[type="email"]:focus,
        .leads__form input[type="tel"]:focus,
        .leads__form textarea:focus {
          border-color: #111827;
          box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
        }

        .leads__form textarea {
          min-height: 80px;
          resize: vertical;
        }

        .leads__sources {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .leads__radio {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }

        .leads__radio input[type="radio"] {
          accent-color: #111827;
          width: 16px;
          height: 16px;
          cursor: pointer;
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
            max-height: 90vh;
            overflow-y: auto;
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
            placeholder="Email, telefon yoki manzil bo'yicha qidirish..."
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
                  <th>№</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th>Qayerdan ekanligi</th>
                  <th>Qayerdan bilgan</th>
                </tr>
              </thead>
              <tbody>
                {pageLeads.map((lead, i) => (
                  <tr key={lead.id}>
                    <td>{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.address}</td>
                    <td>{SOURCE_LABELS[lead.source]}</td>
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

      {open && (
        <div className="leads__overlay" onClick={closeForm}>
          <form
            className="leads__form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="leads__close"
              onClick={closeForm}
              aria-label="Yopish"
            />

            <div className="leads__left">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
              <textarea
                placeholder="qayerdan ekanligi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="leads__right">
              <div className="leads__sources">
                {(Object.keys(SOURCE_LABELS) as SourceKey[]).map((key) => (
                  <label key={key} className="leads__radio">
                    <input
                      type="radio"
                      name="source"
                      value={key}
                      checked={source === key}
                      onChange={() => setSource(key)}
                    />
                    <span>{SOURCE_LABELS[key]}</span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="leads__submit"
                disabled={submitted}
              >
                Kiritish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Leads;
