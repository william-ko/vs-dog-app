FROM node:latest
WORKDIR /usr/app
COPY ./server/package*.json ./
RUN npm install
COPY . ./
EXPOSE 8081
RUN cd ./server && npm run build
CMD ["npm", "run", "start"]
