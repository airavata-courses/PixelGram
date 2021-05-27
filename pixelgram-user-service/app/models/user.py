import sqlite3
import json

def search_by_username(username):
    try:
        connection = sqlite3.connect('database.db')
        connection.row_factory = lambda cursor, row: row[0]
        cursor = connection.cursor()
        query = 'SELECT username FROM WHERE username LIKE ?'
        results = cursor.execute(query, ('%'+username+'%',)).fetchall()
        return json.dumps(results)
    except:
        return json.dumps([])

def authentication(username, password):
    try:
        connection = sqlite3.connect('database.db')
        connection.row_factory = lambda cursor, row: row[0]
        cursor = connection.cursor()
        query = "SELECT password FROM users WHERE username = ?"
        result = cursor.execute(query, (username,)).fetchone()
        if result == password:
            return {'message': 'User verified'}, 200
    except Exception as e:
        print(e)
        return {'message': 'Invalid User'}, 401
    return {'message': 'Invalid User'}, 401


class UserModel:
    def __init__(self, userid, username, password):
        self.userid = userid
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, username):
        connection = sqlite3.connect('database.db')
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE username = ?"
        result = cursor.execute(query, (username,))
        row = result.fetchone()

        if row is not None:
            user = cls(*row)
        else:
            user = None

        connection.close()
        return user

    @classmethod
    def find_by_userid(cls, userid):
        connection = sqlite3.connect('database.db')
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE userid = ?"
        result = cursor.execute(query, (userid,))
        row = result.fetchone()

        if row is not None:
            user = cls(*row)
        else:
            user = None

        connection.close()
        return user

    def delete(self):
        try:
            connection = sqlite3.connect('database.db')
            cursor = connection.cursor()
            query = "DELETE FROM users WHERE userid=?"
            cursor.execute(query,(self.userid,))
            connection.commit()
            connection.close()
        except:
            raise Exception('Error while deleting userid: {}'.format(self.userid))
    
    def update_password(self, password):
        try:
            connection = sqlite3.connect('database.db')
            cursor = connection.cursor()
            query = "UPDATE users SET password = ? WHERE userid = ?"
            cursor.execute(query, (password, self.userid))
            connection.commit()
            connection.close()
            self.password = password
        except:
            raise Exception('Error while updating the password from userid: {}'.format(self.userid))
    
    def create_new_user(self):
        try:
            connection = sqlite3.connect('database.db')
            cursor = connection.cursor()
            query = "INSERT INTO users VALUES (?, ?, ?)"
            cursor.execute(query, (self.userid, self.username, self.password,))
            connection.commit()
            connection.close()
        except Exception as e:
            print(e)
            raise Exception('Error while creating user with userid: {}, username: {}'.format(self.userid, self.username))

