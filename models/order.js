const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required: true,
    },
    image : {
        type : String,
        required: true,
    },
    inStock : {
        type : Number,
        required: true,
    },

})

exports.Order = mongoose.model('Order',orderSchema);