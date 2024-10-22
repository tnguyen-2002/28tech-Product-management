module.exports.createPost = async (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Product name field cant be empty!");
        res.redirect("back");
        return;
    }

    if(req.body.title.length < 5) {
        req.flash("error", "Product name must be longer than 5 characters");
        res.redirect("back");
        return;
    }

    next();
}