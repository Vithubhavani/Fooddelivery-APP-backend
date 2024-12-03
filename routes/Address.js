const express=require('express')
const router=express.Router();
const authMiddleware=require('../middleware/auth')
const {Address}=require('../schema/address.schema')


router.post("/",authMiddleware,async(req,res)=>{
    
    try{
    const{State,City,pincode,PhoneNumber,fullAddress}=req.body;
    const {user}=req;

    const address=new Address({State,City,pincode,PhoneNumber,fullAddress,creator:user})

    await address.save();
    res.status(201).json({message:"Address created successfully"})
}catch(error){
    console.log(error)
    res.status(400).json({message:"error creating address"})
}
})


router.get("/",authMiddleware,async(req,res)=>{
const address=await Address.find()

res.status(200).json(address)
})

router.get("/:addressId",authMiddleware,async(req,res)=>{
    const {addressId}=req.params;
    const address=await Address.findById(addressId)

    res.status(200).json(address)

})


router.put("/:addressId",authMiddleware,async(req,res)=>{
    
try{
    const{addressId}=req.params;
    const{State,City,pincode,PhoneNumber,fullAddress}=req.body;
    let address=await Address.findById(addressId);

    if(!address){
        return res.status(404).json({message:"Address not found"})
}
address=await Address.findByIdAndUpdate(addressId,{State,City,pincode,PhoneNumber,fullAddress},{new:true})

res.status(200).json(address)
} catch(error){
    console.log(error)
    res.status(400).json({message:"error updating address"})
}
})


router.delete("/:addressId",authMiddleware,async(req,res)=>{
const{addressId}=req.params;
const address=await Address.findById(addressId)

if(!address){
    return res.status(404).json({message:"Address not found"})
}

await Address.findByIdAndDelete(addressId)
res.status(200).json({message:"Address deleted successfully"})
})



module.exports=router