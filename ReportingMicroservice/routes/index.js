"use strict";

let router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.status(200).send('Reporting Microservice');
});

module.exports = router;