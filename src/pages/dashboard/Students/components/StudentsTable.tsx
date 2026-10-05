import { useState, type FC } from "react";
import type { Student } from "../types";

type StudentsTableProps = {
  students: Student[];
  startIndex: number;
  onDeleteStudent: (id: number) => void;
};

const StudentsTable: FC<StudentsTableProps> = ({
  students,
  startIndex,
  onDeleteStudent,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const confirmDelete = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      if (selectedStudent?.id === studentToDelete.id) {
        setSelectedStudent(null);
      }
      setStudentToDelete(null);
    }
  };

  return (
    <>
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500">#</th>
              <th className="px-4 py-3 font-medium text-gray-500">Ism</th>
              <th className="px-4 py-3 font-medium text-gray-500">Familya</th>
              <th className="px-4 py-3 font-medium text-gray-500">Raqam</th>
              <th className="px-4 py-3 font-medium text-gray-500">Gmail</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Amallar</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className="group transition hover:bg-gray-50/80"
                >
                  <td
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer px-4 py-3 text-gray-500"
                  >
                    {startIndex + index + 1}
                  </td>

                  <td
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer px-4 py-3 font-medium text-gray-900 group-hover:text-blue-600"
                  >
                    {student.ism}
                  </td>

                  <td
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer px-4 py-3 text-gray-700"
                  >
                    {student.familya}
                  </td>

                  <td
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer px-4 py-3 text-gray-700"
                  >
                    {student.raqam}
                  </td>

                  <td
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer px-4 py-3 text-gray-700"
                  >
                    {student.gmail}
                  </td>

                  {/* Amallar: Ko'rish va O'chirish */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
                        title="Batafsil"
                      >
                        Ko'rish
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setStudentToDelete(student);
                        }}
                        className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                        title="O'chirish"
                      >
                        O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  Student topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 1. O'chirishni tasdiqlash modali (Confirmation Modal) */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setStudentToDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span className="text-xl font-bold">!</span>
            </div>

            <h3 className="mt-4 text-center text-base font-semibold text-gray-900">
              Talabani o'chirmoqchimisiz?
            </h3>
            <p className="mt-2 text-center text-xs text-gray-500">
              <span className="font-semibold text-gray-800">
                {studentToDelete.ism} {studentToDelete.familya}
              </span>{" "}
              tizimdan butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-red-700"
              >
                Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. O'ng tomondan chiquvchi batafsil ma'lumot paneli */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Panelni yopish"
            onClick={() => setSelectedStudent(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/30"
          />

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
              <DetailItem label="Ism" value={selectedStudent.ism} />
              <DetailItem label="Familya" value={selectedStudent.familya} />
              <DetailItem label="Raqam" value={selectedStudent.raqam} />
              <DetailItem label="Gmail" value={selectedStudent.gmail} />
              <DetailItem label="Ota ismi" value={selectedStudent.otaIsmi} />
              <DetailItem label="Ota familyasi" value={selectedStudent.otaFamilya} />
              <DetailItem label="Ona ismi" value={selectedStudent.onaIsmi} />
              <DetailItem label="Ona familyasi" value={selectedStudent.onaFamilya} />
              <DetailItem
                label="Pasport raqami"
                value={selectedStudent.passportRaqami || "Kiritilmagan"}
              />
            </div>

            <div className="flex gap-2 border-t border-gray-200 p-5">
              <button
                type="button"
                onClick={() => {
                  setStudentToDelete(selectedStudent);
                }}
                className="h-11 flex-1 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                O'chirish
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="h-11 flex-1 rounded-lg bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800"
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
