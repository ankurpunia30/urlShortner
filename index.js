const express=require('express');
const {connnectToMongoDb}=require('./connect');
const app=express();
const port=3001;
const Url=require('./models/url');
const urlRoute=require('./routes/url');

connnectToMongoDb();
app.use(express.json());
app.use("/url",urlRoute);
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await Url.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:new Date()
        },
    },
    }
    );
    res.redirect(entry.redirectUrl);
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

