FROM node:14-slim

ARG REACT_APP_API
ENV REACT_APP_API=${REACT_APP_API}
ARG REACT_APP_WS
ENV REACT_APP_WS=${REACT_APP_WS}
ARG REACT_APP_ENV
ENV REACT_APP_ENV=${REACT_APP_ENV}

WORKDIR /usr/src/display-ui
COPY . .
RUN npm install

## production build and start
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]

## start development server without building
# RUN npm install -g create-react-app
# CMD ["npm", "start"]

CMD if [ ${REACT_APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi