const express = require('express');
const bodyParser = require("body-parser");
const { db } = require('./dbInterface');
const { ValidationError } = require('express-validation');
const eventRoute = require('./routes/event-route');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/event', eventRoute);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(400).json(err)
    }
    return res.status(500).json(err)
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})