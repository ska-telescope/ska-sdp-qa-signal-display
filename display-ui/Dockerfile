FROM node:14-slim as build

WORKDIR /usr/src/display-ui

COPY package.json tsconfig.json ./
COPY .env-production .env
COPY public public
COPY src src

RUN npm install
RUN npm run build

FROM node:14-slim

WORKDIR /usr/src/display-ui

COPY --from=build /usr/src/display-ui/build build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
