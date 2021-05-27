import sqlite3

with sqlite3.connect('database.db') as conn:
    conn.execute('''DROP TABLE IF EXISTS usertoimage''')
    conn.execute('''CREATE TABLE IF NOT EXISTS usertoimage (
        userid text, 
        imageid text, 
        PRIMARY KEY(userid, imageid))''')
    
    conn.execute('''DROP TABLE IF EXISTS sharedetails''')
    conn.execute('''CREATE TABLE IF NOT EXISTS sharedetails (
        userid text,
        imageid text,
        sharedfromid text,
        PRIMARY KEY(userid, imageid, sharedfromid))''')
    
    conn.execute('''DROP TABLE IF EXISTS imagedetails''')
    conn.execute('''CREATE TABLE IF NOT EXISTS imagedetails (
        imageid text PRIMARY KEY,
        latitude double,
        longitude double,
        locationname text,
        createddate timestamp)''')

    conn.commit()