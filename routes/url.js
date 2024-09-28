const express=require('express');
const {hangleGenerateShortUrl
    ,handleGetAnalytics
}=require('../controllers/url');
const router=express.Router();

router.post('/',hangleGenerateShortUrl);

router.get('/analytics/:shortId',handleGetAnalytics);
module.exports=router;