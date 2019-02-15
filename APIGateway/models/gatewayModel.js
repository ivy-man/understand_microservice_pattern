"use strict";

let http = require('http');
let Model = function () {
};

Model.GetMicroserviceData = function (url) {
    return new Promise((resolve, reject) => {
        let request = http.get(url, res => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error('Error status code: ' + res.statusCode));
            }

            let body = "";
            res.setEncoding("utf8");
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                try {
                    resolve(body);
                } catch (exception) {
                    reject(exception);
                }
            });
        });

        request.on("error", function (err) {
            err.success = false;
            resolve(err);
        });
    });
};

module.exports = Model;