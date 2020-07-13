var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerPersonalStats = require('../../model/playerPersonalStats');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerPersonalStats', (req, res, next) => {
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
        let plPersonalstats = [];
        playerPersonalStats.findOne({ playerId: playerId }, (err, foundStats) => {
            if (err) {
                res.json(err);
            }
            if (foundStats) {
                res.json(foundStats)
            }
            else {
                const url = `/user/${playerId}?selections=personalstats&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plPersonalstats += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plPersonalstats)
                            playStats = JSON.parse(plPersonalstats)
                            if (playStats.errors) {
                                return res.json(playStats.errors);
                            }
                            else {
                                res.json(playStats)
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

router.get('/allPersonalStats', (req, res, next) => {
    playerPersonalStats.find(function (err, playStats) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playStats);
        }
    });
})

router.delete('/deletePersonalStats', (req, res, next) => {
    playerPersonalStats.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Personal stats deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/savePersonalStats', (req, res, next) => {

    const newStats = new playerPersonalStats({

        playerId: req.body.playerId,
        personalStats: req.body.personalStats
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.personalStats) {
        errors.push({
            text: 'Please add personal stats'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerPersonalStats.findOne({ playerId: newStats.playerId })
            .exec()
            .then(playStats => {
                if (playStats) {
                    errors.push({
                        text: 'Personal stats already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newStats
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Personal stats registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updatePersonalStats', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.personalStats) {
        errors.push({
            text: 'Please add personal stats'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerPersonalStats.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plStats => {
                if (plStats) {
                    playerPersonalStats.findByIdAndUpdate(plStats._id, {
                        $set: {
                            playerId: req.body.playerId,
                            personalStats: req.body.personalStats,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedStats) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating personal stats'
                                });
                            } else {
                                if (updatedStats) {
                                    res.json({
                                        success: true,
                                        msg: 'personal stats updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating personal stats'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 