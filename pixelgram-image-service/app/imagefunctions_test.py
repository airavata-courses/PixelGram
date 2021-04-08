import pytest
from models.imagedetails import imagedetailsModel
from models.sharedetails import shareimagedetalsModel
from models.usertoimage import usertoimageModel

imageid="1-OM-IjSMX8EgMULqNYrD5HkYLfizRZ2m"
imageids=["11iuoRE8npbuv7NXTEbf5VtwAAbF8taYq", "1G6Q5Pu35JUO148-5TtvFZ0MGDSHD6juw", "1iPgVxIK3EkO1iMpIOMftsJ_CLl96zAJ9"]
userid="462571b-a81a-4d28-b2f7-ce0b116e38db"
sharedtoids=["4179e5b4-7a7a-4f38-8f40-1f731a6ce723"]
username="sra"
password="1234"
latitude=10
longitude=20
locationname="Hyderabad"

def test_usertoimage():
    b=usertoimageModel(userid,imageids)
    b.insert()
    b.get_imageids()
    assert (b.imageids == imageids), "failed, check userid and image ids"


def test_getimagedetails():
     a=imagedetailsModel(imageid,latitude,longitude,locationname)
     a.updateorinsert
     a.getimagedetails()
     assert (a.latitude==latitude)
     assert (a.longitude==longitude)
     assert (a.locationname==locationname)

def test_shareddetails():
    c=shareimagedetalsModel(userid,imageids,sharedtoids)
    c.update_share_details()
    c.get_shared_imageids
    assert (c.imageids == imageids)

if __name__ == "__main__":
    test_usertoimage()
    test_getimagedetails()
    test_shareddetails()
    print("Everything passed")