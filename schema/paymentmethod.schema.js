const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const paymentmethodSchema=new Schema({
   
    cardNumber:{
    type:String,
    required:true
    },
    expiration:{
        type:String,
        required:true
    },
    CVC:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Payment=mongoose.model('Payment',paymentmethodSchema)

module.exports={Payment}