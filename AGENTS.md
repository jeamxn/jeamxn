# jeamxn workspace

Read docs/architecture.md and docs/development.md.
This is an independent personal portfolio using ara’s stack and layout, not a copy of its private product source.

apps/server is NestJS with domain modules. apps/web is React Router with app/routes, app/feature/<domain>, app/shared/{lib,widget}.
packages/contract owns Zod wire types. packages/api is the typed client. packages/core owns the curated public content used by web, PDF, and assistant. packages/token/icon/ui own visual primitives.
No private interview text, company links, credentials, or user documents may enter the public content.
Do not change the root location of docker-compose.yml: Dokploy uses it.
No cross-feature imports; compose features at routes. Prefer ~/* web imports and #* server imports.
Local ports are web5410/server5411; do not stop ara/lily processes.
Run pnpm build, typecheck, lint, test, and browser QA before proposing deployment.
