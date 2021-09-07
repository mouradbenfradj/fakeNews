const mongoose = require("mongoose");

const Vote = mongoose.model(
    "Vote",
    new mongoose.Schema({
        vote: Number,
        poste: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    })
);

module.exports = Vote;