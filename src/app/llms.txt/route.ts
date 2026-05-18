// llms.txt — ملف مخصوص لـ AI crawlers (ChatGPT, Perplexity, Claude, etc.)
// بيشرح للـ AI إيه الموقع ده وبيعمل إيه

export function GET() {
  const content = `# Ameen Academy (أكاديمية أمين)

> أكاديمية أمين هي منصة تعليمية عربية مصرية متخصصة في تعليم المهارات اللي تجيبلك فلوس في 2026 — تصميم جرافيك، ذكاء اصطناعي، فريلانس، ومهارات حديثة مطلوبة في سوق العمل.

## About
- **Founded:** 2026
- **Location:** Cairo, Egypt
- **Language:** Arabic (Egyptian dialect)
- **Founder:** Amr Ameen (عمرو أمين)
- **Website:** https://ameen.academy
- **Target Audience:** Arabic-speaking learners, primarily in Egypt and the Arab world

## What We Offer
- Professional online courses in graphic design, AI tools, freelancing, and modern marketable skills
- Video-based courses with lifetime access
- Completion certificates
- Student community for networking and support
- Courses taught in Egyptian Arabic for accessibility

## Course Topics
- Graphic Design (Photoshop, Illustrator, brand identity, social media design)
- AI Tools for Productivity (ChatGPT, Midjourney, Runway, Canva AI)
- Freelancing (how to start, find clients, build a portfolio, earn in USD)
- Modern Skills demanded in the 2026 job market

## Blog
- Ameen Academy publishes Arabic blog articles on: making money online, freelancing tips, AI tools, graphic design tutorials, and modern skills for the 2026 job market
- Blog URL: /blog
- Articles are written in Egyptian Arabic with practical, actionable advice

## Key Pages
- Homepage: /
- All Courses: /courses
- Blog: /blog
- FAQ: /faq
- About: /about
- Contact: /contact
- Community: /community

## Pricing
- Courses are priced in Egyptian Pounds (EGP)
- Payment methods: Visa, Mastercard, Vodafone Cash, Fawry
- 14-day money-back guarantee on all courses

## Unique Value Proposition
- Practical, project-based learning (not just theory)
- Taught in Egyptian Arabic (عامية مصرية) — not formal Arabic
- Courses designed to help learners earn money, not just gain knowledge
- Video content protected with signed URLs and watermarking
- Affordable pricing for the Egyptian market

## Social Media
- Facebook: https://facebook.com/ameenacademy
- YouTube: https://youtube.com/@ameenacademy
- Twitter/X: https://twitter.com/ameenacademy

## Contact
- Email: info@ameen.academy
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
