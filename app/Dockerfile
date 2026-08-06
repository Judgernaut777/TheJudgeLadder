# AIJL webapp — all-in-one image (frontend build + bundled API server).
# The container needs a MySQL-compatible database; see docker-compose.yml
# for the batteries-included local setup.

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# package*.json picks up package-lock.json when present (source exports
# may omit it); prefer the reproducible npm ci path when it is.
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
# Produces dist/public (frontend) and dist/boot.js (fully bundled API server).
RUN npm run build
# Offline migration files for boot-time schema setup.
RUN npm run db:generate || true

# ---- Runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The API server is fully bundled (dependencies included) by the build.
COPY --from=build /app/dist ./dist
COPY --from=build /app/db/migrations ./db/migrations

EXPOSE 3000
# Migrations apply automatically at boot before the server listens.
CMD ["node", "dist/boot.js"]
