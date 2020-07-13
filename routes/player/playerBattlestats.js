var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerBattleStats = require('../../model/playerBattleStats');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerBattlestats', (req, res, next) => {
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
        let plBattlestats = [];
        playerBattleStats.findOne({ playerId: playerId }, (err, foundPlayer) => {
            if (err) {
                res.json(err);
            }
            if (foundPlayer) {
                res.json(foundPlayer)
            }
            else {
                const url = `/user/${playerId}?selections=battlestats&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plBattlestats += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plBattlestats)
                            playBattlestats = JSON.parse(plBattlestats)
                            if (playBattlestats.errors) {
                                return res.json(playBattlestats.errors);
                            }
                            else {
                                res.json(playBattlestats)
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

router.get('/allBattlestats', (req, res, next) => {
    playerBattleStats.find(function (err, playBattlestats) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playBattlestats);
        }
    });
})

router.delete('/deleteBattleStats', (req, res, next) => {
    playerBattleStats.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Battle stats deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveBattlestats', (req, res, next) => {

    const newBattlestats = new playerBattleStats({

        playerId: req.body.playerId,
        strength: req.body.strength,
        speed: req.body.speed,
        dexterity: req.body.dexterity,
        defense: req.body.defense,
        total: req.body.total,
        strength_modifier: req.body.strength_modifier,
        defense_modifier: req.body.defense_modifier,
        speed_modifier: req.body.speed_modifier,
        dexterity_modifier: req.body.dexterity_modifier,
        strength_info: req.body.strength_info,
        defense_info: req.body.defense_info,
        speed_info: req.body.speed_info,
        dexterity_info: req.body.dexterity_info,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.strength) {
        errors.push({
            text: 'Please add strength'
        });
    }
    if (!req.body.speed) {
        errors.push({
            text: 'Please add speed'
        });
    }
    if (!req.body.dexterity) {
        errors.push({
            text: 'Please add dexterity'
        });
    }
    if (!req.body.defense) {
        errors.push({
            text: 'Please add defense'
        });
    }
    if (!req.body.total) {
        errors.push({
            text: 'Please add total'
        });
    }
    if (!req.body.strength_modifier) {
        errors.push({
            text: 'Please add strength modifier'
        });
    }
    if (!req.body.defense_modifier) {
        errors.push({
            text: 'Please add defense modifier'
        });
    }
    if (!req.body.speed_modifier) {
        errors.push({
            text: 'Please add speed modifier'
        });
    }
    if (!req.body.dexterity_modifier) {
        errors.push({
            text: 'Please add dexterity modifier'
        });
    }
    if (!req.body.strength_info) {
        errors.push({
            text: 'Please add strength info'
        });
    }
    if (!req.body.defense_info) {
        errors.push({
            text: 'Please add defense info'
        });
    }
    if (!req.body.speed_info) {
        errors.push({
            text: 'Please add speed info'
        });
    }
    if (!req.body.dexterity_info) {
        errors.push({
            text: 'Please add dexterity info'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerBattleStats.findOne({ playerId: newBattlestats.playerId })
            .exec()
            .then(playerBattle => {
                if (playerBattle) {
                    errors.push({
                        text: 'Battlestats already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newBattlestats
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Battle stats registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateBattlestats', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.strength) {
        errors.push({
            text: 'Please add strength'
        });
    }
    if (!req.body.speed) {
        errors.push({
            text: 'Please add speed'
        });
    }
    if (!req.body.dexterity) {
        errors.push({
            text: 'Please add dexterity'
        });
    }
    if (!req.body.defense) {
        errors.push({
            text: 'Please add defense'
        });
    }
    if (!req.body.total) {
        errors.push({
            text: 'Please add total'
        });
    }
    if (!req.body.strength_modifier) {
        errors.push({
            text: 'Please add strength modifier'
        });
    }
    if (!req.body.defense_modifier) {
        errors.push({
            text: 'Please add defense modifier'
        });
    }
    if (!req.body.speed_modifier) {
        errors.push({
            text: 'Please add speed modifier'
        });
    }
    if (!req.body.dexterity_modifier) {
        errors.push({
            text: 'Please add dexterity modifier'
        });
    }
    if (!req.body.strength_info) {
        errors.push({
            text: 'Please add strength info'
        });
    }
    if (!req.body.defense_info) {
        errors.push({
            text: 'Please add defense info'
        });
    }
    if (!req.body.speed_info) {
        errors.push({
            text: 'Please add speed info'
        });
    }
    if (!req.body.dexterity_info) {
        errors.push({
            text: 'Please add dexterity info'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerBattleStats.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plBattle => {
                if (plBattle) {
                    playerBattleStats.findByIdAndUpdate(plBattle._id, {
                        $set: {
                            playerId: req.body.playerId,
                            strength: req.body.strength,
                            speed: req.body.speed,
                            dexterity: req.body.dexterity,
                            defense: req.body.defense,
                            total: req.body.total,
                            strength_modifier: req.body.strength_modifier,
                            defense_modifier: req.body.defense_modifier,
                            speed_modifier: req.body.speed_modifier,
                            dexterity_modifier: req.body.dexterity_modifier,
                            strength_info: req.body.strength_info,
                            defense_info: req.body.defense_info,
                            speed_info: req.body.speed_info,
                            dexterity_info: req.body.dexterity_info,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedBattlestats) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating battle stats'
                                });
                            } else {
                                if (updatedBattlestats) {
                                    res.json({
                                        success: true,
                                        msg: 'battle stats updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating battle stats'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;