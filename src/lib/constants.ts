export const SITE_CONFIG = {
  name: "Ameen Academy",
  nameAr: "أكاديمية أمين",
  description: "اتعلم المهارات اللي هتجيبلك فلوس في 2026 — تصميم، AI، فريلانس، ومهارات حديثة مطلوبة في سوق العمل",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    facebook: "https://facebook.com/ameenacademy",
    youtube: "https://youtube.com/@ameenacademy",
    twitter: "https://twitter.com/ameenacademy",
  },
} as const;

export const PAYMENT_CONFIG = {
  methods: [
    {
      id: "vodafone_cash",
      name: "فودافون كاش",
      number: "01090912747",
      instructions: "حوّل المبلغ على الرقم ده وابعتلنا رقم العملية",
    },
    {
      id: "instapay",
      name: "إنستاباي",
      number: "01090912747",
      instructions: "حوّل على إنستاباي وابعتلنا رقم العملية",
    },
  ],
} as const;

export const FREE_COURSE = {
  // ميعاد نزول الكورس المجاني (عدّاد 30 يوم) — عدّلها وقت ما تحب
  launchDate: "2026-06-22T20:00:00+02:00",
} as const;

export const REFERRAL_CONFIG = {
  // نسبة عمولة الإحالة من صافي المبلغ المدفوع
  commissionRate: 20, // %
  // اسم الـ query parameter في لينك الإحالة
  param: "ref",
} as const;

export const ROUTES = {
  home: "/",
  courses: "/courses",
  community: "/community",
  brief: "/brief",
  briefExplore: "/brief/explore",
  briefMy: "/brief/my",
  briefLeaderboard: "/brief/leaderboard",
  vip: "/vip",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  profile: "/dashboard/profile",
  myCourses: "/dashboard/my-courses",
  admin: {
    root: "/admin",
    courses: "/admin/courses",
    students: "/admin/students",
    payments: "/admin/payments",
    community: "/admin/community",
    blog: "/admin/blog",
    settings: "/admin/settings",
  },
} as const;

export const FEATURES = [
  {
    title: "محتوى احترافي",
    description: "كورسات مصممة بعناية لتعطيك أفضل تجربة تعليمية",
    icon: "trophy",
  },
  {
    title: "حماية كاملة",
    description: "فيديوهات محمية بأحدث تقنيات الأمان ضد القرصنة",
    icon: "shield-check",
  },
  {
    title: "تعلم بإيقاعك",
    description: "ادرس وقت ما تحب، من أي جهاز، بدون قيود",
    icon: "clock",
  },
  {
    title: "مجتمع تفاعلي",
    description: "تواصل مع طلاب من جميع أنحاء العالم العربي",
    icon: "users",
  },
  {
    title: "شهادة إتمام",
    description: "احصل على شهادة إكمال بعد كل كورس",
    icon: "certificate",
  },
  {
    title: "دعم مستمر",
    description: "فريق الدعم متواجد لمساعدتك في أي وقت",
    icon: "headset",
  },
] as const;
