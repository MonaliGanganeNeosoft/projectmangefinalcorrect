const express = require("express");
const { getAllProjectDetails, createProjectDetail, updateProjectDetail, deleteProject, getProjectDetails, createProjectQuestion, getAdminAllProjectDetails, getAdminAllprojectDetailsall, creategetAdminAllProjectDetails ,deleteAdminProject, updateAdminProjectDetail, createQuestionPro } = require("../controllers/projectDetailController");
// const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/projectDetails").get(getAllProjectDetails);

router.route("/admin/projectDetailcreate/new").post(creategetAdminAllProjectDetails)
router.route("/admin/projectAdminDetailsAll").get(getAdminAllprojectDetailsall);

router.route("/admin/projectAdminDetailsAll/:id")
.put(updateAdminProjectDetail)
.delete(deleteAdminProject)



router.route("/admin/projectDetail/new").post(createProjectDetail);
router.route("/admin/projectDetail/:id")
.put(updateProjectDetail)
.delete(deleteProject)

router.route("/projectDetail/:id").get(getProjectDetails);

router.route("/ans").put(createProjectQuestion)
module.exports = router