import type { Student } from "./types";

/** Bir sahifada nechta student ko'rinadi */
export const PAGE_SIZE = 5;

/** Vaqtinchalik ma'lumot. TODO: backend ulanganda o'chiriladi va API dan olinadi */
export const MOCK_STUDENTS: Student[] = [
  { id: 1, ism: "Abdulox", familya: "Shehnazarov", raqam: "998 264373563", gmail: "abdulo@gmail.com" },
  { id: 2, ism: "Malika", familya: "Yusupova", raqam: "998 901234567", gmail: "malika.yusupova@gmail.com" },
  { id: 3, ism: "Jasur", familya: "Rahmonov", raqam: "998 911234568", gmail: "jasur.rahmonov@gmail.com" },
  { id: 4, ism: "Dilnoza", familya: "Ergasheva", raqam: "998 933456789", gmail: "dilnoza.e@gmail.com" },
  { id: 5, ism: "Sardor", familya: "Aliyev", raqam: "998 945678901", gmail: "sardor.aliyev@gmail.com" },
  { id: 6, ism: "Madina", familya: "Tursunova", raqam: "998 977654321", gmail: "madina.t@gmail.com" },
];