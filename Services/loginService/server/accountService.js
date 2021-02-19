const PROTO_PATH = __dirname + '/proto/account.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const accountproto = require("./proto/account_pb.js");
const _ = require('lodash');
const mysql = require("mysql");

let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

let account_proto = grpc.loadPackageDefinition(packageDefinition).account;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lion@king1",
  database: "sys",
  port:3306
});


function getDetails(call, callback) {
    con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("SELECT * from accounts WHERE name="+"'"+call.request.name+"'", function (err, result) 
            {
                if (err) throw err;
                //console.log({name:result[0].name,email:result[0].email});
                callback(null, {
                //message:{ name: 'suraj', email: 'abcd@abcd.com' }
                message:{name:result[0].name,email:result[0].email}
                });
            }); 
    })
  
}

function main() {
  let server = new grpc.Server();
  server.addService(account_proto.accountService.service, {getDetails: getDetails});
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
  server.start(); 
}

main();