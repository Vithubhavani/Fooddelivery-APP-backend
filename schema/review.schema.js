const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const ratingchema=new Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Rating=mongoose.model("Rating",ratingchema);
module.exports={Rating}