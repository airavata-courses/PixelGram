FROM node:13.12.0-alpine as build
RUN mkdir /ui-service
COPY ./app /ui-service
WORKDIR /ui-service
RUN npm install --unsafe-perm=true --allow-root
RUN npm install react-scripts@3.4.1 -g --silent
ENV PATH ./node_modules/.bin:$PATH
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /ui-service/build /usr/share/nginx/html
# Create a non-root user
# RUN adduser -D pixelgram
# It needs ownership of the workdir to update the sqlite database
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx
# USER pixelgram
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]