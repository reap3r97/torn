const mongoose = require('mongoose');

const playerCooldownsSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    cooldowns: {
        drug: {
            type: Number,
            required: true
        },
        medical: {
            type: Number,
            required: true
        },
        booster: {
            type: Number,
            required: true
        }
    }
});

const playerCooldowns = module.exports = mongoose.model('playerCooldowns', playerCooldownsSchema);