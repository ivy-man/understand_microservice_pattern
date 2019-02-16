"use strict";

let Obligations = require('../models/obligation/obligationModel'),
    PostalServices = require('../models/postalService/postalServiceModel'),
    PostalServiceTypes = require('../models/postalServiceType/postalServiceTypeModel'),
    GeographicalAreas = require('../models/geographicalArea/geographicalAreaModel'),
    Durations = require('../models/duration/durationModel');

let ObligationController = function () {
};

ObligationController.index = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

ObligationController.heartbeat = function(req, res, next){
    let status = {
        success: true,
        address: req.get('host')
    };

    res.status(200).send(status);
};

ObligationController.getObligations = function (req, res, next) {
    try {
        Obligations
            .getObligations()
            .then(obligations => {
                res.status(200).json(obligations);
            })
            .catch(e => {
                res.status(500).json(e);
            });
    } catch (e) {
        res.status(500).json(e);
    }
};

ObligationController.newObligation = async function (req, res, next) {
    try {
        let postalServices = await PostalServices.GetPostalServices();
        let postalServiceTypes = await PostalServiceTypes.GetPostalServiceTypes();
        let geographicalAreas = await GeographicalAreas.GetGeographicalAreas();
        let durations = await Durations.GetDurations();

        res.status(200).json({
            postalServices: postalServices,
            postalServiceTypes: postalServiceTypes,
            geographicalAreas: geographicalAreas,
            durations: durations
        });
    } catch (e) {
        res.status(500).json(e);
    }
};

ObligationController.saveObligation = function (req, res, next) {
    try {
        let obligation = new Obligations(req.body);

        obligation.Save()
            .then(result => {
                res.status(200).send(result);
            })
            .catch(e => {
                res.status(400).json(e);
            });
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = ObligationController;