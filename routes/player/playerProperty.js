var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerProperty = require('../../model/playerProperty');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerProperties', (req, res, next) => {
    let errors = [];
    console.log(req.body)
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add a user id'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    }
    else {
        playerId = req.body.playerId
        let plProperty = [];
        playerProperty.findOne({ playerId: playerId }, (err, foundProperty) => {
            if (err) {
                res.json(err);
            }
            if (foundProperty) {
                res.json(foundProperty)
            }
            else {
                const url = `/user/${playerId}?selections=properties&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plProperty += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plProperty)
                            playProperty = JSON.parse(plProperty)
                            if (playProperty.errors) {
                                return res.json(playProperty.errors);
                            }
                            else {
                                res.json(playProperty)
                            }
                        }
                    });
                }).end().on("error", (err) => {
                    return res.json(err);
                });
            }
        })
    }
})

router.get('/allProperties', (req, res, next) => {
    playerProperty.find(function (err, playProperties) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playProperties);
        }
    });
})

router.delete('/deleteProperties', (req, res, next) => {
    playerProperty.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Properties deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveProperties', (req, res, next) => {

    const newProperties = new playerProperty({

        playerId: req.body.playerId,
        propertyType: req.body.propertyType,
        happy: req.body.happy,
        upkeep: req.body.upkeep,
        upgrades: req.body.upgrades,
        staff: req.body.staff,
        rented: req.body.rented,
        users_living: req.body.users_living,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.propertyType) {
        errors.push({
            text: 'Please add property type'
        });
    }
    if (!req.body.happy) {
        errors.push({
            text: 'Please add happy'
        });
    }
    if (!req.body.upkeep) {
        errors.push({
            text: 'Please add upkeep'
        });
    }
    if (!req.body.upgrades) {
        errors.push({
            text: 'Please add property type'
        });
    }
    if (!req.body.staff) {
        errors.push({
            text: 'Please add staff'
        });
    }
    if (!req.body.rented) {
        errors.push({
            text: 'Please add rented'
        });
    }
    if (!req.body.users_living) {
        errors.push({
            text: 'Please add users living'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerProperty.findOne({ playerId: newProperties.playerId })
            .exec()
            .then(playProperties => {
                if (playProperties) {
                    errors.push({
                        text: 'Properties already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newProperties
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Properties registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateProperties', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.propertyType) {
        errors.push({
            text: 'Please add property type'
        });
    }
    if (!req.body.happy) {
        errors.push({
            text: 'Please add happy'
        });
    }
    if (!req.body.upkeep) {
        errors.push({
            text: 'Please add upkeep'
        });
    }
    if (!req.body.upgrades) {
        errors.push({
            text: 'Please add property type'
        });
    }
    if (!req.body.staff) {
        errors.push({
            text: 'Please add staff'
        });
    }
    if (!req.body.rented) {
        errors.push({
            text: 'Please add rented'
        });
    }
    if (!req.body.users_living) {
        errors.push({
            text: 'Please add users living'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerProperty.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plProp => {
                if (plProp) {
                    playerProperty.findByIdAndUpdate(plProp._id, {
                        $set: {
                            playerId: req.body.playerId,
                            propertyType: req.body.propertyType,
                            happy: req.body.happy,
                            upkeep: req.body.upkeep,
                            upgrades: req.body.upgrades,
                            staff: req.body.staff,
                            rented: req.body.rented,
                            users_living: req.body.users_living,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedProp) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating properties'
                                });
                            } else {
                                if (updatedProp) {
                                    res.json({
                                        success: true,
                                        msg: 'properties updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating properties'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 