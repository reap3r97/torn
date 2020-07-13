var express = require('express');
var router = express.Router();
const https = require('https');

var fs = require('fs');
var apikey = fs.readFileSync('./key/key.txt', 'utf8')

const overallStats = require('../../model/overallStats');

optionsget = {

    host: 'api.torn.com',
    path: '',
    method: 'GET'

};

router.post('/getStats', (req, res, next) => {
    let errors = [];
    console.log(req.body)

    let comp = [];
    overallStats.find(function (err, foundStats) {
        if (err) {
            res.json(err);
        }
        if (foundStats) {
            res.json(foundStats)
        }
        else {
            const url = `/torn/?selections=stats&key=${apikey}`
            optionsget.path = url
            https.request(optionsget, (resp) => {
                resp.on('data', (chunk) => {
                    st += chunk;
                });
                resp.on('end', () => {
                    if (resp.errors) {
                        return res.json(resp.errors);
                    }
                    else {
                        console.log(st)
                        stats = JSON.parse(stats)
                        if (stats.errors) {
                            return res.json(stats.errors);
                        }
                        else {
                            res.json(stats)
                        }
                    }
                });
            }).end().on("error", (err) => {
                return res.json(err);
            });
        }
    })

})

router.get('/allCompanies', (req, res, next) => {
    Company.find(function (err, companies) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(companies);
        }
    });
})

router.delete('/deleteCompany', (req, res, next) => {
    Company.remove({ _id: req.body._id })
        .exec()
        .then(result => {
            res.json({
                message: 'Company deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err
            });
        })
});

router.post('/saveStats', (req, res, next) => {

    const newStats = new overallStats({

        timestamp: req.body.timestamp,
        users_total: req.body.users_total,
        users_male: req.body.users_male,
        users_female: req.body.users_female,
        users_marriedcouples: req.body.users_marriedcouples,
        users_daily: req.body.users_daily,
        total_users_logins: req.body.total_users_logins,
        total_users_playtime: req.body.total_users_playtime,
        job_army: req.body.job_army,
        job_grocer: req.body.job_grocer,
        job_medical: req.body.job_medical,
        job_casino: req.body.job_casino,
        job_education: req.body.job_education,
        job_law: req.body.job_law,
        job_company: req.body.job_company,
        job_none: req.body.job_none,
        crimes: req.body.crimes,
        jailed: req.body.jailed,
        money_onhand: req.body.money_onhand,
        money_average: req.body.money_average,
        money_citybank: req.body.money_citybank,
        items: req.body.items,
        events: req.body.events,
        points_total: req.body.points_total,
        points_market: req.body.points_market,
        points_averagecost: req.body.points_averagecost,
        points_bought: req.body.points_bought,
        total_points_boughttotal: req.body.total_points_boughttotal,
        total_attacks_won: req.body.total_attacks_won,
        total_attacks_lost: req.body.total_attacks_lost,
        total_attacks_stalemated: req.body.total_attacks_stalemated,
        total_attacks_runaway: req.body.total_attacks_runaway,
        total_attacks_hits: req.body.total_attacks_hits,
        total_attacks_misses: req.body.total_attacks_misses,
        total_attacks_criticalhits: req.body.total_attacks_criticalhits,
        total_attacks_roundsfired: req.body.total_attacks_roundsfired,
        total_attacks_stealthed: req.body.total_attacks_stealthed,
        total_attacks_moneymugged: req.body.total_attacks_moneymugged,
        total_attacks_respectgained: req.body.total_attacks_respectgained,
        total_items_marketbought: req.body.total_items_marketbought,
        total_items_bazaarbought: req.body.total_items_bazaarbought,
        total_items_auctionswon: req.body.total_items_auctionswon,
        total_items_sent: req.body.total_items_sent,
        total_trades: req.body.total_trades,
        total_items_bazaarincome: req.body.total_items_bazaarincome,
        total_items_cityfinds: req.body.total_items_cityfinds,
        total_items_dumpfinds: req.body.total_items_dumpfinds,
        total_items_dumped: req.body.total_items_dumped,
        total_jail_jailed: req.body.total_jail_jailed,
        total_jail_busted: req.body.total_jail_busted,
        total_jail_busts: req.body.total_jail_busts,
        total_jail_bailed: req.body.total_jail_bailed,
        total_jail_bailcosts: req.body.total_jail_bailcosts,
        total_hospital_trips: req.body.total_hospital_trips,
        total_hospital_medicalitemsused: req.body.total_hospital_medicalitemsused,
        total_hospital_revived: req.body.total_hospital_revived,
        total_mails_sent: req.body.total_mails_sent,
        total_mails_sent_friends: req.body.total_mails_sent_friends,
        total_mails_sent_company: req.body.total_mails_sent_company,
        total_mails_sent_spouse: req.body.total_mails_sent_spouse,
        total_classifiedads_placed: req.body.total_classifiedads_placed,
        total_bounty_placed: req.body.total_bounty_placed,
        total_bounty_rewards: req.body.total_bounty_rewards,
        total_travel_all: req.body.total_travel_all,
        total_travel_argentina: req.body.total_travel_argentina,
        total_travel_mexico: req.body.total_travel_mexico,
        total_travel_dubai: req.body.total_travel_dubai,
        total_travel_hawaii: req.body.total_travel_hawaii,
        total_travel_japan: req.body.total_travel_japan,
        total_travel_unitedkingdom: req.body.total_travel_unitedkingdom,
        total_travel_southafrica: req.body.total_travel_southafrica,
        total_travel_switzerland: req.body.total_travel_switzerland,
        total_travel_china: req.body.total_travel_china,
        total_travel_canada: req.body.total_travel_canada,
        total_travel_caymanislands: req.body.total_travel_caymanislands,
        total_drugs_used: req.body.total_drugs_used,
        total_drugs_overdosed: req.body.total_drugs_overdosed,
        total_drugs_cannabis: req.body.total_drugs_cannabis,
        total_drugs_ecstacy: req.body.total_drugs_ecstacy,
        total_drugs_ketamine: req.body.total_drugs_ketamine,
        total_drugs_lsd: req.body.total_drugs_lsd,
        total_drugs_opium: req.body.total_drugs_opium,
        total_drugs_shrooms: req.body.total_drugs_shrooms,
        total_drugs_speed: req.body.total_drugs_speed,
        total_drugs_pcp: req.body.total_drugs_pcp,
        total_drugs_xanax: req.body.total_drugs_xanax,
        total_drugs_vicodin: req.body.total_drugs_vicodin,
        total_merits_bought: req.body.total_merits_bought,
        total_refills_bought: req.body.total_refills_bought,
        total_company_trains: req.body.total_company_trains,
        total_statenhancers_used: req.body.total_statenhancers_used
    });
    newCompany
        .save()
        .then(result => {
            res.json({
                success: true,
                msg: 'Stats registered',
            });
        }).catch(err => {
            return res.json({ success: false, msg: 'Failed to register' })
        })
});

router.post('/updateStats', (req, res, next) => {

    updated = Date.now();

    let errors = []
    overallStats.findByIdAndUpdate(req.body._id, {
        $set: {
            timestamp: req.body.timestamp,
            users_total: req.body.users_total,
            users_male: req.body.users_male,
            users_female: req.body.users_female,
            users_marriedcouples: req.body.users_marriedcouples,
            users_daily: req.body.users_daily,
            total_users_logins: req.body.total_users_logins,
            total_users_playtime: req.body.total_users_playtime,
            job_army: req.body.job_army,
            job_grocer: req.body.job_grocer,
            job_medical: req.body.job_medical,
            job_casino: req.body.job_casino,
            job_education: req.body.job_education,
            job_law: req.body.job_law,
            job_company: req.body.job_company,
            job_none: req.body.job_none,
            crimes: req.body.crimes,
            jailed: req.body.jailed,
            money_onhand: req.body.money_onhand,
            money_average: req.body.money_average,
            money_citybank: req.body.money_citybank,
            items: req.body.items,
            events: req.body.events,
            points_total: req.body.points_total,
            points_market: req.body.points_market,
            points_averagecost: req.body.points_averagecost,
            points_bought: req.body.points_bought,
            total_points_boughttotal: req.body.total_points_boughttotal,
            total_attacks_won: req.body.total_attacks_won,
            total_attacks_lost: req.body.total_attacks_lost,
            total_attacks_stalemated: req.body.total_attacks_stalemated,
            total_attacks_runaway: req.body.total_attacks_runaway,
            total_attacks_hits: req.body.total_attacks_hits,
            total_attacks_misses: req.body.total_attacks_misses,
            total_attacks_criticalhits: req.body.total_attacks_criticalhits,
            total_attacks_roundsfired: req.body.total_attacks_roundsfired,
            total_attacks_stealthed: req.body.total_attacks_stealthed,
            total_attacks_moneymugged: req.body.total_attacks_moneymugged,
            total_attacks_respectgained: req.body.total_attacks_respectgained,
            total_items_marketbought: req.body.total_items_marketbought,
            total_items_bazaarbought: req.body.total_items_bazaarbought,
            total_items_auctionswon: req.body.total_items_auctionswon,
            total_items_sent: req.body.total_items_sent,
            total_trades: req.body.total_trades,
            total_items_bazaarincome: req.body.total_items_bazaarincome,
            total_items_cityfinds: req.body.total_items_cityfinds,
            total_items_dumpfinds: req.body.total_items_dumpfinds,
            total_items_dumped: req.body.total_items_dumped,
            total_jail_jailed: req.body.total_jail_jailed,
            total_jail_busted: req.body.total_jail_busted,
            total_jail_busts: req.body.total_jail_busts,
            total_jail_bailed: req.body.total_jail_bailed,
            total_jail_bailcosts: req.body.total_jail_bailcosts,
            total_hospital_trips: req.body.total_hospital_trips,
            total_hospital_medicalitemsused: req.body.total_hospital_medicalitemsused,
            total_hospital_revived: req.body.total_hospital_revived,
            total_mails_sent: req.body.total_mails_sent,
            total_mails_sent_friends: req.body.total_mails_sent_friends,
            total_mails_sent_company: req.body.total_mails_sent_company,
            total_mails_sent_spouse: req.body.total_mails_sent_spouse,
            total_classifiedads_placed: req.body.total_classifiedads_placed,
            total_bounty_placed: req.body.total_bounty_placed,
            total_bounty_rewards: req.body.total_bounty_rewards,
            total_travel_all: req.body.total_travel_all,
            total_travel_argentina: req.body.total_travel_argentina,
            total_travel_mexico: req.body.total_travel_mexico,
            total_travel_dubai: req.body.total_travel_dubai,
            total_travel_hawaii: req.body.total_travel_hawaii,
            total_travel_japan: req.body.total_travel_japan,
            total_travel_unitedkingdom: req.body.total_travel_unitedkingdom,
            total_travel_southafrica: req.body.total_travel_southafrica,
            total_travel_switzerland: req.body.total_travel_switzerland,
            total_travel_china: req.body.total_travel_china,
            total_travel_canada: req.body.total_travel_canada,
            total_travel_caymanislands: req.body.total_travel_caymanislands,
            total_drugs_used: req.body.total_drugs_used,
            total_drugs_overdosed: req.body.total_drugs_overdosed,
            total_drugs_cannabis: req.body.total_drugs_cannabis,
            total_drugs_ecstacy: req.body.total_drugs_ecstacy,
            total_drugs_ketamine: req.body.total_drugs_ketamine,
            total_drugs_lsd: req.body.total_drugs_lsd,
            total_drugs_opium: req.body.total_drugs_opium,
            total_drugs_shrooms: req.body.total_drugs_shrooms,
            total_drugs_speed: req.body.total_drugs_speed,
            total_drugs_pcp: req.body.total_drugs_pcp,
            total_drugs_xanax: req.body.total_drugs_xanax,
            total_drugs_vicodin: req.body.total_drugs_vicodin,
            total_merits_bought: req.body.total_merits_bought,
            total_refills_bought: req.body.total_refills_bought,
            total_company_trains: req.body.total_company_trains,
            total_statenhancers_used: req.body.total_statenhancers_used,
            updatedAt: updated
        }
    }, {
        new: true
    },
        function (err, updatedStats) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'error updating stats'
                });
            } else {
                if (updatedStats) {
                    res.json({
                        success: true,
                        msg: 'stats updated'
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'error updating stats'
                    });
                }
            }
        });

         
    
});

module.exports = router; 