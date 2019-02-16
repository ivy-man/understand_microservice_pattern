"use strict";

let DataAccess = function () {
    let dataAccess = this,
        MongoPool = require('../../MongoPool');

    dataAccess.GetEntities = (dbName, collectionName, query = {}) => {
        return new Promise((resolve, reject) => {
            MongoPool
                .getInstance()
                .then(connection => {
                    let database = connection.db(dbName);
                    return database.collection(collectionName);
                })
                .then((collection) => {
                    collection
                        .find(query)
                        .toArray((err, docs) => {
                            if (err) reject(err);
                            else resolve(docs);
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    dataAccess.Save = (dbName, collectionName, doc) => {
        console.log('asdas');
        return new Promise((resolve, reject) => {
            MongoPool.getInstance()
                .then(connection => {
                    let database = connection.db(dbName);
                    return database.collection(collectionName);
                })
                .then(collection => {
                    collection
                        .insertOne(doc, (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
};

module.exports = new DataAccess();