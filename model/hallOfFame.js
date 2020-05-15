const mongoose = require('mongoose');

const hallOfFameSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    attacks: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    battlestats: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    busts: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    defends: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    networth: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    offences: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    revives: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    traveled: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    workstats: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    level: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    rank: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    respect: {
        value: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
});

const hallOfFame = module.exports = mongoose.model('hallOfFame', hallOfFameSchema);