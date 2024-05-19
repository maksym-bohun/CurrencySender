FROM node:19.5.0-alpine
WORKDIR /server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ .
ENTRYPOINT npm run start