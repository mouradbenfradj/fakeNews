const db = require("../models");
const Post = db.post;
exports.index =  async (req, res, next) => {
    var posts =     await Post.find({}).sort({quality:-1});
    res.render('index/index', {userId: req.userID,user: req.cookies['x-access-token'], posts: posts});
};