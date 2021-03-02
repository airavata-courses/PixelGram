PixelGram UI is built using React JS. 
It is configured using the create-react-app which is used to create single-page react applications.

# gRPC:
gRPC protocol is implemented to enable communication between react client and backend services. 
We need to set up a proxy called envoy for that purpose.
web browsers communicate using HTTP/1 requests. A request in browser can’t be forced to be HTTP/2.
gRPC uses HTTP/1 with a gateway proxy such as Envoy (which transparently translates HTTP/1 to HTTP/2 that is expected by gRPC server).
gRPC web-client won’t send HTTP2 requests. Instead, you need a proxy between your web-client and gRPC backend service for converting that HTTP1 request to HTTP2.
The react Client talks to envoy first using the HTTP/1, envoy will translate the requests to GRPC server by translating to HTTP/2. 
                                   
Here Envoy also acts as a gateway between client and the backend services. 

*Use this link on how to set up envoy:*

[envoy setup](https://github.com/airavata-courses/PixelGram/blob/DEV-Branch/envoy/README.md)

# Starting the React App:

All the dependencies have been included in the package.json file.
Run the command 

```npm install```

to download all the node_modules (dependencies).

Run the command 

```npm start```

to run the application in the development mode. It can be viewed at http://localhost:3000 in the web browser.
