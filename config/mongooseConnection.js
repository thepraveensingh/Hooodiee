const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hooodiee')
.then(()=>{
  console.log('connected to mongodb');
})
.catch((err)=>{
  console.log('error connecting to mongodb ',err);
})

module.exports = mongoose.connection ;