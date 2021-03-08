import sqlite3


def createdb():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()
    query = '''CREATE TABLE IF NOT EXISTS usertoimage (
        userid text, 
        imageid text, 
        PRIMARY KEY(userid, imageid))'''
    cursor.execute(query)

        
    query = '''CREATE TABLE IF NOT EXISTS sharedetails (
        userid text,
        imageid text,
        sharedfromid text,
        PRIMARY KEY(userid, imageid, sharedfromid))'''
    cursor.execute(query)
        
    query = '''CREATE TABLE IF NOT EXISTS imagedetails (
        imageid text PRIMARY KEY,
        latitude double,
        longitude double,
        locationname text,
        createddate timestamp)'''
    cursor.execute(query)
        
    query = '''INSERT INTO usertoimage VALUES ('1234', '345'), ('1234', '567')'''
    cursor.execute(query)

    connection.commit()
    connection.close()

if __name__ == '__main__':
    createdb()