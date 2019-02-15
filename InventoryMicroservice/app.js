"use strict";

let express = require('express'),
    app = express(),
    indexRouter = require('./routes/index'),
    fetchRouter = require('./routes/sales'),
    heartBeatRouter = require('./routes/heartbeat'),
    MongoPool = require('./MongoPool');

app.use('/inventory', indexRouter);
app.use('/inventory/sales', fetchRouter);
app.use('/inventory/heartbeat', heartBeatRouter);

MongoPool
    .initPool()
    .then(res => {
        let server = app.listen('8082', () => {
            console.log(`Server running on: http://${server.address().address}:${server.address().port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });