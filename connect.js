const mongoose=require('mongoose');


async function connnectToMongoDb(){
    try{
        await mongoose.connect('mongodb://localhost:27017/url-shortner',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connected to MongoDB');
    }catch(err){
        console.log('Error connecting to MongoDB',err);
    }

}
module.exports={

    connnectToMongoDb
}