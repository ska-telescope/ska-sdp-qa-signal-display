FROM node:14-slim as build

WORKDIR /usr/src/display-ui

COPY package.json tsconfig.json package-lock.json .eslintrc ./
COPY public public
COPY src src

ARG API_URL
ENV REACT_APP_API_URL=$API_URL
ARG WS_URL
ENV REACT_APP_WS_URL=$WS_URL

RUN npm install
RUN npm run build

FROM node:14-slim

WORKDIR /usr/src/display-ui

COPY --from=build /usr/src/display-ui/build build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
