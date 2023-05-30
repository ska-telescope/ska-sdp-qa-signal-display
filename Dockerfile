FROM node:16.14.0 

ENV PORT 3333
ENV NODE_OPTIONS --max_old_space_size=2048

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

CMD ["make", "dev-run"]
