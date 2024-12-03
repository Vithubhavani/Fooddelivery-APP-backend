const express=require('express')
const {UserProfile}=require("../schema/profile.schema")
const authMiddleware=require('../middleware/auth')
const router=express.Router();



router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(200).json({
        name: req.user.name,   
        email: req.user.email, 
        gender: "Male", 
        country: "India",
      });  
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { gender='Male',country='India'} = req.body;

  
    const existingProfile = await UserProfile.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

  
    const newProfile = new UserProfile({
      userId: user._id,
      name:user.name,
      email:user.email,
      gender, 
      country, 
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.put("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, gender, country } = req.body;

    const updateData = {};
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (country) updateData.country = country;
    if(name) updateData.name=name;

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user }, 
      updateData,
      { new: true, runValidators: true } 
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
