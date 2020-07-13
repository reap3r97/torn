var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerBars = require('../../model/playerBars');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerBars', (req, res, next) => {
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
        let plBars = [];
        playerBars.findOne({ playerId: playerId }, (err, foundPlayer) => {
            if (err) {
                res.json(err);
            }
            if (foundPlayer) {
                res.json(foundPlayer)
            }
            else {
                const url = `/user/${playerId}?selections=bars&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plBars += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plBars)
                            playBars = JSON.parse(plBars)
                            if (playBars.errors) {
                                return res.json(playBars.errors);
                            }
                            else {
                                res.json(playBars)
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

router.get('/allPlayerBars', (req, res, next) => {
    playerBars.find(function (err, playerBars) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playerBars);
        }
    });
})

router.delete('/deletePlayerBars', (req, res, next) => {
    playerBars.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Player bars deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/savePlayerBars', (req, res, next) => {

    const newPlayerBars = new playerBars({

        playerId: req.body.playerId,
        happy: req.body.happy,
        life: req.body.life,
        energy: req.body.energy,
        nerve: req.body.nerve,
        chain: req.body.chain
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.happy) {
        errors.push({
            text: 'Please add happy'
        });
    }
    if (!req.body.life) {
        errors.push({
            text: 'Please add life'
        });
    }
    if (!req.body.energy) {
        errors.push({
            text: 'Please add energy'
        });
    }
    if (!req.body.nerve) {
        errors.push({
            text: 'Please add nerve'
        });
    }
    if (!req.body.chain) {
        errors.push({
            text: 'Please add chain'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerBars.findOne({ playerId: newPlayerBars.playerId })
            .exec()
            .then(player => {
                if (player) {
                    errors.push({
                        text: 'Player bars already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newPlayerBars
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Player bars registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updatePlayer', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.happy) {
        errors.push({
            text: 'Please add happy'
        });
    }
    if (!req.body.life) {
        errors.push({
            text: 'Please add life'
        });
    }
    if (!req.body.energy) {
        errors.push({
            text: 'Please add energy'
        });
    }
    if (!req.body.nerve) {
        errors.push({
            text: 'Please add nerve'
        });
    }
    if (!req.body.chain) {
        errors.push({
            text: 'Please add chain'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        Player.findOne({ playerId: req.body.playerId })
            .exec()
            .then(pl => {
                if (pl) {
                    Player.findByIdAndUpdate(pl._id, {
                        $set: {
                            playerId: req.body.playerId,
                            happy: req.body.happy,
                            life: req.body.life,
                            energy: req.body.energy,
                            nerve: req.body.nerve,
                            chain: req.body.chain,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedPlayer) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating player'
                                });
                            } else {
                                if (updatedPlayer) {
                                    res.json({
                                        success: true,
                                        msg: 'player updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating player'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;