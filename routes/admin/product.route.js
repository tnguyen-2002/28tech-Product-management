const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.patch("/change-status", controller.changeStatus);
router.patch("/multi-change", controller.multiChange);



module.exports = router;