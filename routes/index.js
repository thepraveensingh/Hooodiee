const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");

router.get("/",(req, res) => {
  let error = req.flash("error")
  res.render("index",{error});
});

router.get("/shop", isLoggedIn, async(req, res)=> {
  let products = await productModel.find();
  res.render('shop',{products});
});



module.exports = router;