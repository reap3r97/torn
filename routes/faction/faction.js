var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const Faction = require('../../model/faction');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/faction', (req, res, next) => {
    let errors = [];
    console.log(req.body)

    let comp = [];
    Faction.findOne({ ID: ID }, (err, foundFaction) => {
        if (err) {
            res.json(err);
        }
        if (foundFaction) {
            res.json(foundFaction)
        }
        else {
            const url = `/faction/?selections=&key=${apikey}`
            optionsget.path = url
            https.request(optionsget, (resp) => {
                resp.on('data', (chunk) => {
                    fact += chunk;
                });
                resp.on('end', () => {
                    if (resp.errors) {
                        return res.json(resp.errors);
                    }
                    else {
                        console.log(fact)
                        facts = JSON.parse(facts)
                        if (facts.errors) {
                            return res.json(facts.errors);
                        }
                        else {
                            res.json(facts)
                        }
                    }
                });
            }).end().on("error", (err) => {
                return res.json(err);
            });
        }
    })

})

router.get('/allFactions', (req, res, next) => {
    Faction.find(function (err, factions) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(factions);
        }
    });
})

router.delete('/deleteFaction', (req, res, next) => {
    Faction.remove({ _id: req.body._id })
        .exec()
        .then(result => {
            res.json({
                message: 'Faction deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveFaction', (req, res, next) => {

    const newFaction = new Faction({

        ID: req.body.ID,
        name: req.body.name,
        leaderId: req.body.leaderId,
        coleaderId: req.body.coleaderId,
        respect: req.body.respect,
        age: req.body.age,
        best_chain: req.body.best_chain,
    });

    let errors = [];


    if (!req.body.ID) {
        errors.push({
            text: 'Please add ID'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.leaderId) {
        errors.push({
            text: 'Please add leader id'
        });
    }
    if (!req.body.coleaderId) {
        errors.push({
            text: 'Please add co leader id'
        });
    }
    if (!req.body.respect) {
        errors.push({
            text: 'Please add respect'
        });
    }
    if (!req.body.age) {
        errors.push({
            text: 'Please add age'
        });
    }
    if (!req.body.best_chain) {
        errors.push({
            text: 'Please add best chain'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        Faction.findOne({ ID: newFaction.ID })
            .exec()
            .then(fac => {
                if (fac) {
                    errors.push({
                        text: 'Faction already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newFaction
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Faction registered',
                            });
                        }).catch(err => {
                            return res.json({ success: false, msg: 'Failed to register' })
                        })
                }
            });
    }
});

router.post('/updateFaction', (req, res, next) => {

    updated = Date.now();

    let errors = []


    if (!req.body.ID) {
        errors.push({
            text: 'Please add ID'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.leaderId) {
        errors.push({
            text: 'Please add leader id'
        });
    }
    if (!req.body.coleaderId) {
        errors.push({
            text: 'Please add co leader id'
        });
    }
    if (!req.body.respect) {
        errors.push({
            text: 'Please add respect'
        });
    }
    if (!req.body.age) {
        errors.push({
            text: 'Please add age'
        });
    }
    if (!req.body.best_chain) {
        errors.push({
            text: 'Please add best chain'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    }  else {
        Faction.findOne({ ID: req.body.ID })
            .exec()
            .then(fac => {
                if (fac) {
                    Faction.findByIdAndUpdate(fac._id, {
                        $set: {
                            ID: req.body.ID,
                            name: req.body.name,
                            leaderId: req.body.leaderId,
                            coleaderId: req.body.coleaderId,
                            respect: req.body.respect,
                            age: req.body.age,
                            best_chain: req.body.best_chain,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedFac) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating faction'
                                });
                            } else {
                                if (updatedFac) {
                                    res.json({
                                        success: true,
                                        msg: 'faction updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating faction'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 