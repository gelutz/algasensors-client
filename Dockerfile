# Build stage
FROM node:21-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npm run build:docker

# Runtime stage - Caddy
FROM caddy:2-alpine
WORKDIR /app
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/algasensors-client /app/dist

EXPOSE 80
ENTRYPOINT ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
