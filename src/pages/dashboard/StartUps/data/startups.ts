import type { Startup } from "../types/startup";

export const initialStartups: Startup[] = [
  {
    id: "1",
    studentName: "Azizbek Karimov",
    studentPhone: "+998 90 123 45 67",
    group: "Frontend-12",

    startupName: "EduApp",
    topic: "Ta'lim platformasi",

    goal: "O'quvchilar uchun qulay va zamonaviy onlayn ta'lim platformasini yaratish.",

    description:
      "Ushbu loyiha orqali o'quvchilar darslarni onlayn ko'rishi, topshiriqlarni bajarishi va o'z natijalarini kuzatishi mumkin.",

    projectLink: "https://github.com/example/eduapp",
    demoLink: "https://eduapp-demo.vercel.app",

    submissionDate: "2026-10-15",

    status: "submitted",

    mentorName: "",
    mentorComment: "",

    createdAt: "2026-09-15",
  },

  {
    id: "2",
    studentName: "Madina Rasulova",
    studentPhone: "+998 91 234 56 78",
    group: "Frontend-11",

    startupName: "Smart School",
    topic: "Ta'lim texnologiyalari",

    goal: "Maktab va o'quv markazlaridagi ta'lim jarayonini raqamlashtirish.",

    description:
      "O'qituvchi va o'quvchilar o'rtasidagi ta'lim jarayonini boshqarishga yordam beradigan platforma.",

    projectLink: "https://github.com/example/smart-school",
    demoLink: "https://smart-school-demo.vercel.app",

    submissionDate: "2026-10-25",

    status: "preparing",

    createdAt: "2026-09-16",
  },

  {
    id: "3",
    studentName: "Muhammadali Sobirov",
    studentPhone: "+998 93 345 67 89",
    group: "Backend-8",

    startupName: "BookHub",
    topic: "Elektron kutubxona",

    goal: "Kitoblarni elektron shaklda izlash va ulardan foydalanishni osonlashtirish.",

    description:
      "Elektron kutubxona orqali foydalanuvchilar kitoblarni qidirishi va kerakli ma'lumotlarni topishi mumkin.",

    projectLink: "https://github.com/example/bookhub",
    demoLink: "https://bookhub-demo.vercel.app",

    submissionDate: "2026-09-30",

    status: "submitted",

    createdAt: "2026-09-10",
  },

  {
    id: "4",
    studentName: "Zarina Aliyeva",
    studentPhone: "+998 94 456 78 90",
    group: "Design-5",

    startupName: "EcoHayot",
    topic: "Ekologiya",

    goal: "Atrof-muhitni asrash va chiqindilarni kamaytirishga yordam berish.",

    description:
      "Odamlarga ekologik odatlarni shakllantirish va chiqindilarni to'g'ri saralashni o'rgatadigan loyiha.",

    projectLink: "https://github.com/example/ecohayot",
    demoLink: "https://ecohayot-demo.vercel.app",

    submissionDate: "2026-09-20",

    status: "approved",

    mentorName: "Aliyev Jamshid",
    mentorComment: "Loyiha talablarga javob beradi.",

    createdAt: "2026-09-05",
  },

  {
    id: "5",
    studentName: "Sardor Tursunov",
    studentPhone: "+998 95 567 89 01",
    group: "Frontend-10",

    startupName: "JobFinder",
    topic: "Ish qidirish platformasi",

    goal: "Yoshlar uchun ish va amaliyot topishni osonlashtirish.",

    description:
      "Yoshlar o'zlariga mos ish va amaliyotlarni qidirishi uchun yaratilayotgan platforma.",

    projectLink: "https://github.com/example/jobfinder",
    demoLink: "https://jobfinder-demo.vercel.app",

    submissionDate: "2026-10-05",

    status: "revision",

    mentorName: "Aliyev Jamshid",
    mentorComment: "Loyiha tavsifi va ishlaydigan demo havolasini to'ldirish kerak.",

    createdAt: "2026-09-15",
  },
];