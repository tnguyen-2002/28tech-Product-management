const { parse } = require("dotenv");
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  //Product status filter
  if (req.query.status) {
    find.status = req.query.status;
  }
  //end product status filter

  //search product
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  //end search product

  //pagination
  let limitItems = 5;
  let currentPage = 1;

  if (req.query.pages) {
    currentPage = parseInt(req.query.pages);
  }

  if (req.query.limit) {
    limitItems = parseInt(req.query.limit);
  }

  const itemSkip = (currentPage - 1) * limitItems;

  const totalProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(totalProduct / limitItems);

  //end pagination

  const products = await Product
  .find(find)
  .limit(limitItems)
  .skip(itemSkip)
  .sort({
    position: "desc"
  });
  
  res.render("admin/pages/product/index", {
    pageTitle: "Product Category",
    products: products,
    totalPage: totalPage,
    currentPage: currentPage,
  });
};

module.exports.changeStatus = async (req, res) => {
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: req.body.status,
    }
  );

  req.flash('success', 'Update product status successful!');

  res.json({
    code: "success"
  });
};

module.exports.multiChange = async (req, res) => {
  switch (req.body.status) {
    case "active":
    case "inactive":
      await Product.updateMany(
        {
          _id: req.body.ids,
        },
        {
          status: req.body.status,
        }
      );

      req.flash('success', 'Update products status successful!');

      res.json({
        code: "success"
      });
      break;

    case 'delete':
      await Product.updateMany(
        {
          _id: req.body.ids,
        },
        {
          deleted: "true",
        }
      );

      req.flash('success', 'Delete products successful!');

      res.json({
        code: "success"
      });
      break;

    default:
      res.json({
        code: "error",
        message: "Invalid status",
      });
      break;
  }
};

module.exports.deleteProduct = async (req, res) => {
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      deleted: req.body.deleted,
    }
  );

  req.flash('success', 'Delete product successful!');

  res.json({
    code: "success",
  });
};

module.exports.positionProduct = async (req, res) => {
  await Product.updateOne(
    {
      _id: req.body.id,
    },
    {
      position: req.body.position,
    }
  );

  req.flash('success', 'Update product position successful!');

  res.json({
    code: "success"
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create", {
    pageTitle: "Add New Product"
  });
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);

  res.send("OK");
  
  // res.render("admin/pages/product/create", {
  //   pageTitle: "Add New Product"
  // });
};