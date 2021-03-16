FROM python:3.8.2
COPY . /docker-image-service
WORKDIR /docker-image-service

RUN pip install -r requirements.txt

EXPOSE 5006

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]