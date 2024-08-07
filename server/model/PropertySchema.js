const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
}, { timestamps: true })

//generateToken
propertySchema.methods.generateToken = async function () {
  try{
      return jwt.sign({
          userID:this._id.toString(),
  },
  process.env.JWT_SECRET_KEY,
  {
      expiresIn:"30d"
  }
)
  }catch(error){
      console.log(error)
  }
};

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
