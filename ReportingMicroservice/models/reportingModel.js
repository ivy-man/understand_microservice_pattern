"use strict";

let DataAccess = require('./DataAccess');

let Model = function () {

};

Model.GetReport = function (collectionName) {
    return new Promise((resolve, reject) => {
        DataAccess.GetEntities('reporting_microservice', collectionName)
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = Model;