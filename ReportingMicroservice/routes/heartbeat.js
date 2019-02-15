"use strict";

let router = require('express').Router();

router.get('/', (req, res, next) => {
    let status = {
        success: true,
        address: req.get('host')
    };

    res.send(status);
});

module.exports = router;