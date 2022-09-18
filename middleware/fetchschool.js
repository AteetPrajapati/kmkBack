const jwt = require('jsonwebtoken');
const JWT_SECRET = 'schoolIsOk';

const fetchschool = (req, res, next) => {
    // fetch user from jwt token and add into req object
    const token = req.header('auth-token');
    if (!token) {
        req.withSchool = false;
        console.log("without token");
        next();
    }
    else{
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.school = data.school;
            req.withSchool = true;
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate using valid token" });
        }
    }
}

module.exports = fetchschool;