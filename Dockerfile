FROM node:18-alpine3.20 as build-stage

WORKDIR /app

COPY package.json .

COPY . .

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm i && \
    pnpm build

# production stage
FROM node:18-alpine3.20 as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/tsconfig.json /app/tsconfig.json

WORKDIR /app

# 环境变量
ENV NODE_ENV production

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm
RUN pnpm setup
RUN pnpm i
RUN pnpm add pm2 -g
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "run","start:prod"]