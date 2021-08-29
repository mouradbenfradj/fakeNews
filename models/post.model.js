const mongoose = require("mongoose");

const Post = mongoose.model(
    'Post',
    new mongoose.Schema({
        news: String,
        votes: [],
        quality: Number,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })
);
module.exports = Post;