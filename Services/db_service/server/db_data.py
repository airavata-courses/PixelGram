import psycopg2 as pgsql
from datetime import datetime, timezone
import uuid
import sys
import grpc
import proto.db_pb2 as pb2
from google.protobuf import empty_pb2


USER_TABLE_NAME = 'userdetails'
IMAGE_TABLE_NAME = 'imagedetails'
SESSION_TABLE_NAME = 'sessiontokens'
SHARE_TABLE_NAME = 'shareimagedetails'


def throw_exception(grpc_context, code, details):
    grpc_context.set_details(details)
    grpc_context.set_code(code)
    return empty_pb2.Empty()

def print_psycopg2_exception(err):
    # get details about the exception
    err_type, err_obj, traceback = sys.exc_info()
    # get the line number when exception occured
    line_num = traceback.tb_lineno
    # print the connect() error
    print ("\npsycopg2 ERROR:", err, "on line number:", line_num)
    print ("psycopg2 traceback:", traceback, "-- type:", err_type)
    # psycopg2 extensions.Diagnostics object attribute
    print ("\nextensions.Diagnostics:", err.diag)
    # print the pgcode and pgerror exceptions
    print ("pgerror:", err.pgerror)
    print ("pgcode:", err.pgcode, "\n")

class db_connection:
    def __init__(self, connection_details):
        self.connection_details = connection_details
        self.connection = self.getConnection()
    
    def getConnection(self):
        """ Connect to the PostgreSQL database server """
        if self.connection is None:
            try:
                print("Connecting to the postgreSQL database with details {}".format(self.connection_details))
                self.connection = pgsql.connect(**self.connection_details)
            except pgsql.OperationalError as error:
                print_psycopg2_exception(error)
                raise RuntimeError('Failed to connect with database')
        return self.connection


class db_data_fetcher:
    def __init__(self):
        pass
    
    def createUser(self, request, context, connection):
        user_id = None
        responseDict = {
            'userId': user_id,
            'username': request.username,
            'email': request.email,
            'password': request.password,
            'status': pb2.StatusCode.FAILURE
        }

        retrive_query = '''SELECT * FROM %s WHERE email = %s;'''
        update_query = '''INSERT INTO %s (user_id, user_name, email, password) VALUES (%s, %s, %s, %s) RETURNING user_id;'''

        try:
            with connection.cursor() as curs:
                curs.execute(retrive_query, (USER_TABLE_NAME, request.email))
                if len(curs.fetchall()) > 0:
                    return throw_exception(
                        grpc_context = context,
                        code = grpc.StatusCode.ALREADY_EXISTS,
                        details = 'Email Id already exists.'
                    )
            with connection.cursor() as curs:
                curs.execute(update_query, (USER_TABLE_NAME, uuid.uuid4().hex, request.username, request.email, request.password))
                user_id = curs.fetchone()[0]
        except pgsql.Error as error:
            print_psycopg2_exception(error)
            return throw_exception(
                grpc_context = context,
                code = grpc.StatusCode.ABORTED,
                details = 'Error occured while creating new user.'
            )
        finally:
            context.set_code(grpc.StatusCode.OK)
            return pb2.UserDetails(**responseDict)

    def getUserPasswordByEmail(self, request, context, connection):
        user_id = None
        password = None
        responseDict = {
            'userId': user_id,
            'password': password,
            'email': request.email
        }

        retrive_query = '''SELECT user_id, password FROM %s WHERE email = %s;'''

        try:
            with connection.cursor() as curs:
                curs.execute(retrive_query, (USER_TABLE_NAME, request.email))
                result = curs.fetchall()
                if len(result) == 0:
                    return throw_exception(
                        grpc_context = context,
                        code = grpc.StatusCode.NOT_FOUND,
                        details = 'No related records found in database.'
                    )
                user_id = result[0][0]
                password = result[0][1]
        except pgsql.Error as error:
            print_psycopg2_exception(error)
        finally:
            context.set_code(grpc.StatusCode.OK)
            return pb2.UserDetails(**responseDict)

    def updateUserPassword(self, request, context, connection):

        update_query = '''UPDATE %s SET password = %s WHERE user_id = %s AND email = %s;'''

        try:
            with connection.cursor() as curs:
                curs.execute(update_query, (USER_TABLE_NAME, request.password, request.userId, request.email))
                if curs.rowcount > 0:
                    context.set_code(grpc.StatusCode.OK)
                    return empty_pb2.Empty()
        except pgsql.Error as error:
            print_psycopg2_exception(error)
        finally:
            return throw_exception(
                grpc_context = context,
                code = grpc.StatusCode.INTERNAL,
                details = 'Updating the record failed.'  
            )
    
    def updateUserName(self, request, context, connection):
        
        update_query = '''UPDATE %s SET user_name = %s WHERE user_id = %s AND email = %s;'''

        try:
            with connection.cursor() as curs:
                curs.execute(update_query, (USER_TABLE_NAME, request.username, request.userId, request.email))
                if curs.rowcount > 0:
                    context.set_code(grpc.StatusCode.OK)
                    return empty_pb2.Empty()
        except pgsql.Error as error:
            print_psycopg2_exception(error)
        finally:
            return throw_exception(
                grpc_context = context,
                code = grpc.StatusCode.INTERNAL,
                details = 'Updating the record failed.'  
            )

    def createSessionTokenForUser(self, request, context, connection):

        session_token = None
        # Getting current time and date in UTC zone
        timestamp = datetime.now(timezone.utc) + datetime.timedelta(minutes = 30)

        responseDict = {
            'sessionId': session_token,
            'userId': request.user_id,
            'expireTime': timestamp
        }

        update_query = '''INSERT INTO %s (user_id, session_id, timestamp) VALUES (%s, %s, %s) RETURNING session_id;'''

        try:
            with connection.cursor() as curs:
                curs.execute(update_query, (SESSION_TABLE_NAME, request.userId, uuid.uuid4().hex, timestamp))
                session_token = curs.fetchone()[0]
        except pgsql.Error as error:
            print_psycopg2_exception(error)
            return throw_exception(
                grpc_context = context,
                code = grpc.StatusCode.INTERNAL,
                details = 'Unable to create the session toke for the user. Try again'
            )
        finally:
            context.set_code(grpc.StatusCode.OK)
            return pb2.Session(**responseDict)
    
    def endSessionforUser(self, request, context, connection):

        # Current time 
        timestamp = datetime.now(timezone.utc)

        delete_query = '''DELETE FROM %s WHERE user_id = %s OR expire_time < %s'''

        try:
            with connection.cursor() as curs:
                curs.execute(delete_query, (SESSION_TABLE_NAME, request.userId, timestamp))
            context.set_code(grpc.StatusCode.OK)
            context.set_details('User session cleared.')
        except pgsql.Error as error:
            print_psycopg2_exception(error)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('User session has not been cleared. Please try again')
        finally:
            return empty_pb2.Empty()
    
    def validateSessionTokenForUser(self, request, context, connection):

        timestamp = datetime.now(timezone.utc)

        retrive_query = '''SELECT user_id, session_id, timestamp FROM %s WHERE user_id = %s AND session_id = %s AND expire_time > %s;'''

        try:
            with connection.cursor() as curs:
                curs.execute(retrive_query, (SESSION_TABLE_NAME, request.userId, request.sessionId, timestamp))
                if len(curs.fetchall()) > 0:
                    return throw_exception(
                        grpc_context = context,
                        code = grpc.StatusCode.OK,
                        details = 'Session token verified successfully.'
                    )
        except pgsql.Error as error:
            print_psycopg2_exception(error)
        finally:
            return throw_exception(
                grpc_context = context,
                code = grpc.StatusCode.UNAUTHENTICATED,
                details = 'Invalid session token. Please create new one to continue'
            )

    def getImageDetailsByImageId(self, request, context, connection):

        # Still timestamo and format need to be implement.

        responseDict = {
            'imageId': request.value,
            'format': None,
            'dateTime' : None,
            'latitude': None,
            'longitude': None,
            'locationName': None
        }

        retrival_query = '''SELECT image_id, latitude, longitude, location_name, timestamp, format FROM %s WHERE image_id = %s;'''

        try:
            with connection.cursor() as curs:
                curs.execute(retrival_query, (IMAGE_TABLE_NAME, request.value))
                db_response = curs.fetchall()
                if len(db_response) == 0:
                    return throw_exception(
                        grpc_context = context,
                        code = grpc.StatusCode.NOT_FOUND,
                        details = 'No details found for requested image_id.' 
                    )
                db_response = db_response[0]
                responseDict['latitude'] = db_response[1]
                responseDict['longitude'] = db_response[2]
                responseDict['loacationName'] = db_response[3]
                context.set_code(grpc.StatusCode.OK)
                context.set_details('Request successful')
        except pgsql.Error as error:
            print_psycopg2_exception(error)
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Unable to fetch details from postgres.')
        finally:
            return pb2.ImageDetails(**responseDict)
                
        