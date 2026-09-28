

// To'lov kategoriyalari / Turkumlari
export type PaymentCategory = 
  | 'Project Sale'   // Loyiha sotuvi
  | 'Group Fee'      // Guruh/Kurs to'lovi
  | 'Consulting'     // Konsultatsiya
  | 'Other';         // Boshqa tushumlar

// To'lov amalga oshirilgan usul
export type PaymentMethod = 
  | 'Click' 
  | 'Payme' 
  | 'Bank Transfer'  // Bank o'tkazmasi
  | 'Cash';          // Naqd pul

// To'lov holati
export type PaymentStatus = 
  | 'Completed'      // Bajarildi / Qabul qilindi
  | 'Pending';        // Kutilmoqda



// Har bir to'lov (tushum) obyekti strukturasi
export interface PaymentRecord {
  id: string;                // Unikal ID
  sourceTitle: string;       // Manba nomi (Masalan: "E-Commerce Veb-sayt sotildi")
  category: PaymentCategory; // To'lov turkumi
  clientOrGroup: string;     // Qaysi mijoz yoki guruhdan kelgani
  amount: number;            // Summa (so'mda)
  date: string;              // Sana (YYYY-MM-DD)
  time: string;              // Vaqt (HH:MM)
  method: PaymentMethod;     // To'lov usuli
  status: PaymentStatus;     // To'lov holati
  description?: string;      // Qo'shimcha izoh (ixtiyoriy)
}

// Yangi to'lov qo'shish modal formasi strukturasi
export interface PaymentFormData {
  sourceTitle: string;
  category: PaymentCategory;
  clientOrGroup: string;
  amount: string;
  date: string;
  time: string;
  method: PaymentMethod;
  description: string;
}

// Statistik ma'lumotlar strukturasi
export interface PaymentStats {
  totalIncome: number;   // Jami tushgan pul
  projectIncome: number; // Loyihalar sotuvidan daromad
  groupIncome: number;   // Guruh to'lovlaridan daromad
  count: number;         // Jami tranzaksiyalar soni
}