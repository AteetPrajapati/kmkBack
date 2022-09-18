const express = require('express');
const router = express.Router();
const School = require('../models/school');
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchschool = require('../middleware/fetchschool');
const JWT_SECRET = 'schoolIsOk';


// ROUTE : 1 - create user using: POST "/api/auth/createuser"  No Login require.
router.post('/register', [
    // express validator use
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
        let school = await School.findOne({ email: req.body.email })
        if (school) {
            return res.status(400).json({ success, error: "Email Id Already Used" });
        }
        
        const form = req.body;
        school = await School.create({
            school_type: form.school_type,
            dise_no: form.dise_no,
            name: form.name,
            principle_name: form.principle_name,
            principle_mobile: form.principle_mobile,
            pt_teacher: form.pt_teacher,
            pt_teacher_mobile: form.pt_teacher_mobile,
            email: form.email,
            district: form.district,
            taluka: form.taluka,
            city: form.city,
            address: form.address,
            pincode: form.pincode,
            password: form.password
        });

        // user = await User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        // })
        // date for making authToken
        const data = {
            school: {
                id: school.id
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
            const school = await School.findOne({ email });
            if (!school) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            // const comparePass = await bcrypt.compare(password, user.password);
            if (password != school.password) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            // date for making authToken
            const data = {
                school: { id: school.id }
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

// ROUTE 3 - Get school data using token - Login required
router.get('/getschool', fetchschool, async (req, res) => {
    try {
        const schoolId = req.school.id;
        const schoolData = await School.findById(schoolId).select("-password");
        res.send(schoolData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error accured");
    }
});

// export router
module.exports = router