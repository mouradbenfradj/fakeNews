const request = require('request');

exports.allAccess = (req, res) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    res.status(200).send("Public Content.");
};

exports.getRegister = (req, res) => {
    res.render("auth/register");
};

exports.postRegister = (req, res) => {
    console.log('postRegister')

    request.post({
        url: 'http://localhost:3000/api/auth/signup',
        body: {username: req.body.username, email: req.body.email, password: req.body.password},
        json: true
    })
    res.redirect('/')

};

exports.userBoard = (req, res) => {

    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};