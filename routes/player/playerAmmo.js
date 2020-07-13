var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerAmmo = require('../../model/playerAmmo');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerAmmo', (req, res, next) => {
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
        let amm = [];
        playerAmmo.findOne({ playerId: playerId }, (err, ammo) => {
            if (err) {
                res.json(err);
            }
            if (ammo) {
                res.json(ammo)
            }
            else {
                const url = `/user/${playerId}?selections=ammo&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        amm += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(amm)
                            ammo = JSON.parse(amm)
                            if (ammo.errors) {
                                return res.json(ammo.errors);
                            }
                            else {
                                res.json(ammo)
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

router.get('/allAmmo', (req, res, next) => {
    playerAmmo.find(function (err, ammo) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(ammo);
        }
    });
})

router.delete('/deletePlayerAmmo', (req, res, next) => {
    playerAmmo.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Player ammo deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/savePlayerAmmo', (req, res, next) => {

    const newPlayerAmmo = new playerAmmo({
        playerId: req.body.playerId,
        ammo: req.body.ammo
    });

    let errors = [];

    if (!newPlayerAmmo.playerId) {
        errors.push({
            text: 'Please add a player id'
        });
    }
    if (!newPlayerAmmo.ammo) {
        errors.push({
            text: 'Please add an ammo'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerAmmo.findOne({ playerId: newPlayerAmmo.playerId })
            .exec()
            .then(player => {
                if (player) {
                    errors.push({
                        text: 'Player ammo already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newPlayerAmmo
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Player ammo registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateplayerAmmo', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!newPlayerAmmo.playerId) {
        errors.push({
            text: 'Please add a player id'
        });
    }
    if (!newPlayerAmmo.ammo) {
        errors.push({
            text: 'Please add an ammo'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerAmmo.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plAmmo => {
                if (plAmmo) {
                    playerAmmo.findByIdAndUpdate(plAmmo._id, {
                        $set: {
                            playerId: req.body.playerId,
                            ammo: req.body.ammo,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedPlayerAmmo) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating player ammo'
                                });
                            } else {
                                if (updatedPlayerAmmo) {
                                    res.json({
                                        success: true,
                                        msg: 'player ammo updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating player ammo'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;