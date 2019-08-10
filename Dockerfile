FROM node:12.8.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

# Bundle app source
COPY . .

RUN chown -fR node:node /usr/src/app
USER node

EXPOSE 3000
CMD [ "yarn", "dev" ]