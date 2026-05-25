import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@2026", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ameen.academy" },
    update: {},
    create: {
      name: "أحمد أمين",
      email: "admin@ameen.academy",
      password: hashedPassword,
      role: "ADMIN",
      image: "/images/03.png",
      bio: "مصمم جرافيك بخبرة أكتر من 10 سنين في السوق المصري والخليجي، ومدير تسويق سابق لمدة 3 سنين",
    },
  });

  const course = await prisma.course.upsert({
    where: { slug: "workshop-ameen-2026" },
    update: {},
    create: {
      slug: "workshop-ameen-2026",
      title: "ورشة أمين 2026 — تصميم + بيع + تسويق",
      thumbnail: "/images/fullcourse.png",
      shortDescription: "برنامج شامل هيعلمك التصميم الجرافيكي وإزاي تبيع شغلك وتسوّق لنفسك. مش مجرد برامج، ده تجهيز للسوق الحقيقي.",
      description: `ورشة أمين مش كورس عادي — ده برنامج كامل هيأهلك تنزل السوق كمصمم محترف.

مش هنعلمك فوتوشوب وإليستريتور بس، لا.. هنعلمك إزاي تفكر كمصمم، إزاي تبني براند شخصي، وإزاي تبيع شغلك بفلوس محترمة.

البرنامج بيشمل:
- أساسيات التصميم والطباعة
- فوتوشوب وإليستريتور بالتطبيق العملي
- تصميم الشعارات والهوية البصرية
- التسويق الشخصي والبراند الشخصي
- مشروع تخرج وبناء بورتفوليو احترافي

أكتر من 20 ساعة محتوى مسجّل + متابعة شخصية أسبوعية.`,
      category: "تصميم جرافيك",
      level: "BEGINNER",
      price: 200000,
      comparePrice: 300000,
      duration: 72000,
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
      instructorId: admin.id,
    },
  });

  const modulesData = [
    { title: "أساسيات التصميم", order: 1, lessons: [
      { title: "مبادئ التصميم الأساسية", order: 1, duration: 3600, isFree: true },
      { title: "نظرية الألوان", order: 2, duration: 2700 },
      { title: "التايبوجرافي والخطوط", order: 3, duration: 3000 },
    ]},
    { title: "فوتوشوب — تطبيق عملي", order: 2, lessons: [
      { title: "واجهة فوتوشوب والأدوات الأساسية", order: 1, duration: 3600, isFree: true },
      { title: "التعامل مع الطبقات", order: 2, duration: 2400 },
      { title: "تعديل الصور باحترافية", order: 3, duration: 3000 },
      { title: "تصميم بوستر عملي", order: 4, duration: 3600 },
    ]},
    { title: "الطباعة وأنواع التصميم", order: 3, lessons: [
      { title: "أنواع الطباعة والألوان", order: 1, duration: 2400 },
      { title: "إعداد ملفات الطباعة", order: 2, duration: 2700 },
    ]},
    { title: "تفكير المصمم", order: 4, lessons: [
      { title: "إزاي تفكر كمصمم محترف", order: 1, duration: 3000 },
      { title: "حل المشكلات بالتصميم", order: 2, duration: 2400 },
    ]},
    { title: "إليستريتور", order: 5, lessons: [
      { title: "أساسيات إليستريتور", order: 1, duration: 3600 },
      { title: "رسم الأشكال والمسارات", order: 2, duration: 3000 },
      { title: "تصميم أيقونات وعناصر", order: 3, duration: 2700 },
    ]},
    { title: "الشعارات والهوية البصرية", order: 6, lessons: [
      { title: "أساسيات تصميم الشعارات", order: 1, duration: 3600 },
      { title: "بناء هوية بصرية كاملة", order: 2, duration: 4200 },
    ]},
    { title: "التسويق والبراند الشخصي", order: 7, lessons: [
      { title: "التسويق الشخصي للمصمم", order: 1, duration: 3000 },
      { title: "بناء البراند الشخصي", order: 2, duration: 2700 },
      { title: "إزاي تسعّر شغلك", order: 3, duration: 2400 },
    ]},
    { title: "مشروع التخرج والبورتفوليو", order: 8, lessons: [
      { title: "بناء بورتفوليو احترافي", order: 1, duration: 3600 },
      { title: "مشروع التخرج", order: 2, duration: 3600 },
    ]},
    { title: "أدوات إضافية", order: 9, lessons: [
      { title: "InDesign للمبتدئين", order: 1, duration: 2400 },
      { title: "كانفا — حيل واختصارات", order: 2, duration: 1800 },
    ]},
  ];

  for (const mod of modulesData) {
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: mod.title,
        order: mod.order,
      },
    });

    for (const lesson of mod.lessons) {
      await prisma.lesson.create({
        data: {
          courseId: course.id,
          moduleId: module.id,
          title: lesson.title,
          order: lesson.order,
          duration: lesson.duration,
          isFree: lesson.isFree || false,
        },
      });
    }
  }

  // ============ الكورس المجاني (Lead Magnet) ============
  const freeCourse = await prisma.course.upsert({
    where: { slug: "free-design-roadmap-2026" },
    update: {
      thumbnail: "/images/freecourse.png",
    },
    create: {
      slug: "free-design-roadmap-2026",
      title: "من صفر لأول شغلانة تصميم — خريطة طريق 2026",
      thumbnail: "/images/freecourse.png",
      shortDescription:
        "كراش كورس مجاني — 4 محاضرات هتفهّمك يعني إيه تصميم وإزاي AI غيّر اللعبة وإزاي تبدأ تكسب فعلاً.",
      description: `الكورس ده مش مقدمة مملة ومش كلام نظري.

4 محاضرات مركّزة هيخلّوك تفهم:
- يعني إيه تصميم جرافيك فعلاً في 2026
- إزاي AI بقى جزء أساسي من شغل المصمم
- إيه خريطة الطريق اللي تمشي عليها عشان توصل لأول شغلانة
- إزاي ناس عادية بدأت تكسب فلوس حقيقية من التصميم

زكاة علم — مجاني للأبد.`,
      category: "تصميم جرافيك",
      level: "BEGINNER",
      price: 0,
      comparePrice: 150000, // قيمته 1500 جنيه
      duration: 5400, // ~90 دقيقة
      isPublished: true,
      isFeatured: false,
      publishedAt: new Date(),
      instructorId: admin.id,
    },
  });

  const freeLessons = [
    {
      title: "يعني إيه تصميم جرافيك في 2026؟",
      description: "هنكسر كل الأفكار الغلط عن التصميم ونفهم السوق الحقيقي.",
      order: 1,
      duration: 1200,
      isFree: true,
    },
    {
      title: "AI غيّر اللعبة — المصمم الذكي بيكسب أكتر",
      description: "إزاي تستخدم AI عشان تبقى أسرع 10 مرات من أي مصمم تاني.",
      order: 2,
      duration: 1500,
      isFree: true,
    },
    {
      title: "خريطة الطريق — من صفر لأول شغلانة",
      description: "خطوة بخطوة: إيه اللي تتعلمه، إمتى، وإزاي تلاقي أول client.",
      order: 3,
      duration: 1500,
      isFree: true,
    },
    {
      title: "ناس عادية بدأت تكسب — وإنت كمان تقدر",
      description: "قصص حقيقية لناس بدأت من صفر ودلوقتي بتكسب من التصميم.",
      order: 4,
      duration: 1200,
      isFree: true,
    },
  ];

  // نضيف الدروس لو الكورس لسه جديد (مفيهوش دروس)
  const existingLessons = await prisma.lesson.count({ where: { courseId: freeCourse.id } });
  if (existingLessons === 0) {
    for (const lesson of freeLessons) {
      await prisma.lesson.create({
        data: {
          courseId: freeCourse.id,
          title: lesson.title,
          description: lesson.description,
          order: lesson.order,
          duration: lesson.duration,
          isFree: lesson.isFree,
        },
      });
    }
  }

  console.log("Seed done! Admin: admin@ameen.academy / Admin@2026");
  console.log(`Free course: ${freeCourse.slug} (${freeLessons.length} lessons)`);
  console.log(`Paid course thumbnail updated to /images/fullcourse.png`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
