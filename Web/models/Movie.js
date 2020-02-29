const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const currentTime = new Date()


const MovieSchema=new Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required:[true, '`{PATH}` field is required!'],
        maxlength:15,
        minlength:2
    },
    category:{
        type:String,
        required:true,
        maxlength:15,
        minlength:1
    },
    country:{
        type:String,
        required:true,
        maxlength:10,
        minlength:1
    },
    year:{
        type:Number,
        max:currentTime.getUTCFullYear(),
        min:1900
    },
    imdb_score:{
        type:Number,
        max:10,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('movie',MovieSchema);