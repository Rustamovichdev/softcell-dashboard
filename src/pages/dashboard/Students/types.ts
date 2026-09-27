/* Students sahifasiga oid type'lar */

export type Student = {
  id: number;

  ism: string;
  familya: string;

  raqam: string;
  gmail: string;

  otaIsmi: string;
  otaFamilya: string;

  onaIsmi: string;
  onaFamilya: string;

  passportRaqami?: string;
};

/** "Add student" formasi maydonlari (id avtomatik beriladi) */
export type StudentFormValues = Omit<Student, "id">;