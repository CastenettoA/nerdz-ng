# docker build -t nerdz-ng-fe-dev/0.1 -f DockerfileDev . 

FROM node:16-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build 

# Serve application using Nginx Server as a static content instad of
# serving the application using CMD, with results in improved performance 
# and scalability.

FROM nginx:alpine 

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80