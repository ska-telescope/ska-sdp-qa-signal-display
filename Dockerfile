FROM node:14-slim

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
RUN npm install -g yarn
RUN rm -rf node_modules
RUN yarn install


## production build and start
# RUN yarn build
# RUN yarn install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]

## start development server without building
# RUN yarn install -g create-react-app
# CMD ["yarn", "start"]

CMD if [ ${REACT_APP_ENV} = production ];  \
	then \
		yarn install -g http-server && \
		yarn build && \
		cd build && \
		hs -p 3000; \
	else \
		yarn start; \
	fi
