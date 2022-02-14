const express = require("express");
const { getAllProjectDetails, createProjectDetail,  getProjectDetails, getAdminAllprojectDetailsall, creategetAdminAllProjectDetails ,deleteAdminProject, updateAdminProjectDetail } = require("../controllers/projectDetailController");
const router = express.Router();

router.route("/projectDetails").get(getAllProjectDetails);
router.route("/admin/projectDetail/new").post(createProjectDetail);
router.route("/projectDetail/:id").get(getProjectDetails);


router.route("/admin/projectDetailcreate/new").post(creategetAdminAllProjectDetails)
router.route("/admin/projectAdminDetailsAll").get(getAdminAllprojectDetailsall);
router.route("/admin/projectAdminDetailsAll/:id")
.put(updateAdminProjectDetail)
.delete(deleteAdminProject)

module.exports = router