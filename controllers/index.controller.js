const db = require("../models");
const Post = db.post;
exports.index =  async (req, res, next) => {
    var posts = await Post.find({}).sort({quality: -1});
    req.session.returnTo = req.originalUrl;

    res.render('index/index', {userId: req.session.userID, user: req.session.user, posts: posts});
};