FROM node:20.12.2 AS dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

CMD ["yarn", "start"]

FROM dev AS builder

RUN ENV_TYPE_FILE=env_scripts/env_config \
    ENV_JS_OUTPUT_LOCATION=src/env.ts \
        bash env_scripts/env_config.sh ts && \
    yarn webpack build \
    --mode production \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --output-clean \
    --output-path /dist/

FROM nginx:1.27.0 AS final

# Copy built files
COPY env_scripts/env_config /env_config
COPY env_scripts/env_config.sh /docker-entrypoint.d/
RUN chmod 777 /docker-entrypoint.d/env_config.sh
COPY --from=builder /dist/* /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf