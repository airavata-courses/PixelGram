# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import db_pb2 as db_pb2


class DatabaseServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.UpdateImageDetails = channel.unary_unary(
                '/DatabaseService/UpdateImageDetails',
                request_serializer=db__pb2.ImageDetails.SerializeToString,
                response_deserializer=db__pb2.StatusResponse.FromString,
                )
        self.CreateUser = channel.unary_unary(
                '/DatabaseService/CreateUser',
                request_serializer=db__pb2.User.SerializeToString,
                response_deserializer=db__pb2.UserDetails.FromString,
                )
        self.UpdateUserDetails = channel.unary_unary(
                '/DatabaseService/UpdateUserDetails',
                request_serializer=db__pb2.UserDetails.SerializeToString,
                response_deserializer=db__pb2.StatusResponse.FromString,
                )
        self.UpdateUserPassword = channel.unary_unary(
                '/DatabaseService/UpdateUserPassword',
                request_serializer=db__pb2.UserPassword.SerializeToString,
                response_deserializer=db__pb2.StatusResponse.FromString,
                )
        self.CreateImage = channel.unary_unary(
                '/DatabaseService/CreateImage',
                request_serializer=db__pb2.ImageUserDetails.SerializeToString,
                response_deserializer=db__pb2.ImageDetails.FromString,
                )
        self.GetImageDetails = channel.unary_unary(
                '/DatabaseService/GetImageDetails',
                request_serializer=db__pb2.queryString.SerializeToString,
                response_deserializer=db__pb2.ImageDetails.FromString,
                )
        self.GetUserPassword = channel.unary_unary(
                '/DatabaseService/GetUserPassword',
                request_serializer=db__pb2.queryString.SerializeToString,
                response_deserializer=db__pb2.UserPassword.FromString,
                )


class DatabaseServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def UpdateImageDetails(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CreateUser(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateUserDetails(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateUserPassword(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CreateImage(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetImageDetails(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetUserPassword(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_DatabaseServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'UpdateImageDetails': grpc.unary_unary_rpc_method_handler(
                    servicer.UpdateImageDetails,
                    request_deserializer=db__pb2.ImageDetails.FromString,
                    response_serializer=db__pb2.StatusResponse.SerializeToString,
            ),
            'CreateUser': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateUser,
                    request_deserializer=db__pb2.User.FromString,
                    response_serializer=db__pb2.UserDetails.SerializeToString,
            ),
            'UpdateUserDetails': grpc.unary_unary_rpc_method_handler(
                    servicer.UpdateUserDetails,
                    request_deserializer=db__pb2.UserDetails.FromString,
                    response_serializer=db__pb2.StatusResponse.SerializeToString,
            ),
            'UpdateUserPassword': grpc.unary_unary_rpc_method_handler(
                    servicer.UpdateUserPassword,
                    request_deserializer=db__pb2.UserPassword.FromString,
                    response_serializer=db__pb2.StatusResponse.SerializeToString,
            ),
            'CreateImage': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateImage,
                    request_deserializer=db__pb2.ImageUserDetails.FromString,
                    response_serializer=db__pb2.ImageDetails.SerializeToString,
            ),
            'GetImageDetails': grpc.unary_unary_rpc_method_handler(
                    servicer.GetImageDetails,
                    request_deserializer=db__pb2.queryString.FromString,
                    response_serializer=db__pb2.ImageDetails.SerializeToString,
            ),
            'GetUserPassword': grpc.unary_unary_rpc_method_handler(
                    servicer.GetUserPassword,
                    request_deserializer=db__pb2.queryString.FromString,
                    response_serializer=db__pb2.UserPassword.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'DatabaseService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class DatabaseService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def UpdateImageDetails(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/UpdateImageDetails',
            db__pb2.ImageDetails.SerializeToString,
            db__pb2.StatusResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CreateUser(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/CreateUser',
            db__pb2.User.SerializeToString,
            db__pb2.UserDetails.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateUserDetails(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/UpdateUserDetails',
            db__pb2.UserDetails.SerializeToString,
            db__pb2.StatusResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateUserPassword(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/UpdateUserPassword',
            db__pb2.UserPassword.SerializeToString,
            db__pb2.StatusResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CreateImage(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/CreateImage',
            db__pb2.ImageUserDetails.SerializeToString,
            db__pb2.ImageDetails.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetImageDetails(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/GetImageDetails',
            db__pb2.queryString.SerializeToString,
            db__pb2.ImageDetails.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetUserPassword(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/DatabaseService/GetUserPassword',
            db__pb2.queryString.SerializeToString,
            db__pb2.UserPassword.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)