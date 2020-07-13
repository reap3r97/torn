const mongoose = require('mongoose');

const playerBattleStatsSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    strength: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    dexterity: {
        type: String,
        required: true
    },
    defense: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    strength_modifier: {
        type: Number,
        required: true
    },
    defense_modifier: {
        type: Number,
        required: true
    },
    speed_modifier: {
        type: Number,
        required: true
    },
    dexterity_modifier: {
        type: Number,
        required: true
    },
    strength_info: [{
        type: String,
        required: true
    }],
    defense_info: [{
        type: String,
        required: true
    }],
    speed_info: [{
        type: String,
        required: true
    }],
    dexterity_info: [{
        type: String,
        required: true
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const playerBattleStats = module.exports = mongoose.model('playerBattleStats', playerBattleStatsSchema);