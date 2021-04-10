FROM node:13.12.0-alpine

RUN mkdir /ui-service

COPY ./app /ui-service

# Create a non-root user
# RUN adduser -D pixelgram
# It needs ownership of the workdir to update the sqlite database
RUN chmod -R 777 /ui-service

RUN ls -ltr ui-service
# USER pixelgram

WORKDIR /ui-service

RUN npm config set unsafe-perm true

RUN npm install --silent

ENV PATH ./node_modules/.bin:$PATH

CMD ["npm", "start"]

EXPOSE 3000