import sqlite3

with sqlite3.connect('database.db') as conn:
    conn.execute('''DROP TABLE IF EXISTS users;''')
    conn.execute('''CREATE TABLE IF NOT EXISTS users (userid text, username text, password text)''')
    conn.execute('''INSERT INTO users VALUES (?,?,?)''', ('6c230d27-b5d6-49f4-a13b-5fba20465de5', 'admin', 'admin'))
    conn.commit()
    print('Successfully created database')