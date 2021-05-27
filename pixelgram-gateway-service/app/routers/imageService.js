var express = require('express');
var config = require('../config');
const apiAdapter = require('./apiAdapter');

var router = express.Router();

const { routeURLS: {imageService}} = config;

const api = apiAdapter(imageService);

router.post('/usertoimage', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.put('/usertoimage', (req, res) => {
    api.put(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.delete('/usertoimage', (req, res) => {
    api.delete(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.post('/imagedetails', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.post('/shareimage', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.put('/shareimage', (req, res) => {
    api.put(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.delete('/shareimage', (req, res) => {
    api.delete(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

module.exports = router;