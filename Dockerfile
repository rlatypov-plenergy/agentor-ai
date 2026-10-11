FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_SHOW_DRAFTS=1
RUN pnpm build

# Static export served by Caddy (same shape as production nginx)
FROM caddy:2-alpine
COPY --from=build /app/out /srv
# /api/lead.php is PHP in production; locally Caddy mocks it (dev mode, nothing is sent).
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
