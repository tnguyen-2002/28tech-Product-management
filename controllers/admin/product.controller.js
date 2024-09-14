module.exports.index = (req,res) => {
    res.render("admin/pages/product/index", {
        pageTitle: "Product Category"
    });
}
