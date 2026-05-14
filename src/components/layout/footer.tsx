import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandTwitter,
  IconBrandInstagram,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { Logo } from "@/components/shared/logo";
import { ROUTES } from "@/lib/constants";

const footerLinks = {
  المنصة: [
    { href: ROUTES.courses, label: "الكورسات" },
    { href: ROUTES.community, label: "المجتمع" },
    { href: ROUTES.about, label: "عن الأكاديمية" },
  ],
  المساعدة: [
    { href: ROUTES.contact, label: "تواصل معنا" },
    { href: "/faq", label: "الأسئلة الشائعة" },
  ],
  قانوني: [
    { href: "/terms", label: "الشروط والأحكام" },
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/refund", label: "سياسة الاسترجاع" },
  ],
};

const socials = [
  { icon: IconBrandFacebook, href: "#", label: "فيسبوك" },
  { icon: IconBrandYoutube, href: "#", label: "يوتيوب" },
  { icon: IconBrandTwitter, href: "#", label: "تويتر" },
  { icon: IconBrandInstagram, href: "#", label: "إنستجرام" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              منصة تعليمية مصرية متخصصة في التصميم الجرافيكي — هنعلمك تصمم، تبيع شغلك، وتبني اسمك.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ameen Academy. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="mailto:info@ameenacademy.com" className="flex items-center gap-1.5 transition-colors hover:text-brand-600">
              <IconMail className="size-4" />
              info@ameenacademy.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
