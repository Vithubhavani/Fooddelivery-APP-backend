const express=require('express')
const router=express.Router();
const {FoodItem}=require('../schema/foodVariety.schema')
const authMiddleware=require('../middleware/auth')


router.post("/",authMiddleware,async(req,res)=>{
    try{
        const{name,varieties}=req.body;
        const {user}=req;

        if (!name || !varieties || !Array.isArray(varieties)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        
        const formattedVarieties = varieties.map((variety) => ({
            name: variety.name,
            image: variety.image || null,
            price: variety.price,
            extras: Array.isArray(variety.extras) ? variety.extras : [],
        }));

        const newFoodItem=new FoodItem({ name, varieties:formattedVarieties,creator:user
        })

        await newFoodItem.save();
        res.status(201).json({message:"Food created successfully"})
    }
    catch(error){
        console.log(error)
        res.status(400).json("Food not created")
    }
})

router.get("/",authMiddleware,async(req,res)=>{
    try{
        const foods=await FoodItem.find();
        res.status(200).json(foods)
    }catch(err){
        res.status(500).json({message:"error fetching food items",error:err})
    }
})

router.get("/category/:type", async (req, res) => {
    const { type } = req.params;
    const foods = await FoodItem.find({ category: type }); // Assuming a `category` field exists
    res.status(200).json(foods);
});


router.post('/:foodId/variety',authMiddleware,async(req,res)=>{
  

    try{
        const {foodId}=req.params;
        const{name,image,price,extras}=req.body;

        const foodItem=await FoodItem.findById(foodId);

        if(!foodItem){
            return res.status(404).json({message:'Food item not found'})
        }
        
        const formattedExtras = Array.isArray(extras) ? extras : [extras];


        foodItem.varieties.push({name,image,price,extras:formattedExtras});

        await foodItem.save();
        res.status(200).json({message:"Successfully added the item to food"})
    } catch(error){
        res.status(500).json({message:"error adding the item",error})
    }
})


router.get('/variety/:varietyId',authMiddleware,async(req,res)=>{
    const{varietyId}=req.params;

    try{
        const foodItem=await FoodItem.findOne({'varieties._id':varietyId},{'varieties.$':1});

        if(!foodItem){
            return res.status(404).json({message:'Variety not found'});   
        }

        res.status(200).json(foodItem.varities[0])
    } catch(err){
        res.status(500).json({message:'Error fetching variety',err})
    }
})

router.get("/search/:title",async(req,res)=>{
    const{title}=req.params;
    try {
        // Search for food items by name or by variety name
        const foods = await FoodItem.find({
            $or: [
                { name: { $regex: new RegExp(title, "i") } }, // Match food item name
                { "varieties.name": { $regex: new RegExp(title, "i") } } // Match variety name
            ]
        });


       

        res.status(200).json(foods);
    } catch (err) {
        res.status(500).json({ message: "Error searching food items or varieties", error: err });
    }
})

module.exports=router;