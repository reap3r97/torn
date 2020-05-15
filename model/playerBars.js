const mongoose = require('mongoose');

const playerBarsSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    happy: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        increment: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        ticktime: {
            type: Number,
            required: true
        },
        fulltime: {
            type: Number,
            required: true
        },
    },
    life: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        increment: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        ticktime: {
            type: Number,
            required: true
        },
        fulltime: {
            type: Number,
            required: true
        },
    },
    energy: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        increment: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        ticktime: {
            type: Number,
            required: true
        },
        fulltime: {
            type: Number,
            required: true
        },
    },
    nerve: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        increment: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        ticktime: {
            type: Number,
            required: true
        },
        fulltime: {
            type: Number,
            required: true
        },
    },
    chain: {
        current: {
            type: Number,
            required: true
        },
        maximum: {
            type: Number,
            required: true
        },
        timeout: {
            type: Number,
            required: true
        },
        modifier: {
            type: Number,
            required: true
        },
        cooldown: {
            type: Number,
            required: true
        }
    }
});

const playerBars = module.exports = mongoose.model('playerBars', playerBarsSchema);