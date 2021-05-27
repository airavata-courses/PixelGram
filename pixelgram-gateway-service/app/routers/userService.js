var express = require('express');
var config = require('../config');
const apiAdapter = require('./apiAdapter');

var router = express.Router();

const { routeURLS: {userService}} = config;

const api = apiAdapter(userService);

router.post('/register', (req, res) => {
    console.log(userService);
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.post('/login', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.get('/userlist', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data);
    });
});

router.post('/userdetails', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    });
});

router.get('/user', (req, res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data);
    });
});

router.put('/user', (req, res) => {
    api.put(req.path, res.body).then(resp => {
        res.send(resp.data);
    });
});

router.delete('/user', (req, res) => {
    api.delete(req.path, res.body).then(resp =>{
        res.send(resp.data);
    });
});

module.exports = router;