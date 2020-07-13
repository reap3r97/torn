var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const playerNetworth = require('../../model/playerNetworth');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/playerNetworth', (req, res, next) => {
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
        let plNetworth = [];
        playerNetworth.findOne({ playerId: playerId }, (err, foundNetworth) => {
            if (err) {
                res.json(err);
            }
            if (foundNetworth) {
                res.json(foundNetworth)
            }
            else {
                const url = `/user/${playerId}?selections=networth&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        plNetworth += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(plNetworth)
                            playNetworth = JSON.parse(plNetworth)
                            if (playNetworth.errors) {
                                return res.json(playNetworth.errors);
                            }
                            else {
                                res.json(playNetworth)
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

router.get('/allNetworth', (req, res, next) => {
    playerNetworth.find(function (err, playNetworth) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(playNetworth);
        }
    });
})

router.delete('/deleteNetworth', (req, res, next) => {
    playerNetworth.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'Networth deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveNetworth', (req, res, next) => {

    const newNetworth = new playerNetworth({
        playerId: req.body.playerId,
        pending: req.body.pending,
        wallet: req.body.wallet,
        bank: req.body.bank,
        points: req.body.points,
        cayman: req.body.cayman,
        vault: req.body.vault,
        piggybank: req.body.piggybank,
        items: req.body.items,
        displaycase: req.body.displaycase,
        bazaar: req.body.bazaar,
        properties: req.body.properties,
        stockmarket: req.body.stockmarket,
        auctionhouse: req.body.auctionhouse,
        company: req.body.company,
        bookie: req.body.bookie,
        loan: req.body.loan,
        unpaidfees: req.body.unpaidfees,
        total: req.body.total,
        parsetime: req.body.parsetime,
    });

    let errors = [];

    if (!req.body.pending) {
        errors.push({
            text: 'Please add pending'
        });
    }
    if (!req.body.wallet) {
        errors.push({
            text: 'Please add wallet'
        });
    }
    if (!req.body.bank) {
        errors.push({
            text: 'Please add bank'
        });
    }
    if (!req.body.points) {
        errors.push({
            text: 'Please add points'
        });
    }
    if (!req.body.cayman) {
        errors.push({
            text: 'Please add cayman'
        });
    }
    if (!req.body.vault) {
        errors.push({
            text: 'Please add vault'
        });
    }
    if (!req.body.piggybank) {
        errors.push({
            text: 'Please add piggybank'
        });
    }
    if (!req.body.items) {
        errors.push({
            text: 'Please add items'
        });
    }
    if (!req.body.displaycase) {
        errors.push({
            text: 'Please add display case'
        });
    }
    if (!req.body.bazaar) {
        errors.push({
            text: 'Please add bazaar'
        });
    }
    if (!req.body.properties) {
        errors.push({
            text: 'Please add properties'
        });
    }
    if (!req.body.stockmarket) {
        errors.push({
            text: 'Please add stockmarket'
        });
    }
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.auctionhouse) {
        errors.push({
            text: 'Please add auction house'
        });
    }
    if (!req.body.company) {
        errors.push({
            text: 'Please add company'
        });
    }
    if (!req.body.bookie) {
        errors.push({
            text: 'Please add bookie'
        });
    }
    if (!req.body.loan) {
        errors.push({
            text: 'Please add loan'
        });
    }
    if (!req.body.unpaidfees) {
        errors.push({
            text: 'Please add unpaid fees'
        });
    }
    if (!req.body.total) {
        errors.push({
            text: 'Please add total'
        });
    }
    if (!req.body.parsetime) {
        errors.push({
            text: 'Please add parse time'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerNetworth.findOne({ playerId: newNetworth.playerId })
            .exec()
            .then(playNetworth => {
                if (playNetworth) {
                    errors.push({
                        text: 'Networth already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newNetworth
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Networth registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateNetworth', (req, res, next) => {

    updated = Date.now();

    let errors = []

    if (!req.body.pending) {
        errors.push({
            text: 'Please add pending'
        });
    }
    if (!req.body.wallet) {
        errors.push({
            text: 'Please add wallet'
        });
    }
    if (!req.body.bank) {
        errors.push({
            text: 'Please add bank'
        });
    }
    if (!req.body.points) {
        errors.push({
            text: 'Please add points'
        });
    }
    if (!req.body.cayman) {
        errors.push({
            text: 'Please add cayman'
        });
    }
    if (!req.body.vault) {
        errors.push({
            text: 'Please add vault'
        });
    }
    if (!req.body.piggybank) {
        errors.push({
            text: 'Please add piggybank'
        });
    }
    if (!req.body.items) {
        errors.push({
            text: 'Please add items'
        });
    }
    if (!req.body.displaycase) {
        errors.push({
            text: 'Please add display case'
        });
    }
    if (!req.body.bazaar) {
        errors.push({
            text: 'Please add bazaar'
        });
    }
    if (!req.body.properties) {
        errors.push({
            text: 'Please add properties'
        });
    }
    if (!req.body.stockmarket) {
        errors.push({
            text: 'Please add stockmarket'
        });
    }
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.auctionhouse) {
        errors.push({
            text: 'Please add auction house'
        });
    }
    if (!req.body.company) {
        errors.push({
            text: 'Please add company'
        });
    }
    if (!req.body.bookie) {
        errors.push({
            text: 'Please add bookie'
        });
    }
    if (!req.body.loan) {
        errors.push({
            text: 'Please add loan'
        });
    }
    if (!req.body.unpaidfees) {
        errors.push({
            text: 'Please add unpaid fees'
        });
    }
    if (!req.body.total) {
        errors.push({
            text: 'Please add total'
        });
    }
    if (!req.body.parsetime) {
        errors.push({
            text: 'Please add parse time'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        playerNetworth.findOne({ playerId: req.body.playerId })
            .exec()
            .then(plNetworth => {
                if (plNetworth) {
                    playerNetworth.findByIdAndUpdate(plNetworth._id, {
                        $set: {
                            playerId: req.body.playerId,
                            pending: req.body.pending,
                            wallet: req.body.wallet,
                            bank: req.body.bank,
                            points: req.body.points,
                            cayman: req.body.cayman,
                            vault: req.body.vault,
                            piggybank: req.body.piggybank,
                            items: req.body.items,
                            displaycase: req.body.displaycase,
                            bazaar: req.body.bazaar,
                            properties: req.body.properties,
                            stockmarket: req.body.stockmarket,
                            auctionhouse: req.body.auctionhouse,
                            company: req.body.company,
                            bookie: req.body.bookie,
                            loan: req.body.loan,
                            unpaidfees: req.body.unpaidfees,
                            total: req.body.total,
                            parsetime: req.body.parsetime,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedNetworth) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating networth'
                                });
                            } else {
                                if (updatedNetworth) {
                                    res.json({
                                        success: true,
                                        msg: 'networth updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating networth'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router;