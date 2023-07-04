FROM node:16 as builder

WORKDIR /web

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=builder /web/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf