"use strict";
process.env.TZ = 'Asia/Tehran';

let DataAccess = require('./DataAccess'),
    schema = require('./schema'),
    _ = require('lodash'),
    validator = require('validatorjs'),
    rules = require('./rules');

let PostalServiceModel = function (data) {
    this.data = this.sanitize(data);
};

PostalServiceModel.prototype.data = {};

PostalServiceModel.prototype.sanitize = function (data = {}) {
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

PostalServiceModel.prototype.validate = function (data = {}) {
    return new validator(data, rules);
};

PostalServiceModel.GetPostalServices = function () {
    return new Promise((resolve, reject) => {
        DataAccess
            .GetEntities()
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
    });
};

PostalServiceModel.prototype.Save = function () {
    return new Promise((resolve, reject) => {
        this.data = this.sanitize(this.data);
        this.data.periods = calcPeriod(this.data.date);
        let validation = this.validate(this.data);

        if (validation.passes()) {
            DataAccess.Save(this.data)
                .then(res => {
                    resolve('ok');
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            reject(validation.errors);
        }
    });
};

module.exports = PostalServiceModel;