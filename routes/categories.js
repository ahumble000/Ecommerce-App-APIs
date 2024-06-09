const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    
    try{
        const {name,icon,color} = req.body;
    
        let category = await Category.create({name,icon,color});        
        res.status(201).json({ success: true, data: category });
    }


    catch(error){
        console.log("Category creation error " , error.message);
        res.status(500).json({success:false,error:"Internal Server Error"});    
    }

});

router.delete('/:id',async(req,res)=>{
    
    try{

        const {id} = req.params;
        const categoryList = await Category.findByIdAndDelete({_id:id});

        if(!categoryList){
            res.status(404).json({success:false,error:"No categories found!"});
        }

        res.status(201).json({ success: true, data: categoryList });

    }

    catch(error){
        console.log("Category retrieval error " , error.message);
        res.status(500).json({success:false,error:"Internal Server Error"});
    }
  
});

router.put('/:id',async(req,res)=>{
    
    try{

        const {name,icon,color} = req.body;
        const {id} = req.params;
        const categoryList = await Category.findByIdAndUpdate({_id:id},
            {
                name,icon,color
            },
            {
                new:true          
            });

        if(!categoryList){
          return res.status(404).json({success:false,error:"No categories found!"});
        }

        res.status(201).json({ success: true, data: categoryList });

    }

    catch(error){
        console.log("Category retrieval error " , error.message);
        res.status(500).json({success:false,error:"Internal Server Error"});
    }
  
});

router.get('/',async(req,res)=>{
    
    try{
        const categoryList = await Category.find();

        if(!categoryList){
            return res.status(404).json({success:false,error:"No categories found!"});
        }

        res.status(201).json({ success: true, data: categoryList });

    }

    catch(error){
        console.log("Category retrieval error " , error.message);
        res.status(500).json({success:false,error:"Internal Server Error"});
    }
  
});

module.exports = router;