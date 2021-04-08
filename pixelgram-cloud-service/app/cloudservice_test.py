import requests
import pytest
import json
image_file = 'sample1.jpg'


username = 'suraj1111'
imageid ="1WbnL2EaRbxz-g53pd67ordrzPqhK4GNt"
sharedtoids = ''
imageidlist = [] #for download
imageids = []
imageidlist.append(imageid)

input={"username":username}
response = requests.post("http://localhost:5003/userdetails",json=input)
response_body = response.json()
user_id=response_body["userid"]

# input={'userid':user_id}
# response = requests.post("http://localhost:5005/usertoimage",data=input)
# response_body = json.loads(response.json())
# print(type(response_body["imageids"]))
# imageids=response_body["imageids"]

@pytest.mark.uploadfile
def test_upload():
     header = {'Content-Type': 'image/jpeg'}
     files={'images':open("sample1.jpg",'rb')}
     response = requests.post("http://localhost:5004/gdrive/upload/"+user_id, files=files,headers=header)
     assert response.status_code == 200

@pytest.mark.view
def test_view():
     response = requests.get("http://localhost:5004/gdrive/view/"+imageid)
     assert response.status_code == 200

@pytest.mark.download
def test_download():
    input={"imageids":imageidlist}
    response = requests.post("http://localhost:5004/gdrive/download",json=input)
    assert response.status_code == 200