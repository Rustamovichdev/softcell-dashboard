import { useState, type FC } from "react";
import type { Student } from "../types";

type StudentsTableProps = {
  students: Student[];
  startIndex: number;
};

const StudentsTable: FC<StudentsTableProps> = ({
  students,
  startIndex,
}) => {
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  return (
    <>
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500">#</th>
              <th className="px-4 py-3 font-medium text-gray-500">Ism</th>
              <th className="px-4 py-3 font-medium text-gray-500">
                Familya
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">
                Raqam
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">
                Gmail
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="cursor-pointer transition hover:bg-gray-50"
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

      {selectedStudent && (
        <div className="fixed inset-0 z-50">
          {/* Orqa fon */}
          <button
            type="button"
            aria-label="Panelni yopish"
            onClick={() => setSelectedStudent(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/30"
          />

          {/* O'ng tomondagi panel */}
          <aside className="absolute top-0 right-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Student ma'lumotlari
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  ID: {selectedStudent.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                aria-label="Yopish"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 p-5">
              <DetailItem
                label="Ism"
                value={selectedStudent.ism}
              />

              <DetailItem
                label="Familya"
                value={selectedStudent.familya}
              />

              <DetailItem
                label="Raqam"
                value={selectedStudent.raqam}
              />

              <DetailItem
                label="Gmail"
                value={selectedStudent.gmail}
              />

              <DetailItem
                label="Ota ismi"
                value={selectedStudent.otaIsmi}
              />

              <DetailItem
                label="Ota familyasi"
                value={selectedStudent.otaFamilya}
              />

              <DetailItem
                label="Ona ismi"
                value={selectedStudent.onaIsmi}
              />

              <DetailItem
                label="Ona familyasi"
                value={selectedStudent.onaFamilya}
              />

              <DetailItem
                label="Pasport raqami"
                value={
                  selectedStudent.passportRaqami || "Kiritilmagan"
                }
              />
            </div>

            <div className="border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="h-11 w-full rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Yopish
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

type DetailItemProps = {
  label: string;
  value: string;
};

const DetailItem: FC<DetailItemProps> = ({ label, value }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-gray-900">
        {value || "Kiritilmagan"}
      </p>
    </div>
  );
};

export default StudentsTable;