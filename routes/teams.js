var express = require('express');
var router = express.Router();
const Team = require('../models/team');

router.get('/', function (req, res) {
    Team.find(function (err, items) {
        if (!err) {
            res.send(items);
        } else {
            res.send(err);
        }
    });
})

router.post('/register', function (req, res) {
    const form = req.body;
    const newTeam = new Team({
        team_name: form.team_name,
        team_gender: form.team_gender,
        game_details:{
            age_group: form.age_group,
            game: form.game,
            sub_game: form.sub_game,
            team_size: form.team_size
        },
        player_details: {
            first_name: form.first_name,
            middle_name: form.middle_name,
            last_name: form.last_name,
            gender: form.gender,
            dob: form.dob,
            contact_no: form.contact_no,
            email: form.email,
            weight: form.weight,
            height: form.height,
            adhar_card: form.adhar_card,
            taluka: form.taluka,
            city: form.city,
            parents_details: {
                first_name: form.p_first_name,
                last_name: form.p_last_name,
                contact_no: form.p_contact_no
            },
            bank_details: {
                bank: form.bank,
                branch: form.branch,
                account_holder: form.account_holder,
                ifsc_code: form.ifsc_code,
                account_no: form.account_no
            }
        },
        coach_details:{
            coach_name: form.coach_name,
            coach_email: form.coach_email,
            contact_no: form.coach_contact_no,
            address: form.address       
        },
        school_id: form.school_id
    })
    newTeam.save(err => {
        if (!err) {
            res.send('Inserted Succesfully!');
        } else {
            res.send(err);
        }
    })
});

module.exports = router;