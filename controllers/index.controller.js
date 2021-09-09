const db = require("../models");
const request = require('request');

const Post = db.post;
exports.index =  async (req, res, next) => {
    var posts = await Post.find({}).sort({quality: -1});
    req.session.returnTo = req.originalUrl;
    /*request.get('http://localhost:3000/getNumberPosts', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        req.session.user = body;
        req.session.accessToken = body.accessToken;
        req.session.userID = body.id;
        req.session.user = body;
        req.session.token = body.accessToken;
        res.redirect(req.session.returnTo)
    });*/
    res.render('index/index', {userId: req.session.userID, user: req.session.user, posts: posts});
};