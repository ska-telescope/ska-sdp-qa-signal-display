FROM node:16.14.0 as dev

ENV PORT 3333
ENV NODE_OPTIONS --max_old_space_size=2048

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

CMD ["yarn", "start"]

FROM dev AS builder

RUN yarn webpack build \
    --mode production \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --output-clean \
    --output-path /dist/ && \
    npx react-inject-env set -d /dist/

FROM nginx:1.25.2 as final

# Copy built files
COPY .env /.env
COPY nginx_env_config.sh /docker-entrypoint.d/
RUN chmod 777 /docker-entrypoint.d/nginx_env_config.sh
COPY --from=builder /dist/* /usr/share/nginx/html/
