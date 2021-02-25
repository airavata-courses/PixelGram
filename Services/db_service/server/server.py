import grpc
import proto.db_pb2 as pb2
import proto.db_pb2_grpc as pb2_grpc
import configparser
import db_data

class db_service(pb2_grpc.DatabaseServiceServicer):
    def __init__(self, *args, **kwargs):
        self.read_db_instance = db_data.db_Instance(getDatabaseDetails())
        self.update_db_instance = db_data.db_Instance(getDatabaseDetails())

    def UpdateImageDetails(self, request, context):

    def CreateUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.createUser(request, context, self.update_db_instance.getConnection())

    def UpdateUserName(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.updateUserPassword(request, context, self.update_db_instance.getConnection())

    def UpdateUserPassword(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.updateUserPassword(request, context, self.update_db_instance.getConnection())

    def CreateImage(self, request, context):

    def GetImageDetails(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.getImageDetailsByImageId(request, context, self.read_db_instance.getConnection())

    def GetUserPasswordByEmail(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.getUserPasswordByEmail(request, context, self.read_db_instance.getConnection())

    def SessionTokenForUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.createSessionTokenForUser(request, context, self.update_db_instance.getConnection())
    
    def EndSessionForUser(self, request, context):
        db_fetch = db_data.db_data_fetcher()
        return db_fetch.endSessionforUser(request, context, self.update_db_instance.getConnection())
    
    def ValidateSessionTokenForUser(self, request, context):
        db_fetch = db_data_fetcher()
        return db_fetch.validateSessionTokenForUser(request, context, self.read_db_instance.getConnection())


def start_server(server_details):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=server_details['max_workers']))
    pb2_grpc.add_DatabaseServiceServicer_to_server(db_service(), server)
    server.add_insecure_port('{}:{}'.format(server_details['host'], server_details['port']))
    server.start()
    print('Server started at {}:{}'.format(server_details['host'], server_details['port']))
    server.wait_for_termination()

def getDatabaseDetails()
    # Reding config file
    config = configparser.RawConfigParser()
    config.read('config.cfg')

    # Getting databse details
    database_details = dict(config.items('db_configurations'))
    print('Database configurations from config file {}'.format(database_details))
    return database_details

if __name__ == '__main__':
    # Running bash script which will create database and load with backup data to get start with.
    
    try:
        # Getting database details from config file
        database_details = getDatabaseDetails()
        
        # connecting to database and creating db class object
        db_conn = db_data.db_connection(database_details).getConnection()
        db_conn.close()

        # Getting server details
        server_details = dict(config.items('server'))
        print('Server configurations from config file {}'.format(server_details))

        # Starting the server
        start_server(server_details)
    except Exception as error:
        print(error)
        print('Unable to start the server!!!!!')
        