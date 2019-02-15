"use strict";

let express = require('express'),
    app = express(),
    path = require('path'),
    config = require('config'),
    microserviceConfig = config.get('microservice.config'),
    Model = require('./models/gatewayModel');

app.get('/getStatus', function (req, res) {
    Model.GetMicroserviceData(req.query.url)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

var server = app.listen(microserviceConfig.port, microserviceConfig.host, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server Running On: http://%s:%s', host, port);
});