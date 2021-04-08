FROM node:13.12.0-alpine

RUN mkdir /ui-service

COPY ./app /ui-service

WORKDIR /ui-service

RUN npm install --silent

ENV PATH ./node_modules/.bin:$PATH

CMD ["npm", "start"]

EXPOSE 3000