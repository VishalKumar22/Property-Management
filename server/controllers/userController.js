const { genSalt } = require('bcrypt')
const User = require("../model/userSchma")
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try{
        const {username, password, phoneNumber, email} = req.body 
        if(!username || !password || !phoneNumber || !email){
           return res.status(200).json("All fields are required")
        }
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(400).json("email already exists")
        }
        const saltRound = 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        
        const createUser = await User.create({username, email, phoneNumber, password:hashPassword})
        res.status(200).json(
            {Data:createUser, 
            token:await createUser.generateToken(),
            msg:"SignUp successfull"
            })
        
        
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

const login = async(req,res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(200).json("All fields are required")
        }
        const userExist = await User.findOne({email: email})
        if(!userExist) return res.status(400).json("Invalid credential")
            
        const isPasswordValid = await bcrypt.compare(password, userExist.password)
        if(isPasswordValid){
            res.status(200).json(
                {
                message:"Login successfull",
                token:await userExist.generateToken(),
            })
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = {signUp,login}