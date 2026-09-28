import type { Student } from "./types";

/** Bir sahifada nechta student ko'rinadi */
export const PAGE_SIZE = 5;

/** Vaqtinchalik ma'lumot. TODO: backend ulanganda o'chiriladi va API dan olinadi */
export const MOCK_STUDENTS: Student[] = [
  { id: 1,  ism: "Abdullo",  familya: "Shehnazarov",  raqam: "998 264373563", gmail: "abdullo.shehnazarov@gmail.com" },
  { id: 2,  ism: "Malika",   familya: "Yusupova",     raqam: "998 901234567", gmail: "malika.yusupova@gmail.com" },
  { id: 3,  ism: "Jasur",    familya: "Bekmurodov",   raqam: "998 911234568", gmail: "jasur.bekmurodov@gmail.com" },
  { id: 4,  ism: "Dilnoza",  familya: "Ergasheva",    raqam: "998 933456789", gmail: "dilnoza.ergasheva@gmail.com" },
  { id: 5,  ism: "Sardor",   familya: "Aliyev",       raqam: "998 945678901", gmail: "sardor.aliyev@gmail.com" },
  { id: 6,  ism: "Madina",   familya: "Tursunova",    raqam: "998 977654321", gmail: "madina.tursunova@gmail.com" },
  { id: 7,  ism: "Bobur",    familya: "Olimov",       raqam: "998 902345678", gmail: "bobur.olimov@gmail.com" },
  { id: 8,  ism: "Shahlo",   familya: "Karimova",     raqam: "998 913456789", gmail: "shahlo.karimova@gmail.com" },
  { id: 9,  ism: "Temur",    familya: "Aliev",        raqam: "998 924567891", gmail: "temur.aliev@gmail.com" },
  { id: 10, ism: "Aziz",     familya: "Normatov",     raqam: "998 935678912", gmail: "aziz.normatov@gmail.com" },
  { id: 11, ism: "Gulnoza",  familya: "Rasulova",     raqam: "998 946789123", gmail: "gulnoza.rasulova@gmail.com" },
  { id: 12, ism: "Nodira",   familya: "Xolmatova",    raqam: "998 957891234", gmail: "nodira.xolmatova@gmail.com" },
];

/** To'liq ismni (ism + familya) */
export const getFullName = (student: Pick<Student, "ism" | "familya">) =>
  `${student.ism} ${student.familya}`;

/** id bo'yicha to'liq ismni qaytaradi (topilmasa bo'sh satr) */
export const getStudentName = (id: number) => {
  const student = MOCK_STUDENTS.find((s) => s.id === id);
  return student ? getFullName(student) : "";
};
export const PAGE_SIZE = 20;

const firstNames = [
  "Abdulox",
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

export const MOCK_STUDENTS: Student[] = Array.from(
  { length: 100 },
  (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const number = 900000000 + index;

    return {
      id: index + 1,
      ism: firstName,
      familya: lastName,
      raqam: `998 ${number}`,
      gmail: `${firstName.toLowerCase()}.${index + 1}@gmail.com`,
    };
  },
);
