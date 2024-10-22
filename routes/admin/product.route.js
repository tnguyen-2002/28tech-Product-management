const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
});

const upload = multer({storage: storage });

const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate")

router.get("/", controller.index);
router.patch("/status-product", controller.changeStatus);
router.patch("/statusM-product", controller.multiChange);
router.patch("/delete-product", controller.deleteProduct);
router.patch("/position-product", controller.positionProduct);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);


module.exports = router;