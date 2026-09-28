import { useState, type FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PaymentsToolbar from "./components/PaymentsToolbar";
import PaymentsTable, { groupByStudent } from "./components/PaymentsTable";
import Pagination from "./components/Pagination";
import { PAGE_SIZE } from "./data";
import { usePaymentsStore } from "./store";

const Payment: FC = () => {
  const navigate = useNavigate();
  const payments = usePaymentsStore((state) => state.payments);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  const query = search.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      payments.filter((p) => {
        const matchesSearch =
          !query ||
          [p.studentName, p.lessonName, p.groupName, p.description].some((v) =>
            v?.toLowerCase().includes(query),
          );
        const matchesStatus = !statusFilter || p.status === statusFilter;
        const matchesMethod = !methodFilter || p.method === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
      }),
    [payments, query, statusFilter, methodFilter],
  );

  // Avval o'quvchilar bo'yicha goplaymiz, keyin sahifalaymiz
  const students = useMemo(() => groupByStudent(filtered), [filtered]);

  const totalPages = Math.max(1, Math.ceil(students.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleStudents = students.slice(startIndex, startIndex + PAGE_SIZE);

  const totalAmount = useMemo(
    () => payments.reduce((sum, p) => sum + p.amount, 0),
    [payments],
  );
  const totalPaid = useMemo(
    () => payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.paidAmount, 0),
    [payments],
  );
  const totalPending = useMemo(
    () => payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.dueAmount, 0),
    [payments],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleMethodFilterChange = (value: string) => {
    setMethodFilter(value);
    setPage(1);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold sm:text-xl">To'lovlar</h1>
          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            Jami: {students.length} ta o'quvchi, {filtered.length} ta oylik to'lov
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">Jami summa</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {totalAmount.toLocaleString("uz-UZ")} UZS
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-emerald-50 p-4">
            <p className="text-xs text-emerald-700">To'langan (bajarilgan)</p>
            <p className="mt-1 text-lg font-bold text-emerald-700">
              {totalPaid.toLocaleString("uz-UZ")} UZS
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-700">Kutilayotgan (qoldiq)</p>
            <p className="mt-1 text-lg font-bold text-amber-700">
              {totalPending.toLocaleString("uz-UZ")} UZS
            </p>
          </div>
        </div>
      </div>

      <PaymentsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        onAdd={() => navigate("/payment/new")}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        methodFilter={methodFilter}
        onMethodFilterChange={handleMethodFilterChange}
      />

      <PaymentsTable
        students={visibleStudents}
        startIndex={startIndex}
        onViewSchedule={() => navigate("/payment/schedule")}
      />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default Payment;