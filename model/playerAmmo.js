const mongoose = require('mongoose');

const playerAmmoSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    ammo: [{
        size: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        equipped: {
            type: Number,
            required: true
        }
    }]
});

const playerAmmo = module.exports = mongoose.model('playerAmmo', playerAmmoSchema);