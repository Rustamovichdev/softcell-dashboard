import type { CallCardItem, KanbanColumnDef } from "./types";

export const KANBAN_COLUMNS: KanbanColumnDef[] = [
  { id: "new", title: "Yangi qo'ng'iroqlar", color: "border-sky-500", badgeBg: "bg-sky-100 text-sky-800" },
  { id: "answered", title: "Javob berildi", color: "border-emerald-500", badgeBg: "bg-emerald-100 text-emerald-800" },
  { id: "missed", title: "Javob berilmadi", color: "border-rose-500", badgeBg: "bg-rose-100 text-rose-800" },
  { id: "callback", title: "Keyinroq qo'ng'iroq", color: "border-amber-500", badgeBg: "bg-amber-100 text-amber-800" },
  { id: "cancelled", title: "Bekor qilindi", color: "border-gray-400", badgeBg: "bg-gray-100 text-gray-700" },
];

export const INITIAL_CALLS: CallCardItem[] = [
  {
    id: "call-1",
    clientName: "Sardor Aliyev",
    phone: "+998 90 123 45 67",
    operator: "Malika Karimova",
    status: "new",
    time: "10:15",
    note: "Frontend kursi narxlari bo'yicha qiziqdi",
  },
  {
    id: "call-2",
    clientName: "Jasur Rahimov",
    phone: "+998 93 555 12 34",
    operator: "Nodir Saidov",
    status: "answered",
    time: "11:00",
    duration: "03:12",
    note: "To'lovni ertaga amalga oshirmoqchi",
  },
  {
    id: "call-3",
    clientName: "Nilufar Qosimova",
    phone: "+998 97 777 88 99",
    operator: "Malika Karimova",
    status: "missed",
    time: "11:45",
    note: "Gudok ketdi, ko'tarmadi",
  },
  {
    id: "call-4",
    clientName: "Bobur Usmonov",
    phone: "+998 91 333 44 22",
    operator: "Diyor Bek",
    status: "callback",
    time: "12:20",
    note: "Soat 16:00 dan keyin telefon qilishni so'radi",
  },
  {
    id: "call-5",
    clientName: "Aziza Mirzayeva",
    phone: "+998 99 111 22 33",
    operator: "Nodir Saidov",
    status: "answered",
    time: "12:50",
    duration: "01:45",
    note: "Bepul darsga ro'yxatdan o'tdi",
  },
  {
    id: "call-6",
    clientName: "Xurshid Yoqubov",
    phone: "+998 94 888 77 66",
    operator: "Diyor Bek",
    status: "cancelled",
    time: "09:30",
    note: "Noto'g'ri tushgan raqam",
  },
];
