# Ahmad Ameen portfolio

Bilingual freelance portfolio with a React + Three.js Horizon hero and the supplied Glass Folder Cards component.

## Run

- `npm ci`
- `npm run build`
- `npm run dev` (static server on port 4173)
- `npx tsc --noEmit`

`index.html` loads the compiled `bundle.js` and the local CSS/assets. Rebuild after changing React source. Deployment can serve this folder as a static site; no database, credentials or external CDN scripts are required. Never serve the repository root or node_modules publicly.

## Supplied components

- `components/ui/horizon-hero-section.jsx`: adapted from the user's supplied Horizon component; heavy local Arabic type, CSS entrances and deferred loading of `horizon-scene.js`; the star/nebula/mountain scene, bounded camera movement, mobile resource limits and WebGL fallback are retained.
- `components/ui/glass-folder-cards.tsx`: the supplied self-contained React/TypeScript component, integrated into individual project folders; no unrelated demo files, add-file or destructive menu actions.
- `main.tsx`: 14 project folders, category filters, bilingual names, current theme, Luqaimah and Zhalwa case studies. Twelve Behance project links come from the user's portfolio reference. Folder artwork for projects without local photographs is decorative, not a reproduction of their work.

## Assets and content

Luqaimah: all 18 PNGs supplied by the user are optimized as local WebP files (`assets/manifest.json`). The current portrait is the exact white-shirt portrait embedded in the original user-supplied HTML and subsequently shown by the user in chat. Fonts come from the repository's existing public fonts.

Zhalwa: all 13 original JPEGs supplied in the ZIP are optimized as local WebP files. The case study has one opening image and 12 unique images across four chapters, a dedicated keyboard-accessible lightbox, and a real packaging cover. See `assets/zhalwa-manifest.json` for the source filenames. No project role, results or pricing is invented. Behance project folders link to full projects on Behance; their images have not been downloaded.

WhatsApp: confirmed +20 109 091 2747. The user-provided Vercel preview is https://ameen-portfolio-mocha.vercel.app/. Custom-domain DNS and live deployment readiness must be verified separately.

## Review revision 3

A clear direct project button, optional front cover, post-hero quotation, glass portrait treatment, and a curated Luqaimah case study were added. The user-supplied 10-second film is encoded as local H.264/AAC at 720×1280 with faststart; playback is opt-in and pauses on modal close. Luqaimah has 18 images total: one opening image and 17 across four chapters. Each opens the lightbox. Six original Behance cover URLs from the old portfolio were added, but current network policy prevents downloading them. Six other Behance covers remain missing; Zhalwa images were subsequently supplied and integrated. `PREPUBLICATION_REVIEW.ar.md` is the substantive prepublication review; not all Behance project cover images are complete.

## Mobile-first revision 4

The folder grid uses two columns on phones. A ResizeObserver sizes each folder from its card's actual content width, and the open animation is bounded to prevent horizontal panning. Tested in Arabic and English at 320, 360, 375, 390, 414, 430, 700 and 768 CSS pixels. Zhalwa's four chapter groups now contain all 13 supplied photos. A separate Vercel static build now outputs only runtime files into `dist`; the Academy TypeScript project excludes `apps/portfolio` so each app uses its own toolchain.

## Typography, motion and loading revision

The post-hero section now shows the white-shirt portrait first and the quote below it (17px on phones); the red portrait accompanies a four-step career timeline. Arabic hero type uses local Alexandria Black 900 (SIL OFL). Body fonts use local WOFF2. Instagram and LinkedIn links are in the footer.

The main React/UI bundle is about 236 KB raw instead of 834 KB (about 72% smaller); the preserved 3D scene is a separate roughly 527 KB script scheduled after the browser is idle. This is not a claim that total page load time improved by 72%. Visitors requesting reduced motion do not load the GPU scene. Folder renderers and generated artwork mount only near the viewport. Folder entrances replay on re-entry, and glass highlights/tilt respond to scroll in either direction, including on mobile. Visible portraits share one requestAnimationFrame-throttled listener; off-screen portraits do not update.

Verified locally: both locales at 320/390/430px without horizontal overflow; two-column phone grid; replay on upward/downward scrolling; mouse hover; mobile scroll-linked glass; reduced motion; all 18 Luqaimah and 13 Zhalwa photos; Luqaimah film playback and pause on modal close. Live Vercel deployment status remains unverified from the environment.
