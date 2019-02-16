"use strict";

let MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://localhost:27018',
    poolDB,
    options = {
        numberOfRetries: 5,
        auto_reconnect: true,
        poolSize: 40,
        useNewUrlParser: true
    };

let MongoPool = function () {
};

MongoPool.initPool = function () {
    return new Promise((resolve, reject) => {
        console.log('connecting ...');
        MongoClient
            .connect(mongoUrl, options)
            .then(connection => {
                console.log('connected ...');
                poolDB = connection;
                resolve(poolDB);
            })
            .catch(err => {
                reject(err);
            });
    });
};

MongoPool.getInstance = function () {
    return new Promise((resolve, reject) => {
        if (!poolDB) {
            this.initPool()
                .then(connection => {
                    console.log('Created.......');
                    resolve(connection);
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            console.log('Reused..........');
            resolve(poolDB);
        }
    });
};

module.exports = MongoPool;