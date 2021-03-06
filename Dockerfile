FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install
RUN yarn build

EXPOSE 3456
CMD yarn start
