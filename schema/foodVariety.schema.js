const mongoose=require("mongoose")
const {User}=require("./user.schema")
const Schema=mongoose.Schema;

const foodVarietySchema=new Schema({
    name:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    extras:{
        type:[String],
        required:true
    }
});



const foodItemSchema=new Schema({
   name:{
    type:String,
    required:true
   },

   varieties:{
    type:[foodVarietySchema],
    required:true
   }, 
   creator:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
    },

   
})

const FoodItem=mongoose.model("FoodItem",foodItemSchema);
module.exports={FoodItem}