const express=require('express')
const router=express.Router();
const {Rating}=require('../schema/review.schema')
const authMiddleware=require('../middleware/auth')
const mongoose=require('mongoose')


router.post("/",authMiddleware,async(req,res)=>{
   
   try{
    const{name,country,description}=req.body;
    const{user}=req;

    if (!name || !country || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
    const rating=new Rating({name,country,description,creator:user})

    await rating.save();
    res.status(201).json({message:"rating created successfully"})

   }catch(error){
    console.log(error)
    res.status(400).json({message:"error creating rating"})
   }
})



router.get("/",authMiddleware,authMiddleware,async(req,res)=>{
const rating=await Rating.find()
res.status(200).json(rating)
})


module.exports=router;
