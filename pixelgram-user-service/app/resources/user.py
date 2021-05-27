import sqlite3
import json
import uuid
from flask_restful import Resource,reqparse
from models.user import UserModel

def getUserDetailsByName(username):
    user = UserModel.find_by_username(username)
    if user is None:
        return {'message': 'No user with username: {}'.format(username)}, 400
    return json.dumps(user.__dict__)


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type = str, required = True, help = "This field cannot be left blank")
    parser.add_argument('password', type = str, required = True, help = "This field cannot be left blank")


    def post(self):
        data = UserRegister.parser.parse_args()
        userid = str(uuid.uuid4())

        if UserModel.find_by_username(data['username']) is not None:
            return {"message": "A user with this username already exists"}, 400
        
        while UserModel.find_by_userid(userid) is not None:
            userid = str(uuid.uuid4())

        user = UserModel(userid= userid, username=data['username'], password=data['password'])

        try:
            user.create_new_user()
        except:
            return {'message': 'An error occured while creating the new user'}, 205

        return {'message': "User created successfully."}, 201

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('userid', type = str, required = True, help = 'UserId cannot passed as empty string')
    parser.add_argument('username', type = str, required = False, help = 'Username is optional')
    parser.add_argument('password', type = str, required = False, help = 'Required for update data calls')

    def get(self,userid):
        user = UserModel.find_by_userid(userid)
        if user is not None:
            return json.dumps(user.__dict__)
        else:
            return {'message': 'Item not found'}, 404

    def delete(self, userid):
        user = UserModel.find_by_userid(userid)
        if user is None:
            return {'message': 'User doesnt exists to delete'}
        try:
            user.delete()
        except:
            return {'message': 'An error occured while deleting the user'}, 205
        return {'message': 'User Deleted'}

    def put(self):
        data = User.parser.parse_args()
        if data['password'] is None:
            return {'message': 'Please provide the password to update'}
        user = UserModel.find_by_userid(data['userid'])

        try:
            user.update_password(data['password'])
        except:
            return {"message": "An error occured while updating the user"}, 205
        
        return json.dumps(user.__dict__)