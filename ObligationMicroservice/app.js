"use strict";

let express = require('express'),
    app = express(),
    MongoPool = require('./MongoPool'),
    config = require('config'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    microserviceConfig = config.get('microservice.config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
require('./routes/obligations')(app);

MongoPool
    .initPool()
    .then(res => {
        let server = app.listen(microserviceConfig.port, () => {
            console.log(`Server running on: http://${server.address().address}:${server.address().port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
