const { parse } = require("dotenv");
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

    //pagination
    let limitItems = 5;
    let currentPage = 1;

    if(req.query.pages){
        currentPage = parseInt(req.query.pages);
    }

    if(req.query.limit){
        limitItems = parseInt(req.query.limit);
    }

    const itemSkip = (currentPage - 1) * limitItems;
    
    const totalProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(totalProduct/limitItems); 

    //end pagination
    
    const products = await Product.find(find).limit(limitItems).skip(itemSkip);
    res.render("admin/pages/product/index", {
        pageTitle: "Product Category",
        products: products,
        totalPage: totalPage,
        currentPage: currentPage
    });
}

module.exports.changeStatus = async (req,res) => {
    await Product.updateOne({
        _id: req.body.id
    }, {
        status: req.body.status
    });

    res.json({
        code: "success",
    })
}