const PROTO_PATH = __dirname + '/proto/account.proto';
const grpc = require('grpc');
const accountproto = require("./proto/account_pb.js");
const protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let account_proto = grpc.loadPackageDefinition(packageDefinition).account;

function main() {
  let client = new account_proto.accountService('localhost:4500', grpc.credentials.createInsecure());
  var userName='sravya'
  client.getDetails({name:userName}, function(err, response) 
  {
    console.log('Details for user:',userName,'\n' ,response.message);
  });
}

main();