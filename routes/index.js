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
router.get("/minusCart/:productId", isLoggedIn, async(req, res)=> {
  try{
      let user = await userModel.findOne({email: req.user.email});
      const productIndex = user.cart.indexOf(req.params.productId);
      if (productIndex > -1) {
          user.cart.splice(productIndex, 1);
      }
      await user.save();
      res.redirect('/cart')
      }
    catch(err){
      req.flash("error", "Something went wrong");
      res.redirect("/cart");
    }
});
router.get("/plusCart/:productId", isLoggedIn, async(req, res)=> {
  try{
      let user = await userModel.findOne({email: req.user.email});
      user.cart.push(req.params.productId);
      await user.save();
      res.redirect('/cart')
  }
  catch(err){
      req.flash("error", "Something went wrong");
      res.redirect("/cart");
  }
});

router.get("/checkout", isLoggedIn, async(req, res)=> {
  let products = await productModel.find();
  res.render('checkout',{products});
});

router.get("/shop", isLoggedIn, async(req, res)=> {
  const filter = req.query.filter || 'all';
    let products = await productModel.find();
     if (filter === 'discount'){     
        products = products.filter(product => product.discount > 0);
    }
    if (filter === 'new'){        
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      products = products.filter(product => new Date(product.createdAt) >= thirtyDaysAgo);
  }

  let success = req.flash("success");
  res.render('shop',{products,success,filter});
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