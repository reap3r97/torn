var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerPerks = require('../../model/playerPerks');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerPerks', (req, res, next) => {
    let errors = [];
    console.log(req.body)
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add a player id'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    }
    else {
        playerId = req.body.playerId
        let plPerks = [];
        playerPerks.findOne({ playerId: playerId }, (err, foundPerks) => {
            if (err) {
                res.json(err);
            }
            if (foundPerks) {
                res.json(foundPerks)
            }
            else {
                const url = `/user/${playerId}?selections=perks&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plPerks += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plPerks)
                            playPerks = JSON.parse(plPerks)
                            if (playPerks.errors) {
                                return res.json(playPerks.errors);
                            }
                            else {
                                res.json(playPerks)
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

router.get('/allPerks', (req, res, next) => {
    playerPerks.find(function (err, playPerks) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playPerks);
        }
    });
})

router.delete('/deletePerks', (req, res, next) => {
    playerPerks.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Perks deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/savePerks', (req, res, next) => {

    const newPerks = new playerBattleStats({
        playerId: req.body.playerId,
        job_perks: req.body.job_perks,
        property_perks: req.body.property_perks,
        stock_perks: req.body.stock_perks,
        merit_perks: req.body.merit_perks,
        education_perks: req.body.education_perks,
        enhancer_perks: req.body.enhancer_perks,
        company_perks: req.body.company_perks,
        faction_perks: req.body.faction_perks,
        book_perks: req.body.book_perks
    });

    let errors = [];

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.job_perks) {
        errors.push({
            text: 'Please add job perks'
        });
    }
    if (!req.body.property_perks) {
        errors.push({
            text: 'Please add property perks'
        });
    }
    if (!req.body.stock_perks) {
        errors.push({
            text: 'Please add stock perks'
        });
    }
    if (!req.body.merit_perks) {
        errors.push({
            text: 'Please add merit perks'
        });
    }
    if (!req.body.education_perks) {
        errors.push({
            text: 'Please add education perks'
        });
    }
    if (!req.body.enhancer_perks) {
        errors.push({
            text: 'Please add enhancer perks'
        });
    }
    if (!req.body.company_perks) {
        errors.push({
            text: 'Please add company perks'
        });
    }
    if (!req.body.faction_perks) {
        errors.push({
            text: 'Please add faction perks'
        });
    }
    if (!req.body.book_perks) {
        errors.push({
            text: 'Please add book perks'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerPerks.findOne({ playerId: newPerks.playerId })
            .exec()
            .then(playerPerk => {
                if (playerPerk) {
                    errors.push({
                        text: 'Perks already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newPerks
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Perks registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updatePerks', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.job_perks) {
        errors.push({
            text: 'Please add job perks'
        });
    }
    if (!req.body.property_perks) {
        errors.push({
            text: 'Please add property perks'
        });
    }
    if (!req.body.stock_perks) {
        errors.push({
            text: 'Please add stock perks'
        });
    }
    if (!req.body.merit_perks) {
        errors.push({
            text: 'Please add merit perks'
        });
    }
    if (!req.body.education_perks) {
        errors.push({
            text: 'Please add education perks'
        });
    }
    if (!req.body.enhancer_perks) {
        errors.push({
            text: 'Please add enhancer perks'
        });
    }
    if (!req.body.company_perks) {
        errors.push({
            text: 'Please add company perks'
        });
    }
    if (!req.body.faction_perks) {
        errors.push({
            text: 'Please add faction perks'
        });
    }
    if (!req.body.book_perks) {
        errors.push({
            text: 'Please add book perks'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerPerks.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plPerks => {
                if (plPerks) {
                    playerPerks.findByIdAndUpdate(plPerks._id, {
                        $set: {
                            playerId: req.body.playerId,
                            job_perks: req.body.job_perks,
                            property_perks: req.body.property_perks,
                            stock_perks: req.body.stock_perks,
                            merit_perks: req.body.merit_perks,
                            education_perks: req.body.education_perks,
                            enhancer_perks: req.body.enhancer_perks,
                            company_perks: req.body.company_perks,
                            faction_perks: req.body.faction_perks,
                            book_perks: req.body.book_perks,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedPerks) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating perks'
                                });
                            } else {
                                if (updatedPerks) {
                                    res.json({
                                        success: true,
                                        msg: 'Perks updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating perks'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;