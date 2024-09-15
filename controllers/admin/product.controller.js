const Product = require("../../models/product.model")

module.exports.index = async (req,res) => {

    
    const find = {
        deleted: false
    }

    //Product status filter
    if(req.query.status){
        find.status = req.query.status;
    }
    //end product status filter

    //search product
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    //end search product
    
    const products = await Product.find(find);

    res.render("admin/pages/product/index", {
        pageTitle: "Product Category",
        products: products
    });
}
