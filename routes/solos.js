var express = require('express');
var router = express.Router();
const Solo = require('../models/solo');
const mongoose = require('mongoose');
const fetchschool = require('../middleware/fetchschool');

router.get('/', function (req, res) {

    Solo.find(function (err, items) {
        if (!err) {
            res.send(items);
        } else {
            res.send(err);
        }
    })

})

router.post('/register', fetchschool, function (req, res) {
    const form = req.body;

    const newSolo = new Solo({
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
        game_details: {
            game: form.game,
            sub_game: form.sub_game,
            age_group: form.age_group,
        },
        coach_details: {
            coach_name: form.coach_name,
            // coach_email: form.coach_email,
            contact_no: form.coach_contact_no,
            address: form.coach_address
        },
        school: req.withSchool ? req.school.id : mongoose.Types.ObjectId('withoutschol')

    });

    newSolo.save(function (err) {
        if (!err) {
            res.send({ success: true, msg: 'Inserted Succesfully' });
        } else {
            res.send(err);
        }
    });
});

module.exports = router;