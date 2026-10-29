  
let express = require("express");
let router = express.Router();

let {addProduct,getProducts} = require("../controllers/productcontrollers");

router.post("/add", addProduct);
router.get("/",getProducts)

module.exports = router;