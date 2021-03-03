import grpc
import proto.db_pb2 as pb2
import proto.db_pb2_grpc as pb2_grpc
import configparser
import db_data

from concurrent import futures

POSTGRES_DEFAULT_DB_NAME = 'postgres'

class db_service(pb2_grpc.DatabaseServiceServicer):
    def __init__(self, *args, **kwargs):
        self.database_details = database_details

    def UpdateImageDetails(self, request, context):
        return ''

    def CreateUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.createUser(request, context, self.database_details)

    def UpdateUserName(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.updateUserPassword(request, context, self.database_details)

    def UpdateUserPassword(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.updateUserPassword(request, context, self.database_details)

    def CreateImage(self, request, context):
        return ''

    def GetImageDetails(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.getImageDetailsByImageId(request, context, self.database_details)

    def GetUserPasswordByEmail(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.getUserPasswordByEmail(request, context, self.database_details)

    def SessionTokenForUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.createSessionTokenForUser(request, context, self.database_details)
    
    def EndSessionForUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.endSessionforUser(request, context, self.database_details)
    
    def ValidateSessionTokenForUser(self, request, context):
        db_fetch = db_data_fetcher()
        return db_fetch.validateSessionTokenForUser(request, context, self.database_details)


def start_server(server_details, database_details):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=int(server_details['max_workers'])))
    pb2_grpc.add_DatabaseServiceServicer_to_server(db_service(database_details), server)
    server.add_insecure_port('{}:{}'.format(server_details['host'], server_details['port']))
    server.start()
    print('Server started at {}:{}'.format(server_details['host'], server_details['port']))
    server.wait_for_termination()

def getConfigItemDetails(config, key):
    # Getting databse details
    item_details = dict(config.items(key))
    print('{} from config file {}'.format(key,item_details))
    return item_details

if __name__ == '__main__':
    # Running bash script which will create database and load with backup data to get start with.
    
    try:
        # Reading config file
        config = configparser.RawConfigParser()
        config.read('config.cfg')
        # Getting database details from config file
        database_details = getConfigItemDetails(config, 'db_configurations')
        
        # connecting to database and feeding database with dummy data
        DB_NAME = database_details['database']
        database_details['database'] = POSTGRES_DEFAULT_DB_NAME
        db_conn = db_data.db_connection(database_details, False).getConnection()
        with db_conn.cursor() as curs:
            curs.execute('CREATE DATABASE {}'.format(DB_NAME))
        db_conn.close()
        
        database_details['database'] = DB_NAME
        db_conn = db_data.db_connection(database_details, False).getConnection()
        
        # Reading dummy sql file
        sqlfile = open('dummy_data.sql','r')
        with db_conn.cursor() as curs:
            curs.execute(sqlfile.read())
        db_conn.close()

        # Getting server details
        server_details = getConfigItemDetails(config, 'server')

        # Starting the server
        start_server(server_details, database_details)
    except Exception as error:
        print(error)
        print('Unable to start the server!!!!!')
        