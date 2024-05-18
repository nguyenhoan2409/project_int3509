FROM node:latest as build-stage
WORKDIR /app
COPY ./ .
RUN npm install
RUN npm run build-src
ENTRYPOINT [ "node", "build/server.js" ]