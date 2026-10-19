# jeamxn workspace

Read agent.md and docs/architecture.md, development.md, content.md, deployment.md.

Root README.md is the owner's GitHub profile README. Preserve it byte-for-byte;
portfolio development/deployment documentation belongs in docs/portfolio.md, not
the root README. Do not replace the profile with project setup documentation.
This is an independent public portfolio, not a copy of private product source.

Static React Router app only. There is no backend, API client, AI response panel,
FAQ runtime, service key or database. Public AI project stories remain content.
packages/contract owns public-content Zod types; packages/core owns public copy.
packages/resume-pdf is Node/build-only and creates resume.pdf before publication.
Never import the PDF generator into browser code or restore subset fonts that lose glyphs.

GitHub Pages uploads only apps/web/build/client. Match RR basename, Vite base,
raw asset URLs and metadata for / and /jeamxn/. Every public route is prerendered;
unknown files/routes return real404, not index.html200. Keep root docker-compose.yml
for optional existing Dokploy compatibility, but it now serves static web only.
No private research, company links, credentials or user documents enter the build.

No cross-feature imports; compose in routes. Prefer ~/* web imports.
Run pnpm build, typecheck, lint, test, test:static and strict static browser QA.
Test actual PDF download rendering, not just extracted text. Do not stop unrelated
ara/lily processes, publish, push, enable Pages or change DNS without approval.
