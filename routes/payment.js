const express=require('express')
const router=express.Router();
const {Payment}=require('../schema/paymentmethod.schema')
const authMiddleware=require('../middleware/auth')
const mongoose=require('mongoose')


router.post("/",authMiddleware,async(req,res)=>{
   
   try{
    const{cardNumber,expiration,CVC,name}=req.body;
    const{user}=req;

    if (!cardNumber || !expiration || !CVC || !name) {
        return res.status(400).json({ message: "All fields are required" });
      }
    const payment=new Payment({cardNumber,expiration,CVC,name,creator:user})

    await payment.save();
    res.status(201).json({message:"Payment created successfully"})

   }catch(error){
    console.log(error)
    res.status(400).json({message:"error creating payment"})
   }
})



router.get("/",authMiddleware,authMiddleware,async(req,res)=>{
const payment=await Payment.find()
res.status(200).json(payment)
})

router.get("/:paymentId",authMiddleware,async(req,res)=>{
    const{paymentId}=req.params;
    const payment=await Payment.findById(paymentId)

    if(!payment){
        return res.status(404).json({message:"Payment not found"})
    }

    res.status(200).json(payment)
})

router.delete("/:paymentId", authMiddleware, async (req, res) => {
    const { paymentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
        return res.status(400).json({ message: "Invalid payment ID format" });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    await Payment.findByIdAndDelete(paymentId);
    res.status(200).json({ message: "Payment deleted successfully" });
});


router.put("/:paymentId", authMiddleware, async (req, res) => {
    const { paymentId } = req.params;
    const { cardNumber, Expiration, CVC, name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
        return res.status(400).json({ message: "Invalid payment ID format" });
    }

    let payment = await Payment.findById(paymentId);
    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    payment = await Payment.findByIdAndUpdate(
        paymentId,
        { cardNumber, Expiration, CVC, name },
        { new: true }
    );

    res.status(200).json({ message: "Payment updated successfully", payment });
});


module.exports=router