const express = require("express")
const router = express.Router()


const {
    createProject,
    showAllProjects,
} = require("../controllers/Project")



const {
    showAlltags,
    createTag,
} = require("../controllers/Tags")


const { auth, isAdmin, isUser } = require("../middlewares/auth")


router.post("/createProject", auth, isUser, createProject)

router.get("/showAllProjects", showAllProjects)

router.post("/createTag", auth, isAdmin, createTag)
router.get("/showAlltags", showAlltags)

module.exports = router