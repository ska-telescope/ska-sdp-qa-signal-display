FROM node:14-slim
#WORKDIR /usr/src/display-ui

#COPY package.json tsconfig.json package-lock.json .eslintrc ./
#COPY public public
#COPY src src

ARG REACT_APP_API
ENV REACT_APP_API=${REACT_APP_API}
ARG REACT_APP_WS
ENV REACT_APP_WS=${REACT_APP_WS}

# FROM node:14-slim

WORKDIR /usr/src/display-ui
COPY . .
RUN npm install

## production build and start
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

## start development server without building
# RUN npm install -g create-react-app
# CMD ["npm", "start"]
