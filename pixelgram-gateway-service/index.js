var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routers/router')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('API gateway');
});

app.use(router)

console.log('API gateway is running on port 5000');

app.listen(5000);