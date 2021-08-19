const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

var express = require('express');
var router = express.Router();

router.get('/posts/',controller.posts);

router.post('/post',[authJwt.verifyToken],controller.post);
module.exports = router;
