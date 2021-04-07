import sqlite3


def createdb():
    
    try:
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = '''DROP TABLE IF EXISTS usertoimage'''
        cursor.execute(query)

        query = '''CREATE TABLE IF NOT EXISTS usertoimage (
            userid text, 
            imageid text, 
            PRIMARY KEY(userid, imageid))'''
        cursor.execute(query)

        query = '''DROP TABLE IF EXISTS sharedetails'''
        cursor.execute(query)
            
        query = '''CREATE TABLE IF NOT EXISTS sharedetails (
            userid text,
            imageid text,
            sharedfromid text,
            PRIMARY KEY(userid, imageid, sharedfromid))'''
        cursor.execute(query)

        query = '''DROP TABLE IF EXISTS imagedetails'''
        cursor.execute(query)
            
        query = '''CREATE TABLE IF NOT EXISTS imagedetails (
            imageid text PRIMARY KEY,
            latitude double,
            longitude double,
            locationname text,
            createddate timestamp)'''
        cursor.execute(query)
        
        connection.commit()
        connection.close()
    except Exception as e:
        print(e)
        print("Error in creating DB schema")