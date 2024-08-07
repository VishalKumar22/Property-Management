const jwt = require("jsonwebtoken")
const db = require("../model")
const Property = require("../model/PropertySchema")

const tokenMiddleware = async(req,res,next)=>{
    try {
    const Token = req.headers['authorization']
    const token = Token.replace(/^Bearer\s+/, "");
    if(!token) return res.status(401).send({success:false,message:"Token not found"})
    
    const verify = jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!verify) return res.status(400).send({success:false,message:"Invalid Token"})
        console.log(verify,'verurree')
    res.status(200).json(verify)
    next()
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
}
module.exports = tokenMiddleware