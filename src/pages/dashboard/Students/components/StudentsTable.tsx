import type { FC } from "react";
import type { Student } from "../types";

type StudentsTableProps = {
  students: Student[];
  startIndex: number;
};

const StudentsTable: FC<StudentsTableProps> = ({
  students,
  startIndex,
}) => {
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-500">#</th>
            <th className="px-4 py-3 font-medium text-gray-500">Ism</th>
            <th className="px-4 py-3 font-medium text-gray-500">Familya</th>
            <th className="px-4 py-3 font-medium text-gray-500">Raqam</th>
            <th className="px-4 py-3 font-medium text-gray-500">Gmail</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student.id}
                className="transition hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-500">
                  {startIndex + index + 1}
                </td>

                <td className="px-4 py-3 font-medium text-gray-900">
                  {student.ism}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {student.familya}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {student.raqam}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {student.gmail}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                Student topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;