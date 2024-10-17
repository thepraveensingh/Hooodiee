const  mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/hooodiee');

const userSchema = mongoose.Schema({
  fullName : String,
  email : String,
  password: String,
  cart :{
    type :Array,
    default: []
  },
  isAdmin : Boolean,
  contact : Number,
  picture : String,
  orders:{
    type :Array,
    default: []
  }
})
module.exports = mongoose.model('user',userSchema);