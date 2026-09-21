import type { FC } from "react";
import type { Student } from "../types";

type StudentsTableProps = {
  students: Student[];
  /** Jadvaldagi raqamlash shu indexdan boshlanadi (pagination uchun) */
  startIndex: number;
};

const StudentsTable: FC<StudentsTableProps> = ({ students, startIndex }) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Ism</th>
            <th className="px-4 py-3 font-medium">Familya</th>
            <th className="px-4 py-3 font-medium">Raqam</th>
            <th className="px-4 py-3 font-medium">Gmail</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                Student topilmadi
              </td>
            </tr>
          ) : (
            students.map(({ id, ism, familya, raqam, gmail }, index) => (
              <tr key={id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400">{startIndex + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{ism}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{familya}</td>
                <td className="px-4 py-3 text-gray-600">{raqam}</td>
                <td className="px-4 py-3 text-gray-600">{gmail}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;