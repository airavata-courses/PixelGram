import requests
import pytest
import json
username="manoj1111"
shareusernames=["suraj1111"] # seperated by comas
userid=""
imageids=[]
sharedtoids=[]
#from PixelGram.pixelgram-user-service.userservice_test import test_getuserdetails

input={"username":username}
response = requests.post("http://localhost:5003/userdetails",json=input)
response_body = response.json()
userid=response_body["userid"]

for shareusername in shareusernames:
    input={"username":shareusername}
    response = requests.post("http://localhost:5003/userdetails",json=input)
    response_body = response.json()
    sharedtoids.append(response_body["userid"])

input={'userid':userid}
response = requests.post("http://localhost:5005/usertoimage",data=input)
response_body = json.loads(response.json())
print(type(response_body["imageids"]))
imageids=response_body["imageids"]

@pytest.mark.usertoimage
def test_usertoimage():
    input={'userid':userid}
    response = requests.post("http://localhost:5005/usertoimage",data=input)
    response_body = json.loads(response.json())
    print(type(response_body))
    imageids=response_body["imageids"]
    assert response.status_code == 200

@pytest.mark.imagedetails
def test_imagedetails():
    for imageid in imageids:
        input={'imageid':imageid}
        response = requests.post("http://localhost:5005/imagedetails",data=input)
        assert response.status_code == 200

@pytest.mark.shareimage
def test_shareimage():
    input={'userid':userid,"imageids":imageids,"sharedtoids":sharedtoids}
    response = requests.put("http://localhost:5005/shareimage",data=input)
    assert response.status_code == 200