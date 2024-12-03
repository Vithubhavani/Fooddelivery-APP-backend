const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const UserProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
  },
  gender: {
    type: String,
    default: 'Male',
  },
  country: {
    type: String,
    default: 'India', 
  },
}, 
);



const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports={UserProfile}


