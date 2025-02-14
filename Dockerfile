FROM node:18.20.5-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

# production stage
FROM node:18.20.5-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

# 环境变量
ENV NODE_ENV production

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run","start:prod"]