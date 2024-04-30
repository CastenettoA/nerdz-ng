# docker build -t nerdz-ng-fe-dev/0.1 -f DockerfileDev . 

# find a more lightweight solution
FROM node:20-alpine AS builder

WORKDIR /app

COPY ../ .

RUN npm install

RUN npm run build 
# RUN npm run build --prod

# Serve application using Nginx Server as a static content instad of
# serving the application using CMD, with results in improved performance 
# and scalability.

FROM nginx:alpine 

COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 4200