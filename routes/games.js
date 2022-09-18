
const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/',function (req, res) {

        Game.find(function (err, items) {
            if (!err) {
                res.send(items);
            } else {
                res.send(err);
            }
        })

    })

    router.post('/addgames',function (req, res) {
        const form = req.body;
        const newGame = new Game({
            name: form.name,
            about: form.about,
            sub_games: form.sub_games,
            type: form.type,
            image: form.image,
            link: form.link
        });

        newGame.save(function (err) {
            if (!err) {
                res.send('Inserted Succesfully');
            } else {
                res.send(err);
            }
        });
    });

module.exports = router;