# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npm run build:prod

# Stage 2: Serve the application from Caddy
FROM caddy:2.7-alpine

WORKDIR /usr/share/caddy

COPY --from=build /app/dist/algasensors-client/browser .
COPY ./Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
