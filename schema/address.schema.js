const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const addressSchema=new Schema({
    State:{
        type:String,
        required:true,
        enum:["Karnataka","Tamil Nadu","Kerala","Maharashtra","Uttar Pradesh","West Bengal","Andhra Pradesh","Telangana","Delhi","Haryana"]
    },
    City:{
   type:String,
   required:true
    },
    pincode:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    fullAddress:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Address=mongoose.model("Address",addressSchema)
module.exports={Address}