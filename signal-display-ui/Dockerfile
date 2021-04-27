FROM node:14

WORKDIR /usr/src/signal-display-ui

COPY ./package.json /usr/src/signal-display-ui/package.json
COPY ./.env /usr/src/signal-display-ui/.env
COPY ./public /usr/src/signal-display-ui/public
COPY ./src /usr/src/signal-display-ui/src

# dependencies
RUN npm install

CMD ["npm", "start"]