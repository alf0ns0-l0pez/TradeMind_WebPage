FROM node:latest
EXPOSE 80
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY ./ /app
#RUN npm install -g serve

#docker build -t trademind_page:minerpunk .