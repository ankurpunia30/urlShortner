const shortid=require('shortid');
const Url=require('../models/url');

async function hangleGenerateShortUrl(req,res){
    const body=req.body
   if(!body.url){
       return res.status(400).json({
           error:"URL is required"
       });
   }
   const shortID=shortid.generate();
    await Url.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    return res.render("home",{
        id:shortID});
    return res.status(201).json({
        shortId:shortID
    });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await Url.findOne({shortId});
    if(!entry){
        return res.status(404).json({
            error:"Short URL not found"
        });
    }
    return res.status(200).json({
        totalClicks:entry.visitHistory.length,

        analytics:entry.visitHistory,
    });

}
module.exports={
    hangleGenerateShortUrl,
    handleGetAnalytics

}