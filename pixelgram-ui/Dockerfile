FROM node:13.12.0-alpine as build
RUN mkdir /ui-service
COPY ./app /ui-service
WORKDIR /ui-service
RUN npm install --unsafe-perm=true --allow-root
RUN npm install react-scripts@3.4.1 -g --silent
ENV PATH ./node_modules/.bin:$PATH
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx
RUN chmod -R 777 /var/log/nginx/ /var/cache/nginx/ /etc/nginx/ /var/run/
RUN rm -rf /usr/share/nginx/html/* 
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf 
COPY --from=build /ui-service/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]