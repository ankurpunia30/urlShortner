const express=require('express');
const cookieParser=require("cookie-parser");
const {connnectToMongoDb}=require('./connect');
const {restrictToLoggedInUsers}=require('./middlewares/auth');





const app=express();
const port=3001;
const Url=require('./models/url');

const urlRoute=require('./routes/url');
const staticRouter=require('./routes/staticRouter');
const UserRoute=require('./routes/user');

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

app.use(cookieParser());
app.use("/url",restrictToLoggedInUsers,urlRoute);
app.use("/",staticRouter);
app.use("/user",UserRoute);
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

