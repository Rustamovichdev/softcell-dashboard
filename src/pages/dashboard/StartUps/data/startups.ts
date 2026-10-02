import type { Startup } from "../types/startup";

export const initialStartups: Startup[] = [
  {
    id: "startup-1",

    studentName: "Azizbek Karimov",
    studentPhone: "+998 90 123 45 67",
    group: "Frontend-12",

    startupName: "EduApp",

    topic: "Ta'lim platformasi",

    goal:
      "O'quvchilar uchun qulay va zamonaviy online ta'lim platformasini yaratish.",

    description:
      "Ushbu loyiha orqali o'quvchilar darslarni online ko'rishi, topshiriqlarni bajarishi va o'z natijalarini kuzatishi mumkin.",

    projectLink: "https://example.com/eduapp",

    submissionDate: "2026-10-15",

    status: "submitted",

    mentorName: "Aliyev Jamshid",

    mentorComment: "",

    createdAt: "2026-09-15",
  },

  {
    id: "startup-2",

    studentName: "Madina Rasulova",
    studentPhone: "+998 91 222 33 44",
    group: "Frontend-11",

    startupName: "JobFinder",

    topic: "Ish qidirish platformasi",

    goal:
      "Yoshlar uchun ish va amaliyot topishni osonlashtirish.",

    description:
      "Platforma orqali yoshlar o'zlariga mos ish va amaliyotlarni topishi, kompaniyalar esa yangi xodimlarni izlashlari mumkin.",

    projectLink: "https://example.com/jobfinder",

    submissionDate: "2026-10-05",

    status: "submitted",

    mentorName: "Aliyev Jamshid",

    mentorComment: "",

    createdAt: "2026-09-15",
  },

  {
    id: "startup-3",

    studentName: "Muhammad Aliyev",
    studentPhone: "+998 93 555 66 77",
    group: "Backend-8",

    startupName: "SmartShop",

    topic: "Online savdo",

    goal:
      "Mahalliy tadbirkorlar uchun qulay online savdo tizimini yaratish.",

    description:
      "SmartShop orqali foydalanuvchilar mahsulotlarni ko'rishi, buyurtma berishi va buyurtma holatini kuzatishi mumkin.",

    projectLink: "https://example.com/smartshop",

    submissionDate: "2026-10-20",

    status: "preparing",

    mentorName: "Aliyev Jamshid",

    mentorComment: "",

    createdAt: "2026-09-18",
  },

  {
    id: "startup-4",

    studentName: "Zarina Aliyeva",
    studentPhone: "+998 94 111 22 33",
    group: "Dizayn-5",

    startupName: "DesignHub",

    topic: "Dizayn xizmatlari",

    goal:
      "Dizaynerlar va mijozlarni bitta platformada birlashtirish.",

    description:
      "Platforma orqali dizaynerlar o'z xizmatlarini taklif qiladi, mijozlar esa kerakli dizaynerni topishi mumkin.",

    projectLink: "https://example.com/designhub",

    submissionDate: "2026-10-10",

    status: "approved",

    mentorName: "Aliyev Jamshid",

    mentorComment:
      "Loyiha ma'lumotlari ko'rib chiqildi va tasdiqlandi.",

    createdAt: "2026-09-10",
  },
];