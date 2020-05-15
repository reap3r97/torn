const mongoose = require('mongoose');

const playerMoneySchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    cayman_bank: {
        type: Number,
        required: true
    },
    vault_amount: {
        type: Number,
        required: true
    },
    networth: {
        type: Number,
        required: true
    },
    money_onhand: {
        type: Number,
        required: true
    },
    city_bank: {
        amount: {
            type: Number,
            required: true
        },
        time_left: {
            type: Number,
            required: true
        }
    }
});

const playerMoney = module.exports = mongoose.model('playerMoney', playerMoneySchema);