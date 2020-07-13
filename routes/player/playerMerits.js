var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerMerits = require('../../model/playerMerits');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerMerits', (req, res, next) => {
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
        let plInventory = [];
        playerMerits.findOne({ playerId: playerId }, (err, foundMerits) => {
            if (err) {
                res.json(err);
            }
            if (foundMerits) {
                res.json(foundMerits)
            }
            else {
                const url = `/user/${playerId}?selections=merits&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plMerits += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plMerits)
                            playerMerits = JSON.parse(plMerits)
                            if (playMerits.errors) {
                                return res.json(playMerits.errors);
                            }
                            else {
                                res.json(playMerits)
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

router.get('/allMerits', (req, res, next) => {
    playerMerits.find(function (err, playMerits) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playMerits);
        }
    });
})

router.delete('/deleteMerits', (req, res, next) => {
    playerMerits.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Merits deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveMerits', (req, res, next) => {

    const newMerits = new playerMerits({

        playerId: req.body.playerId,
        merits: req.body.merits,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.merits) {
        errors.push({
            text: 'Please add merits'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerMerits.findOne({ playerId: newMerits.playerId })
            .exec()
            .then(playMerits => {
                if (playMerits) {
                    errors.push({
                        text: 'Merits already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newMerits
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Merits registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateMerits', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.merits) {
        errors.push({
            text: 'Please add merits'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerMerits.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plMerits => {
                if (plMerits) {
                    playerMerits.findByIdAndUpdate(plMerits._id, {
                        $set: {
                            playerId: req.body.playerId,
                            merits: req.body.merits,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedMerits) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating merits'
                                });
                            } else {
                                if (updatedMerits) {
                                    res.json({
                                        success: true,
                                        msg: 'merits updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating merits'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 