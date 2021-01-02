var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = 3000;

var store = {};

var FunctionsHandler = require('./FunctionsHandler.js');
var ServerFunctions = require('./ServerFunctions.js');
var Arena = require('./Arena.js');

store.arena = Arena.create();
Arena.start(store.arena, 10);

app.use(express.static('public'));

app.use(bodyParser.text());

app.post('/functions', FunctionsHandler(ServerFunctions, store));

app.listen(port, function () {
    console.log(`App listening at port ${port}`);
});