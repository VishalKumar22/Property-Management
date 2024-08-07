const Property = require("../model/PropertySchema")

const createNewProperty = async(req,res)=> {
    try {
        const {name, price, location, description}= req.body
        if(!name || !price || !location  || !description){
            return res.status(400).json("All fields are required")
        }
        const response = new Property(req.body)
       const savedDetailes =  await response.save();
        res.status(200).json({data:response, token: await savedDetailes.generateToken()});
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
} 

const getPropertyDetailes = async(req,res)=> {
    try {
        const response = await Property.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}


const getPropertyDetailesById = async(req, res)=> {
    try {
        const id = req.params.id
        console.log(id,'asjkafa')
        const response = await Property.findById(id)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const updatePropertyDetailes = async(req,res)=> {
    try {
        const id = req.params.id
        const response  = await Property.findByIdAndUpdate(id, req.body,{ new: true })
        if(!response){
            return res.status(404).json("User not found")
        }
        res.status(200).json({msg:"Data Updated",data:response})
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const deleteProperty = async(req,res)=> {
    try {
        const id = req.params.id
        const response = await Property.findByIdAndDelete(id)
        res.status(200).json({msg:"Property Deleted",data:response})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const propertySummery = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    
    const avgPrice = await Property.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);

    const propertiesByLocation = await Property.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalProperties,
      avgPrice: avgPrice[0]?.avgPrice || 0,
      propertiesByLocation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createNewProperty, getPropertyDetailes, getPropertyDetailesById, updatePropertyDetailes, deleteProperty, propertySummery}