# Portfolio deployment

This is a separate static site inside the Academy repository.

- Repository: `ahmadameenofficial-creator/ameen-academy`
- Root directory: `apps/portfolio`
- Framework preset: Other
- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Intended domain: `portfolio.ameen.academy`

The Vercel project must be a separate project from the Academy application. If deploying the `portfolio` branch, set this new project's production branch to `portfolio`. Do not change the existing Academy project's root directory or domains.

`vercel.json` contains the tested static build configuration. `dist` contains only runtime HTML, JS, CSS, and assets, not source packages or credentials. Enter the DNS record Vercel actually returns for this project; do not guess the record or change the Academy domain's existing records.

Current limitations: no Vercel CLI authentication is present; requests to api.vercel.com and api.github.com were blocked by the environment's network policy. Deployment, project creation, domain attachment and DNS verification have not been performed. Original Zhalwa image binaries remain missing; its chapter structure is ready, but the full photo gallery is not included. See PREPUBLICATION_REVIEW.ar.md for all incomplete content.
