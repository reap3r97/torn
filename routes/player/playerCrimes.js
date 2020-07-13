var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerCrimes = require('../../model/playerCrimes');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerCrimes', (req, res, next) => {
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
        let plCrimes = [];
        playerCrimes.findOne({ playerId: playerId }, (err, foundCrimes) => {
            if (err) {
                res.json(err);
            }
            if (foundCrimes) {
                res.json(foundCrimes)
            }
            else {
                const url = `/user/${playerId}?selections=crimes&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plCrimes += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plCrimes)
                            playCrimes = JSON.parse(plCrimes)
                            if (playCrimes.errors) {
                                return res.json(playCrimes.errors);
                            }
                            else {
                                res.json(playCrimes)
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

router.get('/allCrimes', (req, res, next) => {
    playerCrimes.find(function (err, playCrimes) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playCrimes);
        }
    });
})

router.delete('/deleteCrimes', (req, res, next) => {
    playerCrimes.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Crimes deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveCrimes', (req, res, next) => {

    const newCrimes = new playerCrimes({

        playerId: req.body.playerId,
        criminalrecord: req.body.criminalrecord,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.criminalrecord) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerCrimes.findOne({ playerId: newCrimes.playerId })
            .exec()
            .then(playCrimes => {
                if (playCrimes) {
                    errors.push({
                        text: 'Crimes already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newCrimes
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Crimes registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateCrimes', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.criminalrecord) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerCrimes.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plCrimes => {
                if (plCrimes) {
                    playerCrimes.findByIdAndUpdate(plCrimes._id, {
                        $set: {
                            playerId: req.body.playerId,
                            criminalrecord: req.body.criminalrecord,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedCrimes) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating crimes'
                                });
                            } else {
                                if (updatedCrimes) {
                                    res.json({
                                        success: true,
                                        msg: 'crimes updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating crimes'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;