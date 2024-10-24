const Product = require("../../models/product.model");

module.exports.index = async (req,res) => {
    const product = await Product
    .find({
        status: "active",
        deleted: false
    })
    .sort({
        position: "desc"
    });


    for (const item of product) {
        item.priceNew = item.price*(100 - item.discountPercentage)/100;
        item.priceNew = (item.priceNew).toFixed(0);
    }

    res.render("client/pages/product/index", {
        pageTitle: "Product Category",
        product: product
    });
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
  
    const product = await Product.findOne({
      slug: slug,
      status: "active",
      deleted: false
    });

    product.priceNew = product.price*(100 - product.discountPercentage)/100;
    product.priceNew = (product.priceNew).toFixed(0);
  
    res.render("client/pages/product/detail", {
      pageTitle: product.title,
      product: product
    });
  }
  