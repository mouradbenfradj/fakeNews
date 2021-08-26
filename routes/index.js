var express = require('express');
var router = express.Router();
const {authJwt} = require("../middlewares");

var values = ['mm'];

/* GET home page. */
router.get('/', [authJwt.verifyToken], function (req, res, next) {
    res.render('index', {title: 'Express', values: values});
});

router.get("/fluid", function(req, res) {
    res.render("layouts/fluid");
});

router.get("/hero", function(req, res) {
    res.render("layouts/hero");
});

router.get("/marketing", function(req, res) {
    res.render("layouts/marketing-alternate");
});

router.get("/narrow", function(req, res) {
    res.render("layouts/marketing-narrow");
});


router.get("/starter", function(req, res) {
    res.render("layouts/starter-template");
});

router.get("/sticky", function(req, res) {
    res.render("layouts/sticky-footer");
});

module.exports = router;
