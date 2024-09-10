const express = require("express");
const router  = express.Router();

<<<<<<< HEAD
const controller = require("../../controller/client/product.controller");

router.get("/",controller.index);
=======
router.get("/", (req,res) => {
    res.render("client/pages/products/index");
});
>>>>>>> 6f4f8d2db200092f32075ba58b42ac4162bd4500

module.exports = router;
