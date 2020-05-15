const mongoose = require('mongoose');

const playerMeritsSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    merits: {
        nerveBar: {
            type: Number,
            required: true
        },
        criticalHitRate: {
            type: Number,
            required: true
        },
        lifePoints: {
            type: Number,
            required: true
        },
        crimeExperience: {
            type: Number,
            required: true
        },
        educationLength: {
            type: Number,
            required: true
        },
        awareness: {
            type: Number,
            required: true
        },
        bankInterest: {
            type: Number,
            required: true
        },
        masterfulLooting: {
            type: Number,
            required: true
        },
        stealth: {
            type: Number,
            required: true
        },
        hospitalizing: {
            type: Number,
            required: true
        },
        brawn: {
            type: Number,
            required: true
        },
        protection: {
            type: Number,
            required: true
        },
        sharpness: {
            type: Number,
            required: true
        },
        evasion: {
            type: Number,
            required: true
        },
        heavyArtilleryMastery: {
            type: Number,
            required: true
        },
        machineGunMastery: {
            type: Number,
            required: true
        },
        rifleMastery: {
            type: Number,
            required: true
        },
        smgMastery: {
            type: Number,
            required: true
        },
        shotgunMastery: {
            type: Number,
            required: true
        },
        pistolMastery: {
            type: Number,
            required: true
        },
        clubMastery: {
            type: Number,
            required: true
        },
        piercingMastery: {
            type: Number,
            required: true
        },
        slashingMastery: {
            type: Number,
            required: true
        },
        mechanicalMastery: {
            type: Number,
            required: true
        },
        temporaryMastery: {
            type: Number,
            required: true
        }
    }
});

const playerMerits = module.exports = mongoose.model('playerMerits', playerMeritsSchema);