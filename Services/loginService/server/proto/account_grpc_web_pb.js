/**
 * @fileoverview gRPC-Web generated client stub for account
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.account = require('./account_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.account.accountServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.account.accountServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.account.user,
 *   !proto.account.accountFlag>}
 */
const methodDescriptor_accountService_create = new grpc.web.MethodDescriptor(
  '/account.accountService/create',
  grpc.web.MethodType.UNARY,
  proto.account.user,
  proto.account.accountFlag,
  /**
   * @param {!proto.account.user} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.account.user,
 *   !proto.account.accountFlag>}
 */
const methodInfo_accountService_create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.account.accountFlag,
  /**
   * @param {!proto.account.user} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @param {!proto.account.user} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.account.accountFlag)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.account.accountFlag>|undefined}
 *     The XHR Node Readable Stream
 */
proto.account.accountServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/account.accountService/create',
      request,
      metadata || {},
      methodDescriptor_accountService_create,
      callback);
};


/**
 * @param {!proto.account.user} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.account.accountFlag>}
 *     Promise that resolves to the response
 */
proto.account.accountServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/account.accountService/create',
      request,
      metadata || {},
      methodDescriptor_accountService_create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.account.userEmail,
 *   !proto.account.otpGen>}
 */
const methodDescriptor_accountService_forgotpwd = new grpc.web.MethodDescriptor(
  '/account.accountService/forgotpwd',
  grpc.web.MethodType.UNARY,
  proto.account.userEmail,
  proto.account.otpGen,
  /**
   * @param {!proto.account.userEmail} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.otpGen.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.account.userEmail,
 *   !proto.account.otpGen>}
 */
const methodInfo_accountService_forgotpwd = new grpc.web.AbstractClientBase.MethodInfo(
  proto.account.otpGen,
  /**
   * @param {!proto.account.userEmail} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.otpGen.deserializeBinary
);


/**
 * @param {!proto.account.userEmail} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.account.otpGen)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.account.otpGen>|undefined}
 *     The XHR Node Readable Stream
 */
proto.account.accountServiceClient.prototype.forgotpwd =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/account.accountService/forgotpwd',
      request,
      metadata || {},
      methodDescriptor_accountService_forgotpwd,
      callback);
};


/**
 * @param {!proto.account.userEmail} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.account.otpGen>}
 *     Promise that resolves to the response
 */
proto.account.accountServicePromiseClient.prototype.forgotpwd =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/account.accountService/forgotpwd',
      request,
      metadata || {},
      methodDescriptor_accountService_forgotpwd);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.account.creds,
 *   !proto.account.accountFlag>}
 */
const methodDescriptor_accountService_loginUser = new grpc.web.MethodDescriptor(
  '/account.accountService/loginUser',
  grpc.web.MethodType.UNARY,
  proto.account.creds,
  proto.account.accountFlag,
  /**
   * @param {!proto.account.creds} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.account.creds,
 *   !proto.account.accountFlag>}
 */
const methodInfo_accountService_loginUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.account.accountFlag,
  /**
   * @param {!proto.account.creds} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @param {!proto.account.creds} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.account.accountFlag)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.account.accountFlag>|undefined}
 *     The XHR Node Readable Stream
 */
proto.account.accountServiceClient.prototype.loginUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/account.accountService/loginUser',
      request,
      metadata || {},
      methodDescriptor_accountService_loginUser,
      callback);
};


/**
 * @param {!proto.account.creds} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.account.accountFlag>}
 *     Promise that resolves to the response
 */
proto.account.accountServicePromiseClient.prototype.loginUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/account.accountService/loginUser',
      request,
      metadata || {},
      methodDescriptor_accountService_loginUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.account.userEmail,
 *   !proto.account.accountFlag>}
 */
const methodDescriptor_accountService_delete = new grpc.web.MethodDescriptor(
  '/account.accountService/delete',
  grpc.web.MethodType.UNARY,
  proto.account.userEmail,
  proto.account.accountFlag,
  /**
   * @param {!proto.account.userEmail} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.account.userEmail,
 *   !proto.account.accountFlag>}
 */
const methodInfo_accountService_delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.account.accountFlag,
  /**
   * @param {!proto.account.userEmail} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.account.accountFlag.deserializeBinary
);


/**
 * @param {!proto.account.userEmail} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.account.accountFlag)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.account.accountFlag>|undefined}
 *     The XHR Node Readable Stream
 */
proto.account.accountServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/account.accountService/delete',
      request,
      metadata || {},
      methodDescriptor_accountService_delete,
      callback);
};


/**
 * @param {!proto.account.userEmail} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.account.accountFlag>}
 *     Promise that resolves to the response
 */
proto.account.accountServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/account.accountService/delete',
      request,
      metadata || {},
      methodDescriptor_accountService_delete);
};


module.exports = proto.account;

