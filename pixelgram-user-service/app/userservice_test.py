#name file with *_test.py - then pytest detects these files in the current directory and runs all with below command automatically
#pytest -v
# or pytest filename -v
#run as pytest -m markername -v
import requests
import pytest
username="manoj1111"
password="1234"
newpassword="1213"

@pytest.mark.register
def test_register():
     input={'username':username,'password':password}
     response = requests.post("http://localhost:5003/register",data=input) # data means params passed, json means json body passed
     assert response.status_code == 201

@pytest.mark.userdetails
def test_getuserdetails():
    input={"username":username}
    response = requests.post("http://localhost:5003/userdetails",json=input)
    response_body = response.json()
    userid=response_body["userid"]
    assert response.status_code == 200
    return userid

@pytest.mark.login
def test_login():
    input={'username':username,'password':password}
    response = requests.post("http://localhost:5003/login",json=input)
    response_body = response.json()
    assert response.status_code == 200
    assert response_body["message"] =="User verified"

@pytest.mark.updatepassword
def test_updatepassword():
    userid=test_getuserdetails()
    input={'userid':userid,'username':username,'password':newpassword,}
    response = requests.put("http://localhost:5003/user",json=input)
    assert response.status_code == 200