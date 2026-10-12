# Docker Engine 23+ / BuildKit is required for the pnpm cache mount.
# One build graph; runtime targets do not install packages or receive AI secrets.
FROM node:24.16.0-bookworm-slim AS build
WORKDIR /workspace
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/server/package.json ./apps/server/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/contract/package.json ./packages/contract/package.json
COPY packages/api/package.json ./packages/api/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/token/package.json ./packages/token/package.json
COPY packages/icon/package.json ./packages/icon/package.json
COPY packages/ui/package.json ./packages/ui/package.json
RUN --mount=type=cache,id=jeamxn-pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build \
    && pnpm --filter @jeamxn/server deploy --legacy --prod /out/server \
    && rm -rf /out/server/src /out/server/test /out/server/.turbo \
    && find /out/server/node_modules/.pnpm -type d -name @jeamxn -exec sh -c 'for d do rm -rf "$d"/*/src "$d"/*/test "$d"/*/.turbo; done' sh {} + \
    && test -f /out/server/dist/main.js \
    && test -f apps/web/build/client/index.html \
    && test -f apps/server/asset/fonts/NanumGothic-Regular.ttf

FROM node:24.16.0-bookworm-slim AS server
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /out/server/ ./
COPY --from=build --chown=node:node /workspace/apps/server/asset/fonts/ ./asset/fonts/
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]

FROM nginxinc/nginx-unprivileged:1.28.0-bookworm AS web
COPY infra/nginx.conf /etc/nginx/nginx.conf
COPY infra/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /workspace/apps/web/build/client/ /usr/share/nginx/html/
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:8080/healthz >/dev/null || exit 1
# Avoid upstream entrypoint scripts mutating configuration on a read-only rootfs.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]

FROM valkey/valkey:8.1.3 AS valkey
COPY infra/valkey.conf /usr/local/etc/valkey/valkey.conf
USER valkey
CMD ["valkey-server", "/usr/local/etc/valkey/valkey.conf"]
