"use strict";

let MongoPool = require('../MongoPool');
let DataAccess = function () {
    // this.dbName = 'reportDB';
};

DataAccess.prototype.GetEntities = function (dbName, collectionName, query = {}) {
    return new Promise((resolve, reject) => {
        MongoPool
            .getInstance()
            .then(connection => {
                let db = connection.db(dbName);
                let collection = db.collection(collectionName);

                collection
                    .find(query)
                    .toArray(function (err, docs) {
                        if (err) reject(err);
                        else resolve(docs);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = new DataAccess();