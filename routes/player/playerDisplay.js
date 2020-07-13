var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerDisplay = require('../../model/playerDisplay');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerDisplay', (req, res, next) => {
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
        let plDisplay = [];
        playerDisplay.findOne({ playerId: playerId }, (err, foundDisplay) => {
            if (err) {
                res.json(err);
            }
            if (foundDisplay) {
                res.json(foundDisplay)
            }
            else {
                const url = `/user/${playerId}?selections=display&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plDisplay += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plDisplay)
                            playDisplay = JSON.parse(plDisplay)
                            if (playDisplay.errors) {
                                return res.json(playDisplay.errors);
                            }
                            else {
                                res.json(playDisplay)
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

router.get('/allDisplay', (req, res, next) => {
    playerDisplay.find(function (err, playDisplay) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playDisplay);
        }
    });
})

router.delete('/deleteDisplay', (req, res, next) => {
    playerDisplay.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Display deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveDisplay', (req, res, next) => {

    const newDisplay = new playerDisplay({

        playerId: req.body.playerId,
        display: req.body.display,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.display) {
        errors.push({
            text: 'Please add display'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerDisplay.findOne({ playerId: newDisplay.playerId })
            .exec()
            .then(playDisplay => {
                if (playDisplay) {
                    errors.push({
                        text: 'Display already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newDisplay
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Display registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateDisplay', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.display) {
        errors.push({
            text: 'Please add display'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerDisplay.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plDisplay => {
                if (plDisplay) {
                    playerDisplay.findByIdAndUpdate(plDisplay._id, {
                        $set: {
                            playerId: req.body.playerId,
                            display: req.body.display,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedDisplay) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating display'
                                });
                            } else {
                                if (updatedDisplay) {
                                    res.json({
                                        success: true,
                                        msg: 'display updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating display'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 