import grpc
import proto.db_pb2 as pb2
import proto.db_pb2_grpc as pb2_grpc
import configparser

from concurrent import futures


class db_data_client:
    def __init__(self, server_details):
        self.server_details = server_details
        self.channel = grpc.insecure_channel('{}:{}'.format(self.server_details['host'],self.server_details['port']))
        self.stub = pb2_grpc.DatabaseServiceStub(self.channel)
    
    def GetUserPasswordByEmail(self, request):
        print(request)
        return self.stub.GetUserPasswordByEmail(request)


if __name__ == '__main__':
    config = configparser.RawConfigParser()
    config.read('config.cfg')
    server_details = dict(config.items('server'))
    client = db_data_client(server_details)
    request = pb2.queryString(**{
        'value': 'ssannidh@iu.edu'
    })
    response = client.GetUserPasswordByEmail(request)
    
    print(response)
        