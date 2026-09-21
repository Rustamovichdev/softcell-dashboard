/* Students sahifasiga oid type'lar (global src/types ga tegilmagan) */

export type Student = {
  id: number;
  ism: string;
  familya: string;
  raqam: string;
  gmail: string;
};

/** "Add student" formasi maydonlari (id avtomatik beriladi) */
export type StudentFormValues = Omit<Student, "id">;