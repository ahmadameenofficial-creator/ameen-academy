/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vz-*.b-cdn.net" },
      { protocol: "https", hostname: "*.bunnycdn.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "framer-motion"],
  },

  // ============ Security Headers ============
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // منع الصفحة تتحط في iframe (حماية من Clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // منع المتصفح يخمّن نوع الملف
          { key: "X-Content-Type-Options", value: "nosniff" },
          // حماية من XSS (متصفحات قديمة)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // منع تسريب الـ referrer لمواقع خارجية
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // إجبار HTTPS دايماً (سنتين)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // منع المتصفح يستخدم الكاميرا أو الموقع بدون إذن
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Content Security Policy — يسمح بس بالمصادر الموثوقة
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.b-cdn.net https://*.bunnycdn.com https://lh3.googleusercontent.com",
              "frame-src 'self' https://iframe.mediadelivery.net",
              "connect-src 'self' https://www.google-analytics.com https://video.bunnycdn.com https://*.b-cdn.net",
              "media-src 'self' https://*.b-cdn.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
