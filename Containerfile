FROM oven/bun:alpine AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install

# Stage 2: Build the NextJS application
FROM deps AS builder
COPY . .
# We use the standalone output feature configured in next.config.js
RUN bun run build

# Stage 3: Development target (Watch mode)
FROM deps AS dev
COPY . .
CMD ["bun", "run", "dev"]

# Stage 4: Production Runner
FROM base AS runner
ENV NODE_ENV=production

# Next.js standalone output contains its own isolated node_modules and server file
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["bun", "run", "server.js"]
