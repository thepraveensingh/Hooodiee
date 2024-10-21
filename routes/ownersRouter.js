const express = require('express');
const router = express.Router();
const authorizeOwner = require('../middlewares/authorizeOwner')

router.get('/admin', authorizeOwner, (req, res) => {
  let success = req.flash("success");
  res.render('createProducts', { success });
});


router.get('/',(req,res)=>{
  res.send('hey');
})


module.exports = router;