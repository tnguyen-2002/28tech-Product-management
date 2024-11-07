const ProductCategory = require("../../models/product.model");
const systemConfig = require("../../config/system");

module.exports.index = (req, res) => {
    res.render("admin/pages/product-category/index", {
        pageTitle: "Product Category"
    });
}

module.exports.create = async (req, res) => {
    const listCategory = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/product-category/create", {
        pageTitle: "Create product category",
        listCategory: listCategory
    });
}

module.exports.createPost = async (req, res) => {
    
}