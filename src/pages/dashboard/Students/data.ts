import type { Student } from "./types";

/** Bir sahifada nechta student ko'rinadi */
export const PAGE_SIZE = 20;

/** Ismlar (20 ta) */
const firstNames = [
  "Abdullo",
  "Malika",
  "Jasur",
  "Dilnoza",
  "Sardor",
  "Madina",
  "Aziz",
  "Zarina",
  "Bekzod",
  "Mohira",
  "Diyor",
  "Shahnoza",
  "Temur",
  "Sevinch",
  "Oybek",
  "Nodira",
  "Kamron",
  "Rustam",
  "Laylo",
  "Javohir",
];

/** Familiyalar (20 ta) */
const lastNames = [
  "Shehnazarov",
  "Yusupova",
  "Rahmonov",
  "Ergasheva",
  "Aliyev",
  "Tursunova",
  "Karimov",
  "Rasulova",
  "Ismoilov",
  "Qodirova",
  "Nazarov",
  "Abdullayeva",
  "Saidov",
  "Raximova",
  "Mamatov",
  "Toshpulatova",
  "Yuldashev",
  "Oripov",
  "Husanova",
  "Usmonov",
];

/**
 * Vaqtinchalik ma'lumot. TODO: backend ulanganda o'chiriladi va API dan olinadi.
 * 100 ta o'quvchi generatsiya qilinadi, ism-familiya juftligi takrorlanmaydi
 * (20 ism x 20 familiya = 400 mumkin bo'lgan noyob kombinatsiya).
 */
export const MOCK_STUDENTS: Student[] = Array.from({ length: 100 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const number = 900000000 + index;
  const fatherFirst = firstNames[(index + 7) % firstNames.length];
  const fatherLast = lastNames[(index + 11) % lastNames.length];
  const motherFirst = firstNames[(index + 13) % firstNames.length];
  const motherLast = lastNames[(index + 17) % lastNames.length];

  return {
    id: index + 1,
    ism: firstName,
    familya: lastName,
    raqam: `998 ${number}`,
    gmail: `${firstName.toLowerCase()}.${index + 1}@gmail.com`,
    otaIsmi: fatherFirst,
    otaFamilya: fatherLast,
    onaIsmi: motherFirst,
    onaFamilya: motherLast,
  };
});

/** To'liq ismni (ism + familya) */
export const getFullName = (student: Pick<Student, "ism" | "familya">) =>
  `${student.ism} ${student.familya}`;

/** id bo'yicha to'liq ismni qaytaradi (topilmasa bo'sh satr) */
export const getStudentName = (id: number) => {
  const student = MOCK_STUDENTS.find((s) => s.id === id);
  return student ? getFullName(student) : "";
};
