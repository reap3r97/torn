var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const Company = require('../../model/company');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/company', (req, res, next) => {
    let errors = [];
    console.log(req.body)

    let comp = [];
    Company.findOne({ ID: ID }, (err, foundCompany) => {
        if (err) {
            res.json(err);
        }
        if (foundCompany) {
            res.json(foundCompany)
        }
        else {
            const url = `/company/?selections=&key=${apikey}`
            optionsget.path = url
            https.request(optionsget, (resp) => {
                resp.on('data', (chunk) => {
                    comp += chunk;
                });
                resp.on('end', () => {
                    if (resp.errors) {
                        return res.json(resp.errors);
                    }
                    else {
                        console.log(comp)
                        com = JSON.parse(comp)
                        if (com.errors) {
                            return res.json(com.errors);
                        }
                        else {
                            res.json(com)
                        }
                    }
                });
            }).end().on("error", (err) => {
                return res.json(err);
            });
        }
    })

})

router.get('/allCompanies', (req, res, next) => {
    Company.find(function (err, companies) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(companies);
        }
    });
})

router.delete('/deleteCompany', (req, res, next) => {
    Company.remove({ _id: req.body._id })
        .exec()
        .then(result => {
            res.json({
                message: 'Company deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveCompany', (req, res, next) => {

    const newCompany = new Company({

        ID: req.body.ID,
        rank: req.body.rank,
        name: req.body.name,
        directorId: req.body.directorId,
        employees_hired: req.body.employees_hired,
        employees_capacity: req.body.employees_capacity,
        daily_profit: req.body.daily_profit,
        weekly_profit: req.body.weekly_profit,
        daily_customers: req.body.daily_customers,
        weekly_customers: req.body.weekly_customers,
        days_old: req.body.days_old,
    });

    let errors = [];


    if (!req.body.ID) {
        errors.push({
            text: 'Please add ID'
        });
    }
    if (!req.body.rank) {
        errors.push({
            text: 'Please add rank'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.directorId) {
        errors.push({
            text: 'Please add director id'
        });
    }
    if (!req.body.employees_hired) {
        errors.push({
            text: 'Please add employees hired'
        });
    }
    if (!req.body.employees_capacity) {
        errors.push({
            text: 'Please add employees capacity'
        });
    }
    if (!req.body.daily_profit) {
        errors.push({
            text: 'Please add daily profit'
        });
    }
    if (!req.body.daily_customers) {
        errors.push({
            text: 'Please add daily customers'
        });
    }
    if (!req.body.weekly_customers) {
        errors.push({
            text: 'Please add weekly customers'
        });
    }
    if (!req.body.days_old) {
        errors.push({
            text: 'Please add days old'
        });
    }
    if (!req.body.weekly_profit) {
        errors.push({
            text: 'Please add weekly profit'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        Company.findOne({ ID: newCompany.ID })
            .exec()
            .then(Comp => {
                if (Comp) {
                    errors.push({
                        text: 'Company already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newCompany
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Company registered',
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
    if (!req.body.rank) {
        errors.push({
            text: 'Please add rank'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.directorId) {
        errors.push({
            text: 'Please add director id'
        });
    }
    if (!req.body.employees_hired) {
        errors.push({
            text: 'Please add employees hired'
        });
    }
    if (!req.body.employees_capacity) {
        errors.push({
            text: 'Please add employees capacity'
        });
    }
    if (!req.body.daily_profit) {
        errors.push({
            text: 'Please add daily profit'
        });
    }
    if (!req.body.daily_customers) {
        errors.push({
            text: 'Please add daily customers'
        });
    }
    if (!req.body.weekly_customers) {
        errors.push({
            text: 'Please add weekly customers'
        });
    }
    if (!req.body.days_old) {
        errors.push({
            text: 'Please add days old'
        });
    }
    if (!req.body.weekly_profit) {
        errors.push({
            text: 'Please add weekly profit'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        Company.findOne({ ID: req.body.ID })
            .exec()
            .then(comp => {
                if (comp) {
                    Company.findByIdAndUpdate(comp._id, {
                        $set: {
                            ID: req.body.ID,
                            rank: req.body.rank,
                            name: req.body.name,
                            directorId: req.body.directorId,
                            employees_hired: req.body.employees_hired,
                            employees_capacity: req.body.employees_capacity,
                            daily_profit: req.body.daily_profit,
                            weekly_profit: req.body.weekly_profit,
                            daily_customers: req.body.daily_customers,
                            weekly_customers: req.body.weekly_customers,
                            days_old: req.body.days_old,
                            updatedAt: updated
                        }
                    }, {
                        new: true
                    },
                        function (err, updatedComp) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'error updating company'
                                });
                            } else {
                                if (updatedComp) {
                                    res.json({
                                        success: true,
                                        msg: 'company updated'
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        msg: 'error updating company'
                                    });
                                }
                            }
                        });
                }
            });
    }
});

module.exports = router; 