# Build image on host (windows only):
#  docker buildx build --load --platform linux/arm64 -t ur-web:<version> .
#  docker save -o D:\Programmieren\Docker\Images\Main-Website\ur-web-<version>.tar main-web
#  docker load -i ./ur-web-<version>.tar
# Build image on remote:
#  docker build -t ur-web:<version> .
# Update the container:
#  docker stop ur-web
#  docker rm ur-web
#  docker run -d -p 3000:3000 --restart unless-stopped --name ur-web ur-web:<version>
# With docker compose:
#  docker compose up -d --build

FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Schema push + seed happen at container start (they need a live DB), not here.
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npx", "next", "start"]
