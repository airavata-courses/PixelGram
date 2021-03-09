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
        
    query = '''INSERT INTO usertoimage VALUES ('6c230d27-b5d6-49f4-a13b-5fba20465de5', '1y4z5fqcJx_65ALsrwQ5CMjGdUXyxDIEa'), 
        ('6c230d27-b5d6-49f4-a13b-5fba20465de5', '1jvX58M8DdfldSpweSmgf2q29rl3k_-4u')
        ('6c230d27-b5d6-49f4-a13b-5fba20465de5', '1U4G8GvdctszuFs-zzWwT5-kJu7apqbTH')'''

    cursor.execute(query)

    connection.commit()
    connection.close()

if __name__ == '__main__':
    createdb()