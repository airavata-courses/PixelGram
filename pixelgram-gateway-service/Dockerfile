FROM node:15.11.0-alpine

RUN mkdir /gateway-service

COPY ./app /gateway-service

RUN adduser -D pixelgram
RUN chown pixelgram /gateway-service
USER pixelgram

WORKDIR /gateway-service

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node" ]

CMD [ "index.js" ]