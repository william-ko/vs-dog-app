## Vetspire Dog App

This application presents a list of dog "profiles". Each profile can be viewed, edited and deleted. Profiles can also be uploaded by going to the "Create A Dog Profile" tab, filling out the form and uploading a picture.

### Features
+ NodeJS backend (TypeScript)
+ React frontend (TypeScript)
+ NGINX reverse proxy server
+ Postgres database
+ Docker compose for service management


### Design
This was designed with simplicity in mind, it's a simple application that needed a simple architecture. Keeping responsibilities singular, with services and components that can easily be expanded upon. 

[![dog-app-1.png](https://i.postimg.cc/7YctK9dr/dog-app-1.png)](https://postimg.cc/2VQx6QC0)

----------

### Running locally:
Pull this branch and cd into the root directory of the project.
<br>

run `docker-compose --version` to be sure you have docker-compose installed. If it's not installed, visit the following link for instructions: https://docs.docker.com/compose/install/
<br>

Create environment file (wouldn't normally include passwords and what not):
<br>
`touch .env && cp .env-sample .env`
<br>

Export the variables for Docker compose:
<br>
`export PGUSER=postgres PGHOST=dog-app-db PGPASSWORD=postgres PGDATABASE=vetspire-dogs-database REACT_APP_DOG_API_URL=http://127.0.0.1:80 PORT=8081`
<br>

Build the images and run the containers:
<br>
`docker-compose up --build -d`
<br>

Open up the application in your browser at `http://localhost:3000`

Stop containers:
<br>
`docker-compose down`

