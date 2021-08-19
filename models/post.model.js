const mongoose = require("mongoose");

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        news: String,
        fake: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })
);
module.exports = Post;