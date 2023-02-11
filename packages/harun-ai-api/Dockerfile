FROM node:hydrogen-slim as base

WORKDIR /home/node/app

COPY package.json ./

COPY .swcrc ./

RUN yarn install

COPY ./src ./src

RUN yarn build

FROM node:hydrogen-slim  as prod

WORKDIR /home/node/app

COPY --from=base /home/node/app/yarn.lock ./

COPY --from=base /home/node/app/dist ./dist

COPY package.json ./

RUN yarn install --production

COPY ./prisma ./prisma

RUN yarn prisma generate