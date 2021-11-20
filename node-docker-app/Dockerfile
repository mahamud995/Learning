FROM node:14 as base
WORKDIR /home/node/app
COPY  package.json ./
RUN npm install
COPY . .
ENV NODE_PATH=./build
RUN npm run build 
CMD node app.js
EXPOSE 3000