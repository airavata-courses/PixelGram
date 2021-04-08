FROM python:3.8.2-alpine as builder

# uWSGI needs a c-compiler, which results in a container of ~340 mb
RUN apk add --no-cache linux-headers build-base

# This dependencies are requried to install Pillow libary
# RUN apk update \ && apk upgrade
# RUN apk --update add libxml2-dev libxslt-dev libffi-dev gcc musl-dev libgcc openssl-dev curl
# RUN apk add jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev
RUN apk add --no-cache gcc libc-dev jpeg-dev zlib-dev libjpeg-turbo-dev


RUN mkdir /install
WORKDIR /install

COPY requirements.txt /requirements.txt

RUN pip install --upgrade pip

RUN pip install --prefix=/install -r /requirements.txt

# This is the actual container without compilers (~100 mb)
FROM python:3.8.2-alpine

# Copy the compiled modules from the builder to the actual container
COPY --from=builder /install /usr/local

# Copy my flask code
COPY ./app /metadata-service

# Create a non-root user
RUN adduser -D pixelgram
# It needs ownership of the workdir to update the sqlite database
RUN chown pixelgram /metadata-service
USER pixelgram

WORKDIR /metadata-service

EXPOSE 5006

CMD ["uwsgi", "--ini", "conf.ini"]