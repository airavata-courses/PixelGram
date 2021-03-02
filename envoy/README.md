# Starting Envoy:
we will be using Docker for setting up and starting the envoy proxy.
Before running the Docker container, we need to make sure that we have a config file(.yaml) for envoy. 
A Dockerfile is also created to build the Docker image.

We need to build the docker image by running the following command :

```docker build -t <img-name>```

Now We need to use the following command to download the docker image locally  :

```docker pull envoyproxy/envoy: v1.12.2```

We need to forward host port  to the containers port so that any request  is forwarded to the docker container where envoy is running. We use the following command :

```docker run -d -p 9901:9901 -p 8000:8000 envoyproxy/envoy-dev```

9901 is the port where envoy admin portal is running. You can use this portal to check envoy routes, health checks and a lot more.

8000 is the port where envoy is listening for incoming requests. Our website will make a request to envoy on this port.

# Alternative
Instead you can run the script build_and_run.sh (only on linux environment) which runs the envoy proxy via docker container.
