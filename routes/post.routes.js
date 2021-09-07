const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

var express = require('express');
var router = express.Router();

router.get('/',controller.posts);
router.get('/fake/:postId',[authJwt.verifyToken],controller.fake);
router.get('/not_fake/:postId',[authJwt.verifyToken],controller.not_fake);
router.get('/addPost',[authJwt.verifyToken],controller.addPost);
router.get('/modifier_vote/:postId',[authJwt.verifyToken],controller.modifierVote);

router.post('/post',[authJwt.verifyToken],controller.post);
module.exports = router;
