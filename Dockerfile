FROM node:lts-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

FROM node:lts-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine AS prisma-tools
WORKDIR /tools
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./lock
RUN v() { node -p "require('./lock/$1/package.json').version"; } \
	&& npm init -y > /dev/null \
	&& npm install --omit=peer \
		prisma@$(v prisma) \
		tsx@$(v tsx) \
		dotenv@$(v dotenv) \
		@prisma/client@$(v @prisma/client) \
		@prisma/adapter-pg@$(v @prisma/adapter-pg) \
	&& rm -rf lock ~/.npm \
	&& find node_modules/@prisma/client/runtime -regex '.*\.\(sqlserver\|cockroachdb\|mysql\|sqlite\)\..*' -delete

FROM node:lts-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=prisma-tools /tools/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma.config.ts /app/tsconfig.json ./

COPY --chmod=755 docker-entrypoint.sh ./
RUN mkdir -p .next/cache && chown node:node .next/cache

USER node

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
