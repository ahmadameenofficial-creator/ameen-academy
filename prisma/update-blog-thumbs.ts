import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

const updates = [
  { id: "cmp8q3vnb000henb0cyc347bg", thumbnail: "/images/blog/content-writing.jpg" },
  { id: "cmp8q3vjc000fenb0x36a4fxf", thumbnail: "/images/blog/marketing-egypt.jpg" },
  { id: "cmp8q3vfj000denb0o88ngvdi", thumbnail: "/images/blog/portfolio-tips.jpg" },
  { id: "cmp8q3vbp000benb056erhtd6", thumbnail: "/images/blog/ai-30-days.jpg" },
  { id: "cmp8q3v7r0009enb01c6cj2jt", thumbnail: "/images/blog/upwork-egypt.jpg" },
  { id: "cmp8q3uvy0007enb04kjqidpf", thumbnail: "/images/blog/top-skills-2026.jpg" },
];

async function main() {
  for (const u of updates) {
    const r = await p.blogPost.update({
      where: { id: u.id },
      data: { thumbnail: u.thumbnail },
    });
    console.log(`OK: ${r.title.substring(0, 45)} -> ${u.thumbnail}`);
  }

  // تأكيد
  const nullCount = await p.blogPost.count({ where: { thumbnail: null } });
  console.log(`\nPosts without thumbnail: ${nullCount}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => p.$disconnect());
