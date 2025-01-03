const express = require("express")
const router = express.Router()

const { auth, isHead } = require("../middlewares/auth")
const {
  updateProfile,
  getAllUserDetails,
} = require("../controllers/Profile")



router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

module.exports = router