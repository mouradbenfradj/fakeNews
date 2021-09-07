var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/register", controller.getRegister);

router.post("/register", controller.postRegister);
module.exports = router;
