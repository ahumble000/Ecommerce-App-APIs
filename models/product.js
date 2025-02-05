const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required: true,
    },

    description : {
        type : String,
        required: true,
    },

    richDescription : {
        type : String,
        default:'',
    },
    
    image : {
        type : String,
        default:'',
        required: true,
    },
    
    imageGallery : [{
        type : String,
        default:'',
    }],
    
    brand : {
        type : String,
        default:'',
    },
    
    price : {
        type : Number,
        default:0.00,
        required: true,
    },
    
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true,
    },
    
    countInStock : {
        type : Number,
        required: true,
        min : 0,
        max : 1000,
    },
    
    rating : {
        type : Number,
        default:0,
    },

    numReviews : {
        type : Number,
        default:0,
    },
    
    isFeatured : {
        type : Boolean,
        default:false,
    },
    
    dateCreated : {
        type : Date,
        default:Date.now,
    },

})

exports.Product = mongoose.model('Product',productSchema);