const config = {
    app: {
        host: "127.0.0.1",
        port: 5000
    },
    routeURLS: {
        userService: "http://user-service:5003/",
        imageService: "http://image-service:5005/",
        cloudService: "http://cloud-service:5004/"
    }
};

module.exports = config;