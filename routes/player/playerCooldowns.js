var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerCooldowns = require('../../model/playerCooldowns');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerCooldowns', (req, res, next) => {
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
        let plCool = [];
        playerCooldowns.findOne({ playerId: playerId }, (err, foundCooldowns) => {
            if (err) {
                res.json(err);
            }
            if (foundCooldowns) {
                res.json(foundCooldowns)
            }
            else {
                const url = `/user/${playerId}?selections=cooldowns&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plCool += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plCool)
                            playCool = JSON.parse(plCool)
                            if (playCool.errors) {
                                return res.json(playCool.errors);
                            }
                            else {
                                res.json(playCool)
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

router.get('/allCooldowns', (req, res, next) => {
    playerCooldowns.find(function (err, playCools) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playCools);
        }
    });
})

router.delete('/deleteCooldowns', (req, res, next) => {
    playerCooldowns.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Cooldowns deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveCooldowns', (req, res, next) => {

    const newCooldown = new playerCooldowns({
        playerId: req.body.playerId,
        cooldowns: req.body.cooldowns,
    });

    let errors = [];

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.cooldowns) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerCooldowns.findOne({ playerId: newCooldown.playerId })
            .exec()
            .then(playerCool => {
                if (playerCool) {
                    errors.push({
                        text: 'Player cooldown already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newCooldown
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Cooldown registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateCooldown', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.cooldowns) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerCooldowns.findOne({ playerId: req.body.playerId })
            .exec()
            .then(pl => {
                if (pl) {
                    playerCooldowns.findByIdAndUpdate(pl._id, {
                        $set: {
                            playerId: req.body.playerId,
                            cooldowns: req.body.cooldowns,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedCooldown) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating cooldown'
                                });
                            } else {
                                if (updatedCooldown) {
                                    res.json({
                                        success: true,
                                        msg: 'cooldown updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating cooldown'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;