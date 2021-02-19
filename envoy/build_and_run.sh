echo --- Building my-envoy docker image ---
docker build -t grpc-envoy:1.0 .


echo --- Running my-envoy docker image ---
docker run -d -p 8000:8000 -p 9901:9901 --network=host grpc-envoy:1.0