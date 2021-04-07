import sqlite3

def createDB():
    try:
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        
        query = '''DROP TABLE IF EXISTS users'''
        cursor.execute(query)
        
        create_table = "CREATE TABLE IF NOT EXISTS users (userid text, username text, password text)"
        cursor.execute(create_table)
        
        query = "INSERT INTO users VALUES (?,?,?)"
        cursor.execute(query, ('6c230d27-b5d6-49f4-a13b-5fba20465de5', 'admin', 'admin'))
        
        connection.commit()
        connection.close()
    except Exception as e:
        print(e)
        print("Error in creating DB schema")

if __name__ == '__main__':
    createDB()