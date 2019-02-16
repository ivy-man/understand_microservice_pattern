"use strict";

let obligationsController = require('../controllers/obligations');
let Router = function (app) {
    app.get('/', obligationsController.getObligations);
    app.get('/heartbeat', obligationsController.heartbeat);
    app.get('/new', obligationsController.newObligation);
    app.post('/save', obligationsController.saveObligation);
};

module.exports = Router;

// let router = require('express').Router(),
//     obligationsController = require('../controllers/obligations');
//
// /* GET obligations listing. */
// router.get('/', obligationsController.getObligations);
// router.get('/new', obligationsController.newObligation);
// router.post('/save', obligationsController.saveObligation);
//
// module.exports = router;