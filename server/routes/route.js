const {Router} = require("express")
const {createNewProperty, getPropertyDetailes, getPropertyDetailesById, updatePropertyDetailes, deleteProperty, propertySummery,} = require("../controllers/propertyController")
const {signUp, login} = require("../controllers/userController")
const router = Router()

router.post("/properties/signup", signUp)
router.post("/properties/login", login)
router.post("/properties", createNewProperty)
router.get("/properties", getPropertyDetailes)
router.get("/properties/:id", getPropertyDetailesById)
router.put("/properties/:id", updatePropertyDetailes)
router.delete("/properties/:id", deleteProperty)
router.get("/properties/summary", propertySummery)
module.exports = router