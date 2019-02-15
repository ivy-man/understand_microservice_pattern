"use strict";

let router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.status(200).send('Inventory Microservice');
});

module.exports = router;