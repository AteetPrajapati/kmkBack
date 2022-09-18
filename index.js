const connectToMongo = require('./db');

connectToMongo()

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/games', require('./routes/games'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/solos', require('./routes/solos'));
app.use('/api/schools',require('./routes/schools'));
app.use('/api/auth', require('./routes/auth'));


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});