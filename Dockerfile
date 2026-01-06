# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build:prod

# Runtime stage - Caddy
FROM caddy:2-alpine
WORKDIR /app
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/algasensors-client /app/dist

EXPOSE 80
ENTRYPOINT ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
