const  mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName : {
    type: String,
    minLength : 3 ,
    trim: true,
  },
  email : String,
  password: String,
  picture : String,
  products:{
    type :Array,
    default: []
  },
  gstIn : String
})
module.exports = mongoose.model('owner',ownerSchema);