let express = require("express");

let router = express.Router();

let register = require("../controllers/usercontrollers");

router.post("/register", register);

module.exports = router;