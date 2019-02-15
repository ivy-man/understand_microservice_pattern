"use strict";

let express = require('express'),
    app = express(),
    indexRouter = require('./routes/index'),
    fetchRouter = require('./routes/sales'),
    heartBeatRouter = require('./routes/heartbeat'),
    MongoPool = require('./MongoPool'),
    config = require('config'),
    microserviceConfig = config.get('microservice.config');

app.use('/reporting', indexRouter);
app.use('/reporting/sales', fetchRouter);
app.use('/reporting/heartbeat', heartBeatRouter);

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