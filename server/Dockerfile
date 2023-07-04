FROM node:16

WORKDIR /api

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

COPY .env ./dist

WORKDIR ./dist

EXPOSE 5000
CMD ["yarn", "start:migrate:prod"]
