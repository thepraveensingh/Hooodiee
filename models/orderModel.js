const  mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            price: Number,
            quantity: Number
        }
    ],
    totalPrice: Number, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('order',orderSchema);