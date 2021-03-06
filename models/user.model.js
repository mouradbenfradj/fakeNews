const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        postes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        votes:[],
        reputation: Number,
        roles: [{type: mongoose.Schema.Types.ObjectId, ref: "Role"}],
        truffleAccount: Number,
    })
);

module.exports = User;