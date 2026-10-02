import { useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import GroupsTable from "./components/GroupsTable";
import GroupsToolbar from "./components/GroupsToolbar";
import Pagination from "./components/Pagination";
import { PAGE_SIZE, getGroupStatus } from "./data";
import { useGroupsStore } from "./store";

const Groups: FC = () => {
  const navigate = useNavigate();
  const groups = useGroupsStore((state) => state.groups);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return groups.filter((group) => {
      const matchesSearch =
        !query ||
        [group.name, group.direction, group.time].some((value) =>
          value?.toLowerCase().includes(query),
        );
      const matchesStatus = !statusFilter || getGroupStatus(group) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [groups, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleGroups = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const totalStudents = useMemo(
    () => groups.reduce((sum, group) => sum + group.students.length, 0),
    [groups],
  );
  const totalLessons = useMemo(
    () => groups.reduce((sum, group) => sum + group.lessonCount, 0),
    [groups],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold sm:text-xl">Groups</h1>
          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            Jami: {filtered.length} ta guruh, {totalStudents} ta student, {totalLessons} ta dars
          </p>
        </div>
      </div>

      <GroupsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        onAdd={() => navigate("/groups/new")}
        statusFilter={statusFilter}
        onStatusFilterChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
      />

      <GroupsTable
        groups={visibleGroups}
        startIndex={startIndex}
        onOpenGroup={(groupId) => navigate(`/groups/${groupId}`)}
      />

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default Groups;
