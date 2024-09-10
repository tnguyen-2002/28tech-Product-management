const express = require("express");
const router  = express.Router();

router.get("/", (req,res) => {
    res.render("clint/pages/products/index");
});

module.exports = router;