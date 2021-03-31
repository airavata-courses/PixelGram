FROM node:15.11.0-alpine

COPY . /docker-gateway-service
WORKDIR /docker-gateway-service

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]