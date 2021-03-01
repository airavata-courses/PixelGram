import httplib2
import os, io
import configparser

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from apiclient.http import MediaFileUpload, MediaIoBaseDownload

import auth
from concurrent import futures

import grpc
import proto.upload_service_pb2 as pb2
import proto.upload_service_pb2_grpc as pb2_grpc
from google.protobuf import empty_pb2

# If scope is changed you need to delete previously generated google-drive-credentials.json file
# SCOPES = 'https://www.googleapis.com/auth/drive'
# CLIENT_SECRET_FILE = 'client_secret.json'
# APPLICATION_NAME = 'Pixel Gram'


class db_service(pb2_grpc.uploadServiceServicer):
    def __init__(self, drive_service):
        self.drive_service = drive_service
    
    def uploadDataService(self, request, context):
        try:
            imageId = uploadFile(self.drive_service, request.imageName, request.imageData, mimetype)
            responseDict = {
                'userId': request.userId,
                'imageId': imageId
            }
            context.set_code(grpc.StatusCode.OK)
            context.set_details('File uploaded successfully')
            return pb2.uploadDataResponse(**responseDict)
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Issues while uploading the file')
            return empty_pb2.Empty()

    def downloadDataService(self, request, context):
        try:
            imageData = downloadFile(self.drive_service, request.imageId)
            responseDict = {
                'imageId': request.imageId,
                'imageData': imageData
            }
            context.set_code(grpc.StatusCode.OK)
            context.set_details('Requested file Id: {} downloaded successfully'.format(request.imageId))
            return pb2.downloadDataResponse(**responseDict)
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details('Failed to sownload the requested file Id: {}'.format(request.imageId))
            return empty_pb2.Empty()



def getDriveService(connection_details):
    try:
        authInst = auth.auth(
            connection_details['scopes'],
            connection_details['client_secret_file_path'],
            connection_details['app_name'])
        credentials = authInst.getCredentials()
        http = credentials.authorize(httplib2.Http())
        return discovery.build(connection_details['connect_to'], connection_details['drive_version'], http=http)
    except Exception as e:
        print('Error in connecing to google drive with provided creds.')
        print(e)
        raise Exception('Google Drive connection error')

def uploadFile(drive_service, filename, imageData, mimetype):
    try:
        file_metadata = { 'name': filename }
        media = MediaIoBaseUpload(imageData, mimetype=mimetype)
        file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        print("File uploaded sucussfully.")
        return file.get('id')
    except:
        raise Exception('Problem in uploading the file')

def downloadFile(drive_service, file_id):
    try:
        request = drive_service.files().get_media(fileId=file_id)
        fileData = io.BytesIO()
        downloader = MediaIoBaseDownload(fileData, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print('File Id: {}, Downloaded: {}'.format(file_id,int(status.progress()*100)))
        return fileData
    except:
        raise Exception('Problem while downloading the requested file')

    
def start_server(server_details, drive_service):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=int(server_details['max_workers'])))
    pb2_grpc.add_uploadServiceServicer_to_server(db_service(drive_service), server)
    server.add_insecure_port('{}:{}'.format(server_details['host'], server_details['port']))
    server.start()
    print('Server started at {}:{}'.format(server_details['host'], server_details['port']))
    server.wait_for_termination()

if __name__ == '__main__':
    # drive_service = getDriveService()
    # file_id = uploadFile(drive_service, 'sample.jpeg','sample.jpeg','image/jpeg')
    # downloadFile(drive_service, file_id, 'download.jpeg')
    
    try:
        # Reading config file
        config = configparser.RawConfigParser()
        config.read('config.cfg')
        print(config)
        
        # Connectiong to google drive and creating drive service object
        drive_service = getDriveService(dict(config.items('drive')))

        # Getting server details
        print('Database service Server configurations from config file {}'.format(dict(config.items('server'))))

        # Starting the server
        start_server(dict(config.items('server')), drive_service)
    except Exception as error:
        print(error)
        print('Unable to start the server!!!!!')