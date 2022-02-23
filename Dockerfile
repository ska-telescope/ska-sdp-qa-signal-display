FROM node:16.14.0-slim

ARG REACT_APP_API
ENV REACT_APP_API=${REACT_APP_API}
ARG REACT_APP_WS
ENV REACT_APP_WS=${REACT_APP_WS}
ARG REACT_APP_ENV
ENV REACT_APP_ENV=${REACT_APP_ENV}

WORKDIR /usr/src/qa-display
# Use changes to package.json to force Docker not to use the cache
# when we change our application’s nodejs dependencies:
# COPY package.json ./
COPY . .
# RUN npm install -g npm@latest
RUN rm -rf node_modules
RUN yarn install --network-timeout 1000000


## production build and start
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]

## start development server without building
# RUN npm install -g create-react-app
# CMD ["npm", "start"]

CMD if [ ${REACT_APP_ENV} = production ];  \
	then \
		yarn install -g http-server && \
		yarn build && \
		cd build && \
		hs -p 3000; \
	else \
		yarn start; \
	fi
