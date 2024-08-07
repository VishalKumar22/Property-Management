const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const UserSignUpSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

//generating token
UserSignUpSchema.methods.generateToken = async function () {
    try{
        return jwt.sign({
            email:this.email
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

const User = new mongoose.model("User", UserSignUpSchema)
module.exports = User