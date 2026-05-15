"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// لو مفيش GA ID — مش بنحمّل أي حاجة
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document.title,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

// ============ أحداث مخصصة للتتبع ============

// تتبع عرض صفحة كورس
export function trackCourseView(courseId: string, courseName: string, price: number) {
  if (typeof window === "undefined" || !GA_ID) return;
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "view_item", {
    currency: "EGP",
    value: price / 100,
    items: [{ item_id: courseId, item_name: courseName }],
  });
}

// تتبع بداية الشراء
export function trackBeginCheckout(courseId: string, courseName: string, price: number) {
  if (typeof window === "undefined" || !GA_ID) return;
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "begin_checkout", {
    currency: "EGP",
    value: price / 100,
    items: [{ item_id: courseId, item_name: courseName }],
  });
}

// تتبع إكمال الشراء
export function trackPurchase(courseId: string, courseName: string, price: number, transactionId: string) {
  if (typeof window === "undefined" || !GA_ID) return;
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "purchase", {
    currency: "EGP",
    value: price / 100,
    transaction_id: transactionId,
    items: [{ item_id: courseId, item_name: courseName }],
  });
}

// تتبع تسجيل حساب جديد
export function trackSignUp() {
  if (typeof window === "undefined" || !GA_ID) return;
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "sign_up", {
    method: "email",
  });
}
