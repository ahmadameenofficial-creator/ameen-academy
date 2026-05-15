// ============ JSON-LD Structured Data ============
// بيساعد Google يفهم المحتوى ويعرضه في Rich Results

import { SITE_CONFIG } from "./constants";

const BASE_URL = SITE_CONFIG.url;

// ============ Organization Schema ============
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Ameen Academy",
    alternateName: "أكاديمية أمين",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.svg`,
    description: "منصة تعليمية عربية تعلمك المهارات اللي تجيبلك فلوس — تصميم جرافيك، ذكاء اصطناعي، فريلانس، ومهارات حديثة مطلوبة في سوق العمل 2026",
    foundingDate: "2026",
    founder: {
      "@type": "Person",
      name: "عمرو أمين",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: "Cairo",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 30.0444,
        longitude: 31.2357,
      },
      geoRadius: "5000",
    },
    sameAs: [
      SITE_CONFIG.links.facebook,
      SITE_CONFIG.links.youtube,
      SITE_CONFIG.links.twitter,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@ameenacademy.com",
      availableLanguage: ["Arabic", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============ Website Schema + SearchAction ============
export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ameen Academy",
    alternateName: "أكاديمية أمين",
    url: BASE_URL,
    inLanguage: "ar",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============ Course Schema ============
interface CourseSchemaProps {
  title: string;
  description: string;
  slug: string;
  thumbnail?: string | null;
  price: number; // بالقرش
  comparePrice?: number | null;
  duration: number; // بالثانية
  totalLessons: number;
  rating?: number;
  ratingCount?: number;
  enrollmentCount?: number;
  instructorName: string;
  category: string;
  level: string;
  publishedAt?: Date | null;
  updatedAt?: Date;
}

export function CourseSchema(props: CourseSchemaProps) {
  const priceEGP = props.price / 100;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: props.title,
    description: props.description,
    url: `${BASE_URL}/courses/${props.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Ameen Academy",
      url: BASE_URL,
    },
    instructor: {
      "@type": "Person",
      name: props.instructorName,
    },
    inLanguage: "ar",
    courseMode: "online",
    isAccessibleForFree: false,
    educationalLevel: props.level === "BEGINNER" ? "Beginner" : props.level === "INTERMEDIATE" ? "Intermediate" : "Advanced",
    about: {
      "@type": "Thing",
      name: props.category,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.round(props.duration / 3600)}H`,
      instructor: {
        "@type": "Person",
        name: props.instructorName,
      },
    },
    offers: {
      "@type": "Offer",
      price: priceEGP,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/courses/${props.slug}/checkout`,
      validFrom: props.publishedAt?.toISOString(),
    },
    numberOfCredits: props.totalLessons,
  };

  // الصورة
  if (props.thumbnail) {
    data.image = props.thumbnail;
  }

  // التقييمات
  if (props.rating && props.rating > 0 && props.ratingCount && props.ratingCount > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: props.rating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: props.ratingCount,
    };
  }

  // تاريخ النشر
  if (props.publishedAt) {
    data.datePublished = props.publishedAt.toISOString();
  }
  if (props.updatedAt) {
    data.dateModified = props.updatedAt.toISOString();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============ FAQ Schema ============
interface FaqItem {
  q: string;
  a: string;
}

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============ BreadcrumbList Schema ============
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
