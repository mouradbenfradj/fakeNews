var express = require('express');
var router = express.Router();
const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/auth.controller");
/* GET users listing. */
//module.exports = function(router) {
/*app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});*/

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/signin", controller.signin);
router.get('/logout', controller.logout);
module.exports = router;

//};