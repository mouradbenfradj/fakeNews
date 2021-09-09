const request = require('request');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
/* 
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}; */

exports.getRegister = (req, res) => {
    req.session.returnTo = req.originalUrl;

    res.render("auth/register");
};

exports.postRegister = (req, res) => {
    console.log('postRegister')

    request.post({
        url: 'http://localhost:3000/api/auth/signup',
        body: {username: req.body.username, email: req.body.email, password: req.body.password,truffleAccount:req.body.truffleAccount},
        json: true
    }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        request.post({
            url: 'http://localhost:3000/setUserData/'+req.body.truffleAccount,
            body: {username: req.body.username, reputation: 1},
            json: true
        }, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            res.redirect('/')
        });
    });
    

};
exports.getLogin = function (req, res) {
    res.render("auth/signin");
};
exports.postLogin = (req, res) => {
    console.log('postLogin')

    request.post({
        url: 'http://localhost:3000/api/auth/signin',
        body: {username: req.body.username, password: req.body.password},
        json: true
    }, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        req.session.user = body;
        req.session.accessToken = body.accessToken;
        req.session.userID = body.id;
        req.session.user = body;
        req.session.token = body.accessToken;
        res.redirect(req.session.returnTo)
    });

};
/* 
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
}; */