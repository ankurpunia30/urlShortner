const express=require('express');
const router=express.Router();
const Url=require('../models/url');

router.get('/',async (req,res)=>{
    const urls=await Url.find();
    res.render('home',{
        urls:urls
    });
});

module.exports=router;