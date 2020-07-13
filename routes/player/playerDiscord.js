var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerDiscord = require('../../model/playerDiscord');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerDiscord', (req, res, next) => {
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
        let plDiscord = [];
        playerDiscord.findOne({ playerId: playerId }, (err, foundDiscord) => {
            if (err) {
                res.json(err);
            }
            if (foundDiscord) {
                res.json(foundDiscord)
            }
            else {
                const url = `/user/${playerId}?selections=discord&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plDiscord += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plDiscord)
                            playDiscord = JSON.parse(plDiscord)
                            if (playDiscord.errors) {
                                return res.json(playDiscord.errors);
                            }
                            else {
                                res.json(playDiscord)
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

router.get('/allDiscord', (req, res, next) => {
    playerDiscord.find(function (err, playDiscord) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playDiscord);
        }
    });
})

router.delete('/deleteDiscord', (req, res, next) => {
    playerDiscord.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Discord deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveDiscord', (req, res, next) => {

    const newDiscord = new playerDiscord({

        playerId: req.body.playerId,
        discord: req.body.discord,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.discord) {
        errors.push({
            text: 'Please add discord'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerDiscord.findOne({ playerId: newDiscord.playerId })
            .exec()
            .then(playDiscord => {
                if (playDiscord) {
                    errors.push({
                        text: 'Discord already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newDiscord
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Discord registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateDiscord', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.discord) {
        errors.push({
            text: 'Please add discord'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerDiscord.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plDiscord => {
                if (plDiscord) {
                    playerDiscord.findByIdAndUpdate(plDiscord._id, {
                        $set: {
                            playerId: req.body.playerId,
                            discord: req.body.discord,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedDiscord) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating discord'
                                });
                            } else {
                                if (updatedDiscord) {
                                    res.json({
                                        success: true,
                                        msg: 'discord updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating discord'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;