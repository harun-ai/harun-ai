FROM node:gallium-slim as base

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

COPY ./src ./src

RUN yarn build

FROM node:gallium-slim  as prod

WORKDIR /home/node/app

COPY --from=base /home/node/app/yarn.lock ./

COPY --from=base /home/node/app/dist ./dist

RUN yarn install --production

CMD ["./dist/bundle"]