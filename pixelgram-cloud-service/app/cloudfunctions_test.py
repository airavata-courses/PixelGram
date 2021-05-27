import pytest
import io
from unittest import mock
from werkzeug.utils import secure_filename
import tempfile
from werkzeug.datastructures import FileStorage
from gdrive import files_to_be_uploaded, view_file, download_multiple_files
from PIL import Image
# from rabbitmq import producerMQ, consumerMQ
# from config import USER_TO_IMAGE_QUEUE, METADATA_QUEUE

imageid="1-OM-IjSMX8EgMULqNYrD5HkYLfizRZ2m"
imageids=["11iuoRE8npbuv7NXTEbf5VtwAAbF8taYq", "1G6Q5Pu35JUO148-5TtvFZ0MGDSHD6juw", "1iPgVxIK3EkO1iMpIOMftsJ_CLl96zAJ9"]
userid="462571b-a81a-4d28-b2f7-ce0b116e38db"
sharedtoids=["4179e5b4-7a7a-4f38-8f40-1f731a6ce723"]
username="sra"
password="1234"
latitude=10
longitude=20
locationname="Hyderabad"

f1=open("sample1.jpg",'r')

with open("sample1.jpg", 'rb') as f:
    img = Image.open(io.BytesIO(f.read()))
tf=tempfile.TemporaryFile()
a=FileStorage(stream=tf,filename="sample1.jpg")
#a=mock.Mock(return_values=None)

def test_files_to_be_uploaded():
    userproducermq = mock.Mock(return_values=None)
    metadataproducermq = mock.Mock(return_values=None)
    temp=files_to_be_uploaded(a,userid, userproducermq, metadataproducermq)
    assert (temp.success is not None)

if __name__ == "__main__":
    test_files_to_be_uploaded()
    print("Everything passed")

