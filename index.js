const express = require('express');
const bodyParser = require('body-parser');
// const logger = require('morgan');
const cors = require('cors')
const otp = require("otp")


var app = express();
app.set('port', 8080);
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const secret = process.env.SECRET
var inst = new otp({
    name: "shlokas",
    keySize: 64,
    secret: secret
});

// prevent otp revealing secrets
// https://github.com/pipobscure/otp/blob/master/lib/otp.ts#L87
console.error = () => {}

app.post("/validate", (req, res) => {
    const data = req.body
    const a = inst.totp();

    res.json({ status: data.code == a })
})
app.listen(app.get("port"), "0.0.0.0");
