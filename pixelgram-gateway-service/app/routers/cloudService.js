var express = require('express');
var config = require('../config');
const apiAdapter = require('./apiAdapter');

var router = express.Router();

const { routeURLS: {cloudService}} = config;

const api = apiAdapter(cloudService);

router.get('/gdrive/view/:file_id', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data);
    });
});

router.post('/gdrive/upload/:userid', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.post('/gdrive/download', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

module.exports = router;