import pytest
from models.user import authentication
from models.user import search_by_username
from models.user import UserModel

username="sra"
password="123456"
userid = "d8534c92-56a9-4c3d-a969-876badd284e2"
t = []
a = UserModel
newpassword = "123456"

def test_authentication():
    temp=authentication(username,password)
    assert temp==({'message': 'User verified'},200),"authentication failed, check creds"

def test_searchbyusername():
    t=search_by_username("s")
    print(t)

def test_findbyusername():
    b = a.find_by_username(username)
    assert (b.username == username),"username doesnot match"
    assert(b.password == password),"password doesnot exist"
    assert(b.userid == userid),"no userid"
    print(b.username)
    print(b.password)

def test_findbyuserid():
    c = a.find_by_userid(userid)
    assert (c.username == username),"username doesnot match"
    assert(c.password == password),"password doesnot exist"
    assert(c.userid == userid),"no userid"

def test_updatepassword():
    a.username = "sra"
    a.password = "123456"
    a.userid = "d8534c92-56a9-4c3d-a969-876badd284e2"
    a.update_password(a,newpassword)
    temp=authentication(username,newpassword)
    assert temp==({'message': 'User verified'},200),"authentication failed, check creds"

if __name__ == "__main__":
    test_authentication()
    test_searchbyusername()
    test_findbyusername()
    test_findbyuserid()
    test_updatepassword()
    print("Everything passed")