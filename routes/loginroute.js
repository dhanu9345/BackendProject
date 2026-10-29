let express = require("express");

let router = express.Router();

let login = require("../controllers/logincontrollers");
let loginStatus = require("../controllers/loginStatus");

router.post("/login", login);
router.get("/login/status", loginStatus);

module.exports = router;