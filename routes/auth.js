const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'buddyIsGoodBuddy';


// ROUTE : 1 - create user using: POST "/api/auth/createuser"  No Login require.
router.post('/createuser', [
    // express validator use
    body('name', 'Name Must be have atleast 3 char.').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password Must be have atleat 8 char.').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;

    // if there are error, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // check whether user with same email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Email Id Already Used" });
        }

        // get salt and make hash using password
        // const salt = await bcrypt.genSalt(10);
        // const secPass = await bcrypt.hash(req.body.password, salt);

        // get data from request and Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        // date for making authToken
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken }); //return authToken
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error accured");
    }
})

// ROUTE : 2 -  login user using: POST "/api/auth/login"  No Login require.
router.post('/login', [
    // express validator use
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password Can not be blank.').exists(),
],
    async (req, res) => {
        let success = false;
        // if there are error, return Bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            // const comparePass = await bcrypt.compare(password, user.password);
            if (password != user.password) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            // date for making authToken
            const data = {
                user: { id: user.id }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken }); //return authToken

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error accured");
        }
    }
)

// ROUTE 3 - Get user data using token - Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId).select("-password");
        res.send(userData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error accured");
    }
});

// export router
module.exports = router