import pytest
from models.user import authentication
from models.user import search_by_username
from models.user import UserModel


t = []
a = UserModel("abcd1234","bharath","000000")
username="bharath"
password="000000"
userid = "abcd1234"
newpassword = "000000"

def test_createuser():
     a.create_new_user()
    
def test_authentication():
    temp=authentication(username,password)
    assert temp==({'message': 'User verified'},200),"authentication failed, check creds"

# def test_searchbyusername():
#     t=search_by_username("s")
#     print(t)

def test_findbyusername():
    b = a.find_by_username(username)
    print(b.username)
    print(b.password)
    print(b.userid)
    assert (b.username == username),"username doesnot match"
    assert(b.password == password),"password doesnot exist"
    assert(b.userid == userid),"no userid"

def test_findbyuserid():
    c = a.find_by_userid(userid)
    print(c.username)
    assert (c.username == username),"username doesnot match"
    assert(c.password == password),"password doesnot exist"
    assert(c.userid == userid),"no userid"

def test_updatepassword():
    # a.username = "bharath"
    # a.password = "123456"
    # a.userid = "abcd1234"
    a.update_password(newpassword)
    temp=authentication(username,newpassword)
    assert temp==({'message': 'User verified'},200),"authentication failed, check creds"

if __name__ == "__main__":
    test_createuser()
    test_authentication()
    # test_searchbyusername()
    test_findbyusername()
    test_findbyuserid()
    test_updatepassword()
    print("Everything passed")