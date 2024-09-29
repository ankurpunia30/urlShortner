const express=require('express');
const {connnectToMongoDb}=require('./connect');
const app=express();
const port=3001;
const Url=require('./models/url');
const urlRoute=require('./routes/url');
const staticRouter=require('./routes/staticRouter');
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
connnectToMongoDb();
app.use(express.json());
//server side rendering
//it is done with the help of ejs
//ejs is a templating engine
//it is used to render html files on the server side

app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute);
app.use("/",staticRouter);
app.get('/url/:shortId',async(req,res)=>{
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

