var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const Player = require('../../model/player');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/player', (req, res, next) => {
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
        let pl = [];
        Player.findOne({ playerId: playerId }, (err, foundPlayer) => {
            if (err) {
                res.json(err);
            }
            if (foundPlayer) {
                res.json(foundPlayer)
            }
            else {
                const url = `/user/${playerId}?selections=&key=${apikey}`
                optionsget.path = url
                https.request(optionsget, (resp) => {
                    resp.on('data', (chunk) => {
                        pl += chunk;
                    });
                    resp.on('end', () => {
                        if (resp.errors) {
                            return res.json(resp.errors);
                        }
                        else {
                            console.log(pl)
                            player = JSON.parse(pl)
                            if (player.errors) {
                                return res.json(player.errors);
                            }
                            else {
                                res.json(player)
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

router.get('/allPlayers', (req, res, next) => {
    Player.find(function (err, player) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(player);
        }
    });
})

router.delete('/deletePlayer', (req, res, next) => {
    Player.remove({ playerId: req.body.playerId })
        .exec()
        .then(result => {
            res.json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/savePlayer', (req, res, next) => {

    const newPlayer = new Player({
        rank: req.body.rank,
        level: req.body.level,
        gender: req.body.gender,
        property: req.body.property,
        signup: req.body.signup,
        awards: req.body.awards,
        friends: req.body.friends,
        enemies: req.body.enemies,
        forum_posts: req.body.forum_posts,
        karma: req.body.karma,
        age: req.body.age,
        role: req.body.role,
        playerId: req.body.playerId,
        name: req.body.name,
        property_id: req.body.property_id,
        life: req.body.life,
        status: req.body.status,
        job: req.body.job,
        faction: req.body.faction,
        married: req.body.married,
        states: req.body.states,
        last_action: req.body.last_action,
    });

    let errors = [];

    if (!req.body.rank) {
        errors.push({
            text: 'Please add a rank'
        });
    }
    if (!req.body.level) {
        errors.push({
            text: 'Please add a level'
        });
    }
    if (!req.body.gender) {
        errors.push({
            text: 'Please add a gender'
        });
    }
    if (!req.body.property) {
        errors.push({
            text: 'Please add a property'
        });
    }
    if (!req.body.signup) {
        errors.push({
            text: 'Please add a signup'
        });
    }
    if (!req.body.awards) {
        errors.push({
            text: 'Please add awards'
        });
    }
    if (!req.body.friends) {
        errors.push({
            text: 'Please add friends'
        });
    }
    if (!req.body.enemies) {
        errors.push({
            text: 'Please add enemies'
        });
    }
    if (!req.body.forum_posts) {
        errors.push({
            text: 'Please add forum_posts'
        });
    }
    if (!req.body.karma) {
        errors.push({
            text: 'Please add karma'
        });
    }
    if (!req.body.age) {
        errors.push({
            text: 'Please add age'
        });
    }
    if (!req.body.role) {
        errors.push({
            text: 'Please add role'
        });
    }
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.property_id) {
        errors.push({
            text: 'Please add property_id'
        });
    }
    if (!req.body.life) {
        errors.push({
            text: 'Please add life'
        });
    }
    if (!req.body.status) {
        errors.push({
            text: 'Please add status'
        });
    }
    if (!req.body.job) {
        errors.push({
            text: 'Please add position'
        });
    }
    if (!req.body.faction) {
        errors.push({
            text: 'Please add faction'
        });
    }
    if (!req.body.married) {
        errors.push({
            text: 'Please add married'
        });
    }
    if (!req.body.states) {
        errors.push({
            text: 'Please add states'
        });
    }
    if (!req.body.last_action) {
        errors.push({
            text: 'Please add last action'
        });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });
    } else {
        Player.findOne({ playerId: newPlayer.playerId })
            .exec()
            .then(player => {
                if (player) {
                    errors.push({
                        text: 'Player already registered'
                    });
                    res.send({
                        errors: errors
                    });
                } else {
                    newPlayer
                        .save()
                        .then(result => {
                            res.json({
                                success: true,
                                msg: 'Player registered',
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

    if (!req.body.rank) {
        errors.push({
            text: 'Please add a rank'
        });
    }
    if (!req.body.level) {
        errors.push({
            text: 'Please add a level'
        });
    }
    if (!req.body.gender) {
        errors.push({
            text: 'Please add a gender'
        });
    }
    if (!req.body.property) {
        errors.push({
            text: 'Please add a property'
        });
    }
    if (!req.body.signup) {
        errors.push({
            text: 'Please add a signup'
        });
    }
    if (!req.body.awards) {
        errors.push({
            text: 'Please add awards'
        });
    }
    if (!req.body.friends) {
        errors.push({
            text: 'Please add friends'
        });
    }
    if (!req.body.enemies) {
        errors.push({
            text: 'Please add enemies'
        });
    }
    if (!req.body.forum_posts) {
        errors.push({
            text: 'Please add forum_posts'
        });
    }
    if (!req.body.karma) {
        errors.push({
            text: 'Please add karma'
        });
    }
    if (!req.body.age) {
        errors.push({
            text: 'Please add age'
        });
    }
    if (!req.body.role) {
        errors.push({
            text: 'Please add role'
        });
    }
    if (!req.body.playerId) {
        errors.push({
            text: 'Please add playerId'
        });
    }
    if (!req.body.name) {
        errors.push({
            text: 'Please add name'
        });
    }
    if (!req.body.property_id) {
        errors.push({
            text: 'Please add property_id'
        });
    }
    if (!req.body.life) {
        errors.push({
            text: 'Please add life'
        });
    }
    if (!req.body.status) {
        errors.push({
            text: 'Please add status'
        });
    }
    if (!req.body.job) {
        errors.push({
            text: 'Please add position'
        });
    }
    if (!req.body.faction) {
        errors.push({
            text: 'Please add faction'
        });
    }
    if (!req.body.married) {
        errors.push({
            text: 'Please add married'
        });
    }
    if (!req.body.states) {
        errors.push({
            text: 'Please add states'
        });
    }
    if (!req.body.last_action) {
        errors.push({
            text: 'Please add last action'
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
                            rank: req.body.rank,
                            level: req.body.level,
                            gender: req.body.gender,
                            property: req.body.property,
                            signup: req.body.signup,
                            awards: req.body.awards,
                            friends: req.body.friends,
                            enemies: req.body.enemies,
                            forum_posts: req.body.forum_posts,
                            karma: req.body.karma,
                            age: req.body.age,
                            role: req.body.role,
                            playerId: req.body.playerId,
                            name: req.body.name,
                            property_id: req.body.property_id,
                            life: req.body.life,
                            status: req.body.status,
                            job: req.body.job,
                            faction: req.body.faction,
                            married: req.body.married,
                            states: req.body.states,
                            last_action: req.body.last_action,
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