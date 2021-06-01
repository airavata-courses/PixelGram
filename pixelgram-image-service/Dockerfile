FROM python:3.8.2-alpine as builder

# uWSGI needs a c-compiler, which results in a container of ~340 mb
RUN apk add --no-cache linux-headers build-base

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
COPY ./app /image-service

WORKDIR /image-service

RUN touch database.db
RUN chmod 777 database.db
RUN python setup.py

EXPOSE 5005

CMD ["uwsgi", "--ini", "conf.ini"]
