const mongoose=require('mongoose');
//schema creation
const urlSchema=new mongoose.Schema({

    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitHistory:[{
       timestamp:{
              type:Date,
            
           
       },
    }]
},{timestamps:true});

//model creation
const Url=mongoose.model('Url',urlSchema);
module.exports=Url;