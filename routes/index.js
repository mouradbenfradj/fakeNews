var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

const Blog = mongoose.model('Blog', blogSchema);
mongoose.connect('mongodb://localhost:27017/fakeNews', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
var values = ['mm'];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', values: values});
});

module.exports = router;
