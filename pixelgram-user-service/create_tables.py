import sqlite3

def createDB():
    try:
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        create_table = "CREATE TABLE IF NOT EXISTS users (userid text, username text, password text)"
        cursor.execute(create_table)
        connection.commit()
        connection.close()
    except:
        print("Error in creating DB schema")

if __name__ == '__main__':
    createDB()