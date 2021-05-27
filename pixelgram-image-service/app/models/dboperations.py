import sqlite3

def runqueryindb(query = None, lambdafun = None, dbparms = None, readquery = True):
    print("DBparameters: {}".format(dbparms))
    try:
        connection = sqlite3.connect('database.db')
        if query == None:
            raise Exception('No query to execute')
        if not lambdafun == None:
            connection.row_factory = lambdafun
        cursor = connection.cursor()

        if dbparms == None and "?" in query:
            raise Exception('Expected db parameters, provided None')
        elif dbparms == None:
            if readquery:
                return cursor.execute(query).fetchall()
            else:
                cursor.execute(query)
        else:
            if readquery:
                return cursor.execute(query, dbparms).fetchall()
            elif isinstance(dbparms, list):
                cursor.executemany(query, dbparms)
            else:
                cursor.execute(query, dbparms)

    except Exception as e:
        raise Exception(e)
    finally:
        if not readquery:
            connection.commit()
        connection.close()