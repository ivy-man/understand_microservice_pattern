"use strict";
process.env.TZ = 'Asia/Tehran';

let DataAccess = require('./DataAccess'),
    schema = require('./schema'),
    _ = require('lodash'),
    validator = require('validatorjs'),
    rules = require('./rules');

let ObligationModel = function (data) {
    this.data = this.sanitize(data);
};

ObligationModel.prototype.data = {};

ObligationModel.prototype.sanitize = function (data = {}) {
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

ObligationModel.prototype.validate = function (data = {}) {
    return new validator(data, rules);
};

ObligationModel.getObligations = function () {
    return new Promise((resolve, reject) => {
        DataAccess
            .GetEntities('slaEnumarationDB', 'obligations')
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
    });
};

ObligationModel.prototype.Save = function () {
    return new Promise((resolve, reject) => {
        this.data = this.sanitize(this.data);
        let validation = this.validate(this.data);
        if (validation.passes()) {
            DataAccess.Save('slaEnumarationDB', 'obligations', this.data)
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

module.exports = ObligationModel;