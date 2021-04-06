const config = {
    app: {
        host: "127.0.0.1",
        port: 5000
    },
    routeURLS: {
        userService: "user-service:5003",
        imageService: "image-service:5005",
        cloudService: "cloud-service:5004"
    }
};

module.exports = config;