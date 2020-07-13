var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerInventory = require('../../model/playerInventory');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerInventory', (req, res, next) => {
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
        playerInventory.findOne({ playerId: playerId }, (err, foundInventory) => {
            if (err) {
                res.json(err);
            }
            if (foundInventory) {
                res.json(foundInventory)
            }
            else {
                const url = `/user/${playerId}?selections=inventory&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plInventory += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plInventory)
                            playInventory = JSON.parse(plInventory)
                            if (playInventory.errors) {
                                return res.json(playInventory.errors);
                            }
                            else {
                                res.json(playInventory)
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

router.get('/allInventory', (req, res, next) => {
    playerInventory.find(function (err, playInventory) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playInventory);
        }
    });
})

router.delete('/deleteInventory', (req, res, next) => {
    playerInventory.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Inventory deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveInventory', (req, res, next) => {

    const newInventory = new playerInventory({

        playerId: req.body.playerId,
        inventory: req.body.inventory,
    });

    let errors = [];


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.inventory) {
        errors.push({
            text: 'Please add inventory'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerInventory.findOne({ playerId: newInventory.playerId })
            .exec()
            .then(playInventory => {
                if (playInventory) {
                    errors.push({
                        text: 'Inventory already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newInventory
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Inventory registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateInventory', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.inventory) {
        errors.push({
            text: 'Please add inventory'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerInventory.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plInventory => {
                if (plInventory) {
                    playerInventory.findByIdAndUpdate(plInventory._id, {
                        $set: {
                            playerId: req.body.playerId,
                            inventory: req.body.inventory,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedInventory) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating inventory'
                                });
                            } else {
                                if (updatedInventory) {
                                    res.json({
                                        success: true,
                                        msg: 'inventory updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating inventory'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 