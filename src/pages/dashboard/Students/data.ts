import type { Student } from "./types";

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