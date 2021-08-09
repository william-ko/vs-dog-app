# pull official base image
FROM node:latest as base

# set working directory
WORKDIR /app

# set env variables
ARG REACT_APP_DOG_API_URL
ENV REACT_APP_DOG_API_URL $REACT_APP_DOG_API_URL

# install app dependencies
COPY ./client ./
COPY ./client/package*.json ./
RUN npm install
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/build /usr/share/nginx/html