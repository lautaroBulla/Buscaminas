# Etapa 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY .env .env

CMD ["node", "dist/src/main.js"]
