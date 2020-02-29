const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://alibulut:12345a@ds221990.mlab.com:21990/heroku_4vh0cqv0', {useMongoClient:true});
    mongoose.connection.on('open',()=>{
        console.log('MongoDB: Connected');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB Connection Error: ',err);
    })
}