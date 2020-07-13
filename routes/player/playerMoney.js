var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerMoney = require('../../model/playerMoney');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerMoney', (req, res, next) => {
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
        let plMoney = [];
        playerMoney.findOne({ playerId: playerId }, (err, foundMoney) => {
            if (err) {
                res.json(err);
            }
            if (foundMoney) {
                res.json(foundMoney)
            }
            else {
                const url = `/user/${playerId}?selections=money&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plMoney += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plMoney)
                            playMoney = JSON.parse(plMoney)
                            if (playMoney.errors) {
                                return res.json(playMoney.errors);
                            }
                            else {
                                res.json(playMoney)
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

router.get('/allMoney', (req, res, next) => {
    playerMoney.find(function (err, playerMoney) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playerMoney);
        }
    });
})

router.delete('/deleteMoney', (req, res, next) => {
    playerMoney.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Player money deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveMoney', (req, res, next) => {

    const newMoney = new playerMoney({

        playerId: req.body.playerId,
        points: req.body.points,
        cayman_bank: req.body.cayman_bank,
        vault_amount: req.body.vault_amount,
        networth: req.body.networth,
        money_onhand: req.body.money_onhand,
        city_bank: req.body.city_bank
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.points) {
        errors.push({
            text: 'Please add points'
        });
    }
    if (!req.body.cayman_bank) {
        errors.push({
            text: 'Please add cayman bank'
        });
    }
    if (!req.body.vault_amount) {
        errors.push({
            text: 'Please add vault amount'
        });
    }
    if (!req.body.networth) {
        errors.push({
            text: 'Please add networth'
        });
    }
    if (!req.body.money_onhand) {
        errors.push({
            text: 'Please add money on hand'
        });
    } if (!req.body.city_bank) {
        errors.push({
            text: 'Please add city bank'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerMoney.findOne({ playerId: newMoney.playerId })
            .exec()
            .then(playMoney => {
                if (playMoney) {
                    errors.push({
                        text: 'Money already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newMoney
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Money registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateMoney', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.points) {
        errors.push({
            text: 'Please add points'
        });
    }
    if (!req.body.cayman_bank) {
        errors.push({
            text: 'Please add cayman bank'
        });
    }
    if (!req.body.vault_amount) {
        errors.push({
            text: 'Please add vault amount'
        });
    }
    if (!req.body.networth) {
        errors.push({
            text: 'Please add networth'
        });
    }
    if (!req.body.money_onhand) {
        errors.push({
            text: 'Please add money on hand'
        });
    } if (!req.body.city_bank) {
        errors.push({
            text: 'Please add city bank'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerMoney.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plMoney => {
                if (plMoney) {
                    playerMoney.findByIdAndUpdate(plMoney._id, {
                        $set: {
                            playerId: req.body.playerId,
                            points: req.body.points,
                            cayman_bank: req.body.cayman_bank,
                            vault_amount: req.body.vault_amount,
                            networth: req.body.networth,
                            money_onhand: req.body.money_onhand,
                            city_bank: req.body.city_bank,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedMoney) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating money'
                                });
                            } else {
                                if (updatedMoney) {
                                    res.json({
                                        success: true,
                                        msg: 'money updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating money'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;