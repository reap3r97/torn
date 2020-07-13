const mongoose = require('mongoose');

const playerPersonalStatsSchema = mongoose.Schema({
    playerId: {
        type: Number,
        required: true
    },
    personalStats: {
        logins: {
            type: Number,
            required: true
        },
        useractivity: {
            type: Number,
            required: true
        },
        networth: {
            type: Number,
            required: true
        },
        mailssent: {
            type: Number,
            required: true
        },
        missioncreditsearned: {
            type: Number,
            required: true
        },
        weaponsbought: {
            type: Number,
            required: true
        },
        attackmisses: {
            type: Number,
            required: true
        },
        attackdamage: {
            type: Number,
            required: true
        },
        attackhits: {
            type: Number,
            required: true
        },
        attackcriticalhits: {
            type: Number,
            required: true
        },
        axehits: {
            type: Number,
            required: true
        },
        attacksstealthed: {
            type: Number,
            required: true
        },
        moneymugged: {
            type: Number,
            required: true
        },
        largestmug: {
            type: Number,
            required: true
        },
        attackswon: {
            type: Number,
            required: true
        },
        unarmoredwon: {
            type: Number,
            required: true
        },
        highestbeaten: {
            type: Number,
            required: true
        },
        bestkillstreak: {
            type: Number,
            required: true
        },
        killstreak: {
            type: Number,
            required: true
        },
        dumpsearches: {
            type: Number,
            required: true
        },
        dumpfinds: {
            type: Number,
            required: true
        },
        roundsfired: {
            type: Number,
            required: true
        },
        jailed: {
            type: Number,
            required: true
        },
        hospital: {
            type: Number,
            required: true
        },
        attackslost: {
            type: Number,
            required: true
        },
        dumpsearches: {
            type: Number,
            required: true
        },
        contractscompleted: {
            type: Number,
            required: true
        },
        dukecontractscompleted: {
            type: Number,
            required: true
        },
        h2hhits: {
            type: Number,
            required: true
        },
        dumpsearches: {
            type: Number,
            required: true
        },
        pishits: {
            type: Number,
            required: true
        },
        moneyinvested: {
            type: Number,
            required: true
        },
        investedprofit: {
            type: Number,
            required: true
        },
        defendswon: {
            type: Number,
            required: true
        },
        bountiesplaced: {
            type: Number,
            required: true
        },
        totalbountyspent: {
            type: Number,
            required: true
        },
        itemssent: {
            type: Number,
            required: true
        },
        defendslost: {
            type: Number,
            required: true
        },
        rifhits: {
            type: Number,
            required: true
        },
        slahits: {
            type: Number,
            required: true
        },
        missionscompleted: {
            type: Number,
            required: true
        },
        awards: {
            type: Number,
            required: true
        },
        piehits: {
            type: Number,
            required: true
        },
        itemsdumped: {
            type: Number,
            required: true
        },
        onehitkills: {
            type: Number,
            required: true
        },
        virusescoded: {
            type: Number,
            required: true
        },
        bountiesreceived: {
            type: Number,
            required: true
        },
        chahits: {
            type: Number,
            required: true
        },
        auctionswon: {
            type: Number,
            required: true
        },
        grehits: {
            type: Number,
            required: true
        },
        respectforfaction: {
            type: Number,
            required: true
        },
        consumablesused: {
            type: Number,
            required: true
        },
        candyused: {
            type: Number,
            required: true
        },
        alcoholused: {
            type: Number,
            required: true
        },
        drugsused: {
            type: Number,
            required: true
        },
        exttaken: {
            type: Number,
            required: true
        },
        lsdtaken: {
            type: Number,
            required: true
        },
        itemsbought: {
            type: Number,
            required: true
        },
        cantaken: {
            type: Number,
            required: true
        },
        organisedcrimes: {
            type: Number,
            required: true
        },
        attacksdraw: {
            type: Number,
            required: true
        },
        trainsreceived: {
            type: Number,
            required: true
        },
        medstolen: {
            type: Number,
            required: true
        },
        medicalitemsused: {
            type: Number,
            required: true
        },
        bountiescollected: {
            type: Number,
            required: true
        },
        totalbountyreward: {
            type: Number,
            required: true
        },
        factionmailssent: {
            type: Number,
            required: true
        },
        traveltimes: {
            type: Number,
            required: true
        },
        traveltime: {
            type: Number,
            required: true
        },
        cantravel: {
            type: Number,
            required: true
        },
        itemsboughtabroad: {
            type: Number,
            required: true
        },
        dumpsearches: {
            type: Number,
            required: true
        },
        soutravel: {
            type: Number,
            required: true
        },
        mextravel: {
            type: Number,
            required: true
        },
        caytravel: {
            type: Number,
            required: true
        },
        hawtravel: {
            type: Number,
            required: true
        },
        smghits: {
            type: Number,
            required: true
        },
        shohits: {
            type: Number,
            required: true
        },
        argtravel: {
            type: Number,
            required: true
        },
        revivesreceived: {
            type: Number,
            required: true
        },
        chitravel: {
            type: Number,
            required: true
        },
        lontravel: {
            type: Number,
            required: true
        },
        japtravel: {
            type: Number,
            required: true
        },
        switravel: {
            type: Number,
            required: true
        },
        energydrinksused: {
            type: Number,
            required: true
        },
        bestdamage: {
            type: Number,
            required: true
        },
        cityfinds: {
            type: Number,
            required: true
        },
        pointsbought: {
            type: Number,
            required: true
        },
        defendsstalemated: {
            type: Number,
            required: true
        },
        failedbusts: {
            type: Number,
            required: true
        },
        receivedbountyvalue: {
            type: Number,
            required: true
        },
        networthwallet: {
            type: Number,
            required: true
        },
        networthitems: {
            type: Number,
            required: true
        },
        networthproperties: {
            type: Number,
            required: true
        },
        networthcompany: {
            type: Number,
            required: true
        },
        networthunpaidfees: {
            type: Number,
            required: true
        },
        victaken: {
            type: Number,
            required: true
        },
        theyrunaway: {
            type: Number,
            required: true
        },
        networthpending: {
            type: Number,
            required: true
        },
        networthbank: {
            type: Number,
            required: true
        },
        networthpoints: {
            type: Number,
            required: true
        },
        networthcayman: {
            type: Number,
            required: true
        },
        networthvault: {
            type: Number,
            required: true
        },
        networthstockmarket: {
            type: Number,
            required: true
        },
        networthauctionhouse: {
            type: Number,
            required: true
        },
        networthloan: {
            type: Number,
            required: true
        },
        cityitemsbought: {
            type: Number,
            required: true
        },
        networthpiggybank: {
            type: Number,
            required: true
        },
        networthdisplaycase: {
            type: Number,
            required: true
        },
        networthbazaar: {
            type: Number,
            required: true
        },
        networthbookie: {
            type: Number,
            required: true
        },
        xantaken: {
            type: Number,
            required: true
        },
        dubtravel: {
            type: Number,
            required: true
        },
        trades: {
            type: Number,
            required: true
        },
        pointssold: {
            type: Number,
            required: true
        },
        overdosed: {
            type: Number,
            required: true
        },
        friendmailssent: {
            type: Number,
            required: true
        },
        racingskill: {
            type: Number,
            required: true
        },
        racingpointsearned: {
            type: Number,
            required: true
        },
        racesentered: {
            type: Number,
            required: true
        },
        raceswon: {
            type: Number,
            required: true
        },
        yourunaway: {
            type: Number,
            required: true
        },
        attacksassisted: {
            type: Number,
            required: true
        },
        bazaarcustomers: {
            type: Number,
            required: true
        },
        bazaarsales: {
            type: Number,
            required: true
        },
        bazaarprofit: {
            type: Number,
            required: true
        },
        revives: {
            type: Number,
            required: true
        },
        daysbeendonator: {
            type: Number,
            required: true
        },
        stockpayouts: {
            type: Number,
            required: true
        },
        refills: {
            type: Number,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});


const playerPersonalStats = module.exports = mongoose.model('playerPersonalStats', playerPersonalStatsSchema);