"use strict";

let MongoClient = require('mongodb').MongoClient,
    pool_db,
    mongoUrl = 'mongodb://localhost:27017',
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
                pool_db = connection;
                resolve(pool_db);
            })
            .catch(err => {
                reject(err);
            });
    });
};

MongoPool.getInstance = function () {
    return new Promise((resolve, reject) => {
        if (!pool_db) {
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
            resolve(pool_db);
        }
    });
};

module.exports = MongoPool;