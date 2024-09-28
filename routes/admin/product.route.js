const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.patch("/status-product", controller.changeStatus);
router.patch("/statusM-product", controller.multiChange);
router.patch("/delete-product", controller.deleteProduct);
router.patch("/position-product", controller.positionProduct);
router.get("/create", controller.create);
router.post("/create", controller.createPost);


module.exports = router;