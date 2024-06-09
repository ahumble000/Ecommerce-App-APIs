const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            name,
            description,
            richDescription,
            image,
            imageGallery,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated
        } = req.body;

        const productCreated = await Product.create({
            name,
            description,
            richDescription,
            image,
            imageGallery,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated
        });

        res.status(201).json({ success: true, data: productCreated });
    } 
    
    catch (error) {
        console.error("Product creation error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const productList = await Product.find({});

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, error: "No products found" });
        }

        res.json({ success: true, data: productList });
    }
    
    catch (error) {
        console.error("Product retrieval error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;