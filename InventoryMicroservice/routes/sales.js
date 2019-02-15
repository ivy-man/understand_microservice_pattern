"use strict";

let router = require('express').Router(),
    Model = require('../models/inventoryModel');

router.get('/', (req, res, next) => {
    Model.GetReport('sales')
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;