const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://alibulut:12345a@ds221990.mlab.com:21990/heroku_4vh0cqv0', {useUnifiedTopology:true, useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true});
    mongoose.connection.on('open',()=>{
        //console.log('MongoDB: Connected');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB Connection Error: ',err);
    })

    //promise yapısını projemize tanıttık.
    mongoose.Promise=global.Promise;
}