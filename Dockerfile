FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN npm run webpack

CMD [ "npm", "start" ]
