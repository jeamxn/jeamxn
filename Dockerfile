FROM node:24.16.0-bookworm-slim AS build
WORKDIR /workspace
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/contract/package.json ./packages/contract/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/resume-pdf/package.json ./packages/resume-pdf/package.json
COPY packages/token/package.json ./packages/token/package.json
COPY packages/icon/package.json ./packages/icon/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN --mount=type=cache,id=jeamxn-pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
ARG JEAMXN_BASE_PATH=/
ARG JEAMXN_SITE_URL=https://jeamxn.dev
RUN JEAMXN_BASE_PATH="$JEAMXN_BASE_PATH" JEAMXN_SITE_URL="$JEAMXN_SITE_URL" pnpm build

FROM nginxinc/nginx-unprivileged:1.28.0-bookworm AS web
COPY infra/nginx.conf /etc/nginx/nginx.conf
COPY infra/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /workspace/apps/web/build/client/ /usr/share/nginx/html/
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:8080/healthz >/dev/null || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
