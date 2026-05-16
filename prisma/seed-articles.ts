import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    slug: "شغل-اونلاين-من-مصر-الدليل-الكامل",
    title: "شغل اونلاين من مصر — الدليل اللي هيوفرلك سنة غلط",
    excerpt: "مش motivation. ده خريطة. هتعرف بالظبط تبدأ إزاي، تتجنب إيه، وفين الفلوس الحقيقية — مش الفلوس بتاعت 'اربح 500$ يومياً وانت نايم.'",
    category: "فريلانس",
    tags: ["شغل اونلاين", "شغل من البيت", "فريلانس مصر", "العمل عن بعد"],
  },
  {
    slug: "الربح-من-الانترنت-2026-الحقيقة",
    title: "الربح من الانترنت في ٢٠٢٦: اللي شغال فعلاً واللي كذب",
    excerpt: "كل يوم بتشوف 'اربح ١٠٠٠$ يومياً بدون رأس مال.' خلّيني أبوظلك الـ fantasy دي وأقولك إيه اللي فعلاً بيجيب فلوس.",
    category: "مهارات",
    tags: ["الربح من الانترنت", "الربح من النت 2026", "شغل اونلاين"],
  },
  {
    slug: "ازاي-تبدأ-فريلانس-من-الصفر",
    title: "إزاي تبدأ فريلانس من الصفر — بدون خبرة وبدون واسطة",
    excerpt: "مش محتاج خبرة. مش محتاج حد يعرفك. مش محتاج فلوس تبدأ بيها. محتاج بس تقرا وتنفّذ. دليل خطوة بخطوة.",
    category: "فريلانس",
    tags: ["فريلانس", "فريلانس من الصفر", "شغل حر", "بداية فريلانس"],
  },
  {
    slug: "افضل-5-مهارات-مطلوبة-2026",
    title: "أفضل ٥ مهارات مطلوبة في ٢٠٢٦ — واحدة منهم هتتعلمها في أسبوع",
    excerpt: "السوق فيه فجوات ضخمة. بيزنسات كتير محتاجة ناس ومش لاقية. والمهارات اللي بتجيب فلوس حقيقية — أبسط مما تتخيّل.",
    category: "مهارات",
    tags: ["مهارات مطلوبة 2026", "أكثر المهارات طلباً", "مهارات تجيب فلوس"],
  },
  {
    slug: "upwork-في-مصر-ليه-90-بيفشلوا",
    title: "Upwork في مصر: ليه ٩٠% بيفشلوا وإيه اللي الـ ١٠% بيعملوه غير",
    excerpt: "Upwork فيه ناس مصرية بتكسب ٣٠٠٠-١٠,٠٠٠$ شهرياً. الفرق مش في Upwork. الفرق في إزاي بتستخدمه.",
    category: "فريلانس",
    tags: ["Upwork", "Upwork مصر", "مشاكل Upwork", "فريلانس"],
  },
  {
    slug: "تعلم-ai-في-30-يوم-خريطة-طريق",
    title: "تعلم الـ AI في ٣٠ يوم — خريطة طريق عملية (مش كلام يوتيوب)",
    excerpt: "مش محتاج تبقى مبرمج. خريطة عملية يوم بيوم هتخلّيك من واحد مش فاهم لواحد بياخد فلوس على AI services.",
    category: "AI",
    tags: ["تعلم AI", "الذكاء الاصطناعي", "كورسات AI", "AI automation"],
  },
  {
    slug: "portfolio-يخلي-العميل-يدفع",
    title: "إزاي تعمل Portfolio يخلّي العميل يدفع قبل ما يسأل عن السعر",
    excerpt: "٩٠% من الـ portfolios مش بتبيع. بتعرض شغل وخلاص. الفرق بين portfolio عادي وportfolio بيبيع — هنا.",
    category: "فريلانس",
    tags: ["portfolio", "بورتفوليو", "Portfolio فريلانسر", "إزاي أعمل portfolio"],
  },
  {
    slug: "التسويق-الالكتروني-في-مصر-الحقيقة",
    title: "التسويق الإلكتروني في مصر: الحقيقة من جوا المجال",
    excerpt: "٨٠% من اللي بيدخلوا التسويق بيفشلوا أول سنة. مش عشان المجال وحش — عشان داخلين بتوقعات غلط.",
    category: "مهارات",
    tags: ["التسويق الإلكتروني", "تعلم تسويق", "ديجيتال ماركتنج", "media buying"],
  },
  {
    slug: "كتابة-المحتوى-20-الف-شهري",
    title: "كتابة المحتوى: المهارة اللي بتجيب ٢٠,٠٠٠ جنيه شهري — وإزاي تبدأ النهارده",
    excerpt: "كل post بتقراه. كل إعلان بيوقفك. كل landing page خلّتك تشتري. وراها كاتب محتوى قبض فلوس عشان كتبها.",
    category: "مهارات",
    tags: ["كتابة المحتوى", "كتابة محتوى", "copywriting", "شغل كتابة"],
  },
  {
    slug: "ليه-كل-اللي-حواليك-بيكسبوا-وانت-لا",
    title: "ليه كل اللي حواليك بيكسبوا من النت وانت لأ — التشخيص الصريح",
    excerpt: "مش عشان أنت أقل. ومش عشان هم أحسن. عشان فيه حاجات بتعملها غلط ومش واخد بالك. ده التشخيص.",
    category: "مهارات",
    tags: ["الربح من النت", "شغل على النت", "فريلانس", "تطوير الذات"],
  },
];

async function main() {
  // Find admin user
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!admin) {
    console.error("مفيش admin user! لازم يكون في admin في الداتابيز.");
    process.exit(1);
  }

  console.log(`Found admin: ${admin.name} (${admin.id})`);

  // Read article content files
  const fs = await import("fs");
  const path = await import("path");
  const articlesDir = path.join(process.cwd(), "articles");

  const files = [
    "01-شغل-اونلاين-من-مصر.md",
    "02-الربح-من-الانترنت-2025.md",
    "03-فريلانس-من-الصفر.md",
    "04-مهارات-مطلوبة-2025.md",
    "05-upwork-في-مصر.md",
    "06-تعلم-AI-في-30-يوم.md",
    "07-portfolio-يخلي-العميل-يدفع.md",
    "08-التسويق-الإلكتروني-من-جوا.md",
    "09-كتابة-المحتوى-20-الف.md",
    "10-ليه-انت-لأ.md",
  ];

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const filePath = path.join(articlesDir, files[i]);

    let content = "";
    try {
      content = fs.readFileSync(filePath, "utf-8");
      // Remove the first heading line (title is already in the model)
      content = content.replace(/^#[^\n]*\n+/, "");
    } catch {
      console.error(`Could not read file: ${files[i]}`);
      continue;
    }

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Check if already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug: article.slug },
    });

    if (existing) {
      console.log(`⏭️  Already exists: ${article.title}`);
      continue;
    }

    await prisma.blogPost.create({
      data: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content,
        category: article.category,
        tags: article.tags,
        authorId: admin.id,
        isPublished: true,
        isFeatured: i < 3, // أول ٣ مقالات featured
        readingTime,
        publishedAt: new Date(Date.now() - (articles.length - i) * 24 * 60 * 60 * 1000), // spread over days
      },
    });

    console.log(`✅ Published: ${article.title}`);
  }

  console.log("\n🎉 Done! All articles published.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
