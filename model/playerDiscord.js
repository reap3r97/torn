const mongoose = require('mongoose');

const playerDiscordSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    discord: {
        userID: {
            type: Number,
            required: true
        },
        discordID: {
            type: String,
            required: true
        }
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    }
});

const playerDiscord = module.exports = mongoose.model('playerDiscord', playerDiscordSchema);