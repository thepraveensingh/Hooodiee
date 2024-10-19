const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/",(req, res) => {
  let error = req.flash("error")
  res.render("index",{error,loggedin : false});
});


router.get("/addToCart/:productId", isLoggedIn, async(req, res)=> {
  let user = await userModel.findOne({email: req.user.email});
  
  user.cart.push(req.params.productId);
  await user.save();
  req.flash("success","Added to Cart")
  res.redirect('/shop')
});

router.get("/shop", isLoggedIn, async(req, res)=> {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render('shop',{products,success});
});

router.get("/cart", isLoggedIn, async(req, res)=> {
 let user = await userModel.findOne({email : req.user.email}).populate('cart');
 res.render('cart',{user});
});
router.get("/profile", isLoggedIn, async(req, res)=> {
  let user = await userModel.findOne({email : req.user.email}).populate('cart');
  res.render('profile',{user})
 });
module.exports = router;