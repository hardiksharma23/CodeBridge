const express = require("express");
const router = express.Router();

const {
    createProject,
    showAllProjects,
    getProjectDetails,
} = require("../controllers/Project");

const {
    showAlltags,
    createTag,
} = require("../controllers/Tags");

const { auth, isUser } = require("../middlewares/auth");

router.post("/createProject", auth, isUser, createProject);
router.get("/showAllProjects", showAllProjects);
router.get("/showAlltags", showAlltags); // Move this above the dynamic route
router.get("/:projectId", getProjectDetails); // Dynamic route should be last
router.post("/createTag", auth, isUser, createTag);

module.exports = router;