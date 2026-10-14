import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/', name: 'سكينة — رفيقك في الذكر', short_name: 'سكينة',
    description: 'أذكارك وعدّاداتك ومحفوظاتك في تطبيق هادئ، بدون إعلانات.',
    start_url: '/', scope: '/', display: 'standalone', lang: 'ar', dir: 'rtl',
    background_color: '#171b20', theme_color: '#171b20',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'أذكار الصباح', url: '/azkar/morning', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'أذكار المساء', url: '/azkar/evening', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'أذكار بعد الصلاة', url: '/azkar/after-prayer', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}
